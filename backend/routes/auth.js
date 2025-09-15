//backend/routes/auth.js


import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { db } from "../drizzle/db.js";
import { eq, sql } from "drizzle-orm";
import { users } from "../drizzle/schema/users.js";

const newId = Math.floor(10000000 + Math.random() * 90000000);;

const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const redis = req.app.locals.redis;

    try {
        //  SELECT using $client.query
        const result = await db.$client.query("SELECT * FROM users WHERE email = $1", [email]);
        const existing = result || [];
        
        console.log("existing email-",existing);
        if (existing.length > 0) {
            console.log("reached existing email block");
            const user = existing[0];

            if (user.verified) {
                return res.status(400).json({ message: "User already exists and is verified" });
            }

            // Resend verification link
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
            await redis.set(`verify:${email}`, token, { EX: 900 });

            const verifyUrl = `http://localhost:5000/api/auth/verify/${token}`;
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verify your account",
                html: `
      <h2>Welcome back to Tech Deal Radar!</h2>
      <p>You previously signed up but didn’t verify your email. Click below to verify:</p>
      <a href="${verifyUrl}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>This link expires in 15 minutes.</p>
    `,
            });

            return res.json({ message: "Verification link resent. Please check your email." });
        }

        const hashed = await bcrypt.hash(password, 10);
        const name = email.split("@")[0].replace(/[^a-zA-Z]/g, "");

        // INSERT using $client.query
        await db.$client.query(
            "INSERT INTO users (id, name, email, password, verified) VALUES ($1, $2, $3, $4, $5)",
            [newId, name, email, hashed, false]
        );

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
        await redis.set(`verify:${email}`, token, { EX: 900 });

        const verifyUrl = `http://localhost:5000/api/auth/verify/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your account",
            html: `
        <h2>Welcome to Tech Deal Radar!</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verifyUrl}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link expires in 15 minutes.</p>
      `,
        });

        console.log("Inserted email:", email);


        res.json({ message: "Signup successful. Please verify your email." });
    } catch (err) {
        console.error("❌ Signup error:", err);
        res.status(500).json({ message: "Signup failed. Please try again." });
    }
});



// Email Verification
router.get("/verify/:token", async (req, res) => {
    const { token } = req.params;
    const redis = req.app.locals.redis;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const storedToken = await redis.get(`verify:${decoded.email}`);

        if (!storedToken || storedToken !== token) {
            return res.status(400).send("Invalid or expired verification link");
        }

        await db.$client.query(
            "UPDATE users SET verified = true WHERE email = $1",
            [decoded.email]
        );

        await redis.del(`verify:${decoded.email}`);

        res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h2 style="color: #10b981;">✅ Email verified successfully!</h2>
          <p>You can now login to your account.</p>
          <a href="http://localhost:5173/login" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Login</a>
        </body>
      </html>
    `);
    } catch (err) {
        console.error("❌ Verification error:", err);
        res.status(400).send("Verification failed. Invalid or expired token.");
    }
});

// Login
router.post("/login", async (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;
    const redis = req.app.locals.redis;

    try {
        const result = await db.$client.query("SELECT * FROM users WHERE email = $1", [email]);
        const rows = result.rows || [];

        console.log("Login attempt for:", email);
       
        if (result.length === 0) return res.status(400).json({ message: "User not found" });

        const user = result[0];
        if (!user.verified) return res.status(403).json({ message: "Please verify your email first" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email, userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await redis.set(`session:${email}`, token, { EX: 3600 });

        let likedItems = [];
        try {
            likedItems = JSON.parse(user.liked_items || "[]");
        } catch {
            likedItems = [];
        }



        res.json({ token, email, likedItems });
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ message: "Login failed. Please try again." });
    }
});

// Update Likes
router.post("/update-likes", async (req, res) => {
    const { email, likedItems } = req.body;
    try {
        await db.$client.query(
            "UPDATE users SET liked_items = $1 WHERE email = $2",
            [JSON.stringify(likedItems), email]
        );

        res.json({ message: "Liked items updated" });
    } catch (err) {
        console.error("❌ Like update error:", err);
        res.status(500).json({ message: "Failed to update likes" });
    }
});

// Logout
router.post("/logout", async (req, res) => {
    const redis = req.app.locals.redis;

    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await redis.del(`session:${decoded.email}`);

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("❌ Logout error:", err);
        res.status(500).json({ message: "Logout failed" });
    }
});

// Protected Route
router.get("/protected", async (req, res) => {
    const redis = req.app.locals.redis;
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const storedToken = await redis.get(`session:${decoded.email}`);

        if (storedToken !== token) {
            return res.status(401).json({ message: "Session expired or invalid" });
        }

        res.json({ message: `Welcome ${decoded.email}!` });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

export default router;

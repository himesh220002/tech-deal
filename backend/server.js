import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import products from "./data/products.js";
import { createClient } from "redis";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Redis setup
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
await redisClient.connect();
app.locals.redis = redisClient;

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Products API
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Auth routes
app.use("/api/auth", authRoutes);

// Compatibility protected route
app.get("/api/protected", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const jwt = await import("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome ${decoded.email}!` });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

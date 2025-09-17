import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import products from "./data/products.js";
import { createClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";
import testRoutes from "./routes/test.js";
import razorpayRoutes from "./routes/payments/razorpay.js";
import webhookRoutes from "./routes/payments/webhooks.js";
import verifyRoutes from "./routes/payments/verify.js";



import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  // Redis setup
  if (process.env.REDIS_URL) {
    try {
      const redisClient = createClient({ url: process.env.REDIS_URL });
      redisClient.on("error", (err) => console.error("❌ Redis error:", err));
      await redisClient.connect();
      app.locals.redis = redisClient;
      console.log("✅ Redis connected successfully");
    } catch (err) {
      console.error("❌ Failed to connect to Redis:", err.message);
    }
  } else {
    console.warn("⚠️ REDIS_URL not set. Skipping Redis setup.");
  }

  // Redis test route
  app.get("/api/redis-test", async (req, res) => {
    try {
      await req.app.locals.redis.set("test-key", "Hello Version");
      const value = await req.app.locals.redis.get("test-key");
      res.json({ message: value });
    } catch (err) {
      res.status(500).json({ error: "Redis test failed: " + err.message });
    }
  });

  // Other routes
  app.use("/api/test", testRoutes);

  app.use("/api/payments/razorpay", razorpayRoutes);
  app.use("/api/webhooks", webhookRoutes);
  app.use("/api/payments/verify", verifyRoutes);

  app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.use("/api/auth", authRoutes);

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

  const SELF_URL = "https://tech-deal-backend.onrender.com";

setInterval(async () => {
  try {
    const res = await fetch(SELF_URL);
    console.log(`🔁 Keep-alive ping sent: ${res.status}`);
  } catch (err) {
    console.error("❌ Keep-alive ping failed:", err.message);
  }
}, 10 * 60 * 1000); // every 10 minutes

})();

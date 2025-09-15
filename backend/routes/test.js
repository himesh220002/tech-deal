
import express from "express";
import { db } from "../drizzle/db.js";

const router = express.Router();

router.get("/test-users", async (req, res) => {
  try {
    const result = await db.$client.query("SELECT id, name, email, liked_items FROM users LIMIT 10;");
    console.log("reached result side");
    console.log(result);   
    res.status(200).json(result); 
  } catch (err) {
    console.error("❌ DB test error:", err);
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});


export default router;

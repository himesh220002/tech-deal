// backend/routes/payments/verify.js
import express from "express";
import { db } from "../../drizzle/db.js";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    console.log("🔍 Fetching latest payment...");

    const result = await db.$client.query(`
      SELECT * 
      FROM payments
      ORDER BY created_at DESC
      LIMIT 1
    `);

    console.log("🧪 Query rows length:", result.rows.length);

    if (result.rows.length === 0) {
      console.warn("⚠️ No payments found");
      return res.status(404).json({ error: "No payments found" });
    }

    console.log("✅ Latest payment fetched:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Failed to fetch latest payment:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;

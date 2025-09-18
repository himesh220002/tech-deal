// backend/routes/payments/verify.js
import express from "express";
import { db } from "../../drizzle/db.js";
import { payments } from "../../drizzle/schema/payment.js";
import { desc } from "drizzle-orm";

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
      console.log(result.rows[0]);
    console.log("🧪 Query result length:", result.length);


      console.log("✅ Latest payment fetched:", result[0]);

    res.json(result[0]);
  } catch (err) {
    console.error("❌ Failed to fetch latest payment:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;

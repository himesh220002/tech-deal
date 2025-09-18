// backend/routes/payments/verify.js
import express from "express";
import { db } from "../../drizzle/db.js";
import { payments } from "../../drizzle/schema/payment.js";
import { desc } from "drizzle-orm";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    console.log("🔍 Fetching latest payment...");

    const result = await db
      .select()
      .from(payments)
      .orderBy(desc(payments.created_at))
      .limit(1);

      if (result.length === 0) {
      console.warn("⚠️ No payments found");
      return res.status(404).json({ error: "No payments found" });
    }

    console.log("🧪 Query result length:", result.length);


      console.log("✅ Latest payment fetched:", result[0]);

    res.json(result[0]);
  } catch (err) {
    console.error("❌ Failed to fetch latest payment:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;

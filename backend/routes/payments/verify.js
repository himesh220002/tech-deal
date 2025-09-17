// backend/routes/payments/verify.js
import express from "express";
import { db } from "../../drizzle/db.js";
import { payments } from "../../drizzle/schema/payment.js";

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    console.log("🧪 Column type:", typeof payments.created_at);
console.log("🧪 Column object:", payments.created_at);

    const result = await db
      .select()
      .from(payments)
      .orderBy(payments.created_at.desc())
      .limit(1);

      console.log("✅ Latest payment fetched:", result);

    res.json(result);
  } catch (err) {
    console.error("❌ Failed to fetch latest payment:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;

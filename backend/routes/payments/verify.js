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

    

    // Just log warnings but don't return
    if(!result){
      console.log("⚠️ Query returned no results");
      console.warn("⚠️ Query returned no results");
    }
      else console.log("latestresult",result)
  // if (!result || !result.rows) {
  //   console.warn("⚠️ Query returned no rows");
  // } else if (result.rows.length === 0) {
  //   console.warn("⚠️ No payments found");
  // }

  

  //   console.log("✅ Latest payment fetched:", result?.rows[0]);

    // Always send something back
  res.json(result || null);
  } catch (err) {
    console.error("❌ Failed to fetch latest payment:", err.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default router;

// backend/routes/payments/webhooks.js
import express from "express";
import crypto from "crypto";
import { db } from "../../drizzle/db.js";
import bodyParser from "body-parser";

const router = express.Router();

// Simple GET to check webhook health
router.get("/razorpay", (req, res) => {
  res.send("✅ Webhook route is live and listening for POST events");
});

// POST webhook
router.post(
  "/razorpay",
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
  async (req, res) => {
    console.log("🔔 Webhook POST received");

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = req.rawBody;

    if (!body) {
      console.error("❌ Missing rawBody for HMAC verification");
      return res.status(400).json({ error: "Missing raw body" });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.warn("❌ Invalid Razorpay webhook signature");
      return res.status(400).json({ error: "Invalid signature" });
    }
    console.log("✅ Signature verified");

    const { event, payload } = req.body;

    console.log("📦 Event received:", event);

    // Handle only payment captured events
    if (event === "payment.captured") {
      const payment = payload.payment.entity;

      const createdAt = new Date(payment.created_at * 1000); // UNIX timestamp → JS Date

      try {
        await db.$client.query(
          `INSERT INTO payments 
            (payment_id, order_id, amount, currency, status, method, email, contact, created_at) 
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
           ON CONFLICT (payment_id) 
           DO UPDATE SET status=$5, method=$6, email=$7, contact=$8`,
          [
            payment.id,
            payment.order_id,
            Math.floor(payment.amount / 100),
            payment.currency,
            payment.status,
            payment.method || "unknown",
            payment.email || null,
            payment.contact || null,
            createdAt,
          ]
        );

        console.log(`✅ Payment processed: ${payment.id}`);
        return res.status(200).json({ success: true });
      } catch (err) {
        console.error("❌ DB insert failed:", err);
        return res.status(500).json({ error: "Database error" });
      }
    } else {
      console.log(`ℹ️ Unhandled event type: ${event}`);
      return res.status(200).json({ received: true });
    }
  }
);

export default router;

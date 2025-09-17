// backend/routes/payments/webhooks.js

import express from "express";
import crypto from "crypto";
import { db } from "../../drizzle/db.js";
import { payments } from "../../drizzle/schema/payment.js";

const router = express.Router();

router.post("/razorpay", express.json({ verify: rawBodySaver }), async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];
  const body = req.rawBody;

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

  if (signature !== expected) {
    console.warn("❌ Invalid Razorpay webhook signature");
    return res.status(400).json({ error: "Invalid signature" });
  }

  const event = req.body.event;
  const payload = req.body.payload;

  if (event === "payment.captured") {
    const payment = payload.payment.entity;

    try {
      await db.insert(payments).values({
        payment_id: payment.id,
        order_id: payment.order_id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email || null,
        contact: payment.contact || null,
        created_at: new Date(payment.created_at * 1000),
      });

      console.log(`✅ Payment captured: ${payment.id}`);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("❌ DB insert failed:", err.message);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    console.log(`ℹ️ Unhandled event: ${event}`);
    res.status(200).json({ received: true });
  }
});

// Middleware to preserve raw body for HMAC verification
function rawBodySaver(req, res, buf) {
  req.rawBody = buf.toString();
}

export default router;

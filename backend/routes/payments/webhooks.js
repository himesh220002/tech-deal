// backend/routes/payments/webhooks.js
import express from "express";
import crypto from "crypto";
import { db } from "../../drizzle/db.js";
import { payments } from "../../drizzle/schema/payment.js";
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

      const createdAt = new Date(payment.created_at * 1000); // convert UNIX timestamp to JS Date

      const insertData = {
        payment_id: payment.id,
        order_id: payment.order_id,
        amount: Math.floor(payment.amount / 100), // convert paise to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method || "unknown",
        email: payment.email || null,
        contact: payment.contact || null,
        created_at: createdAt.toISOString(),
      };

      try {
        await db.insert(payments)
          .values(insertData)
          .onConflictDoUpdate({
            target: payments.payment_id, // update if payment_id exists
            set: {
              status: insertData.status,
              method: insertData.method,
              email: insertData.email,
              contact: insertData.contact,
            },
          });

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

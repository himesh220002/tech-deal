// backend/routes/payments/razorpay.js

import express from "express";
import Razorpay from "razorpay";
import { PRODUCTS } from "../../data/coffee.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { product = "coffee99" } = req.body;
  const item = PRODUCTS[product];

  if (!item) return res.status(400).json({ error: "Invalid product" });

  try {
    const order = await razorpay.orders.create({
      amount: item.amount * 100, // paise
      currency: item.currency,
      receipt: `${item.receiptPrefix}_${Date.now()}`,
      notes: { product },
    });

    res.json({ order, amount: item.amount });
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(500).json({ error: "Order creation failed", details:err });
  }
});

export default router;

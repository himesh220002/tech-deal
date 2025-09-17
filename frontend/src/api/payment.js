//src/api/payment.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const createCoffeeOrder = async () => {
  const res = await axios.post(`${BASE_URL}/api/payments/razorpay/create-order`, {
    product: "coffee99"
  });
  return res.data;
};
     
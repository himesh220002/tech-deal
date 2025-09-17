//src/pages/BuyCofeePage.jsx
import { useEffect } from "react";
import { createCoffeeOrder } from "../api/payment";

const BuycoffeePage = () => {
  const handlePayment = async () => {
    try {
      const { order, amount } = await createCoffeeOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: "Tech Deals",
        description: "Digital Coffee",
        order_id: order.id,
        handler: function (response) {
          alert("Payment initiated. Confirmation will follow.");
        },
        theme: { color: "#2563EB" },
        method: { upi: true, card: true, netbanking: false, wallet: false },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
    handlePayment(); 
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Buy Me a Digital Coffee ☕</h1>
      <p className="mb-6">₹99 fixed price. UPI or card accepted.</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Pay ₹99
      </button>
    </div>
  );
};

export default BuycoffeePage;

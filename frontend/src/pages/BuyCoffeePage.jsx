import { useEffect, useState } from "react";
import { createCoffeeOrder } from "../api/payment";

const BuycoffeePage = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);

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
        handler: async function (response) {
          alert("Payment initiated. Confirmation will follow.");

          // Wait a few seconds for webhook to insert into DB
          setTimeout(async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/verify/latest`);
            const data = await res.json();
            setPaymentInfo(data[0]); // assuming result is an array
          }, 3000);
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

      {paymentInfo && (
        <div className="mt-8 p-4 border rounded bg-white shadow text-left w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-green-600">🎉 Payment Successful!</h2>
          <p><strong>Payment ID:</strong> {paymentInfo.payment_id}</p>
          <p><strong>Order ID:</strong> {paymentInfo.order_id}</p>
          <p><strong>Amount:</strong> ₹{paymentInfo.amount}</p>
          <p className="mt-2 text-sm text-gray-600">Thanks for the coffee! You're fueling great code ☕🚀</p>
        </div>
      )}
    </div>
  );
};

export default BuycoffeePage;

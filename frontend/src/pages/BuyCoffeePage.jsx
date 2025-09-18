import { useEffect, useState } from "react";
import { createCoffeeOrder } from "../api/payment";

const BuycoffeePage = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { order, amount } = await createCoffeeOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Tech Deals",
        description: "Digital Coffee",
        order_id: order.id,
        handler: async function (response) {
          alert(
            "💌 Your payment is being processed! Thank you for your support. Confirmation will follow shortly."
          );

          // Wait a few seconds for webhook to insert into DB
          setTimeout(async () => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/payments/verify/latest`
              );
              const data = await res.json();
              setPaymentInfo(data[0] || data); // works if backend sends array or object
              setLoading(false);
            } catch (err) {
              console.error("Error fetching latest payment:", err);
              setLoading(false);
            }
          }, 3000);
        },
        theme: { color: "#2563EB" },
        method: { upi: true, card: true, netbanking: false, wallet: false },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setLoading(false);
      alert("Oops! Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-900  px-4">
      <div className="flex flex-col items-center justify-center bg-cyan-50 text-gray-800 p-10 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-10 text-center">
        ☕ Buy Me a Digital Coffee
      </h1>
      <p className="mb-6 text-center rounded-xl bg-gray-100 p-5">
        Your support helps me keep building and improving. Every coffee fuels my growth! <br />
        ₹99 fixed price. UPI or card accepted.
      </p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Pay ₹99"}
      </button>

      {paymentInfo && (
        <div className="mt-8 p-6 border rounded-lg bg-white shadow-md text-left w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-semibold mb-3 text-green-600">
            🎉 Thank You for Your Support!
          </h2>
          <p className="mb-2 text-gray-700">
            Your contribution means a lot. Every coffee keeps me going and fuels my journey.
          </p>
          <div className="mt-2">
            <p>
              <strong>Payment ID:</strong> {paymentInfo.payment_id}
            </p>
            <p>
              <strong>Order ID:</strong> {paymentInfo.order_id}
            </p>
            <p>
              <strong>Amount:</strong> ₹{paymentInfo.amount}
            </p>
            <p className="mt-3 text-sm text-gray-500 italic">
              I'm truly grateful for your support. This helps me keep learning, coding, and delivering more value!
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default BuycoffeePage;

import { useEffect, useState } from "react";
import { TrendingDown } from "lucide-react";

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({});

  // Mock products
  const deals = [
    {
      id: "deal-1",
      name: "Apple iPhone 15",
      price: "₹65,999",
      oldPrice: "₹79,999",
      discount: 18,
      image: "https://m.media-amazon.com/images/I/81CgtwSII3L._SL1500_.jpg",
      store: "Amazon",
      timer: 2 * 3600, // 2 hours
    },
    {
      id: "deal-2",
      name: "Sony WH-1000XM5 Headphones",
      price: "₹27,990",
      oldPrice: "₹34,990",
      discount: 20,
      image: "https://m.media-amazon.com/images/I/61u48FEs0rL._SL1500_.jpg",
      store: "Flipkart",
      timer: 4 * 3600, // 4 hours
    },
    {
      id: "deal-3",
      name: "Dell Inspiron 15 Laptop",
      price: "₹52,499",
      oldPrice: "₹62,999",
      discount: 16,
      image: "https://m.media-amazon.com/images/I/71s1LRpaprL._SL1500_.jpg",
      store: "Amazon",
      timer: 1 * 3600, // 1 hour
    },
    {
      id: "deal-lenovo-slim3-i5-14th",
      name: "Lenovo IdeaPad Slim 3 14th Gen Intel Core 5 210H",
      price: "₹65,990",
      oldPrice: "₹91,890",
      discount: Math.round(((91890 - 65990) / 91890) * 100),
      image: "https://m.media-amazon.com/images/I/71-wjGaTTTL._SL1500_.jpg",
      store: "Amazon",
      timer: 3 * 3600, // 3 hours
    },
    {
      id: "deal-acer-alg-i5-13th",
      name: "Acer ALG i5 13th Gen AL15G-53",
      price: "₹59,990",
      oldPrice: "₹74,999",
      discount: Math.round(((79999 - 62990) / 79999) * 100),
      image: "https://m.media-amazon.com/images/I/51JH5OhIx2L.jpg",
      store: "Amazon",
      timer: 4 * 3600, // 4 hours
    },
  ];

  // Calculate unique expiry timestamps for each deal
  const expiryTimes = useState(() =>
    deals.reduce((acc, deal) => {
      acc[deal.id] = Date.now() + deal.timer * 1000;
      return acc;
    }, {})
  )[0];

  // Countdown Timer (updates every second)
  useEffect(() => {
    const interval = setInterval(() => {
      const next = {};
      Object.keys(expiryTimes).forEach((id) => {
        const diff = Math.max(0, Math.floor((expiryTimes[id] - Date.now()) / 1000));
        next[id] = {
          hours: Math.floor(diff / 3600),
          mins: Math.floor((diff % 3600) / 60),
          secs: diff % 60,
        };
      });
      setTimeLeft(next);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimes]);

  return (
    <div className="p-6 text-gray-200 mx-auto">
      <h2 className="text-3xl font-bold mb-6">🔥 Hot Deals Today</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden relative"
          >
            <span className="absolute top-3 left-3 bg-red-500 text-white font-medium text-xs px-2 py-1 rounded-full">
              {deal.discount}% OFF
            </span>
            <img
              src={deal.image}
              alt={deal.name}
              className="h-60 w-full object-cover cursor-pointer"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{deal.name}</h3>
              <p className="text-green-400 text-xl font-bold">{deal.price}</p>
              <p className="text-sm line-through text-gray-400">{deal.oldPrice}</p>
              <p className="text-sm mt-2">
                Store: <span className="text-gray-300">{deal.store}</span>
              </p>

              {/* Timer */}
              <div className="flex items-center gap-2 mt-3 text-sm text-red-400">
                <TrendingDown className="h-4 w-4" />
                Ends in:{" "}
                {timeLeft[deal.id]
                  ? `${timeLeft[deal.id].hours}h ${timeLeft[deal.id].mins}m ${timeLeft[deal.id].secs}s`
                  : "Loading..."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

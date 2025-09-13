import { TrendingDown, TrendingUp, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMemo } from "react";

export default function ProductCard({ product, likedItems, setLikedItems }) {
    const navigate = useNavigate();

    // Random upward/downward trend (memoized so it stays stable per render)
    const randomNum = useMemo(() => Math.floor(Math.random() * 2), []);

    // Price fluctuation generator
    const { trendDirection, fluctuationAmount } = useMemo(() => {
        const rawPrice = parseFloat(product.price.replace(/[₹,]/g, ""));
        const step = 5;

        // Decide trend direction: 90% down, 10% up
        const isUptrend = Math.random() < 0.1;

        // Calculate fluctuation range
        const min = isUptrend ? rawPrice * 0.005 : rawPrice * 0.01;
        const max = isUptrend ? rawPrice * 0.02 : rawPrice * 0.05;

        const stepsCount = Math.floor((max - min) / step) + 1;
        const randomStepIndex = Math.floor(Math.random() * stepsCount);
        const fluctuation = Math.round(min + randomStepIndex * step);

        return {
            trendDirection: isUptrend ? "up" : "down",
            fluctuationAmount: fluctuation,
        };
    }, [product.price]);


    // Raw prices
    const price1 = parseFloat(product.price.replace(/[₹,]/g, ""));
    const priceold = parseFloat(product.oldPrice.replace(/[₹,]/g, ""));
    const pricelowest = parseFloat(product.lowestPrice.replace(/[₹,]/g, ""));

    // Discount calculation
    const discount1 = parseFloat(((priceold - price1) / priceold) * 100).toFixed(1);

    // Lowest price check
    const setLowest = pricelowest < price1 ? pricelowest : price1;
    const newSetLowestPrice = `₹${setLowest.toLocaleString("en-IN")}`;

    // Wishlist
    const isHeart = likedItems.includes(product.id);

    const toggleHeart = async () => {
        const email = localStorage.getItem("email");
        let updatedLikes;

        if (isHeart) {
            updatedLikes = likedItems.filter((id) => id !== product.id);
        } else {
            updatedLikes = [...likedItems, product.id];
        }

        setLikedItems(updatedLikes);

        // 🔁 Sync with backend
        try {
            await fetch("http://localhost:5000/api/auth/update-likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, likedItems: updatedLikes }),
            });
        } catch (err) {
            console.error("❌ Failed to update likes:", err);
        }
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl shadow relative hover:scale-[1.02] transition-transform duration-300">
            {/* Top row - discount & heart */}
            <div className="flex justify-between items-center">
                <span className="absolute top-3 left-3 bg-green-300 text-black font-medium text-xs px-2 py-1 rounded-full">
                    {discount1}%
                </span>

                <button
                    className="absolute top-3 right-3 p-2 flex items-center justify-center bg-gray-600 rounded-full cursor-pointer"
                    onClick={toggleHeart}
                >
                    {isHeart ? (
                        <FaHeart className="h-4 w-4 text-red-500" />
                    ) : (
                        <Heart className="h-4 w-4 hover:text-red-400 text-white" />
                    )}
                </button>
            </div>

            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="h-60 sm:h-72 md:h-80 w-full object-cover rounded-t-2xl bg-black cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            />

            {/* Product Content */}
            <div className="p-4 sm:p-6">
                {/* Title */}
                <h3 className="mt-2 font-bold text-gray-300 truncate">{product.name}</h3>

                {/* Price & Fluctuation */}
                <div className="flex justify-between items-center">
                    <p className="text-lg sm:text-xl mt-2 font-semibold">{product.price}</p>

                    {trendDirection === "down" ? (
                        <span className="flex items-center text-red-500 text-sm sm:text-base">
                            <TrendingDown size={16} /> &nbsp;-₹{fluctuationAmount}
                        </span>
                    ) : (
                        <span className="flex items-center text-green-500 text-sm sm:text-base">
                            <TrendingUp size={16} /> &nbsp;+₹{fluctuationAmount}
                        </span>
                    )}

                </div>

                {/* Old Price */}
                <p className="text-xs sm:text-sm line-through text-gray-400">
                    {product.oldPrice}
                </p>

                {/* Available At */}
                <div className="mt-3">
                    <p className="text-gray-400 text-xs sm:text-sm">Available at:</p>
                    <div className="flex gap-2 flex-wrap text-[11px] sm:text-xs text-gray-300 mt-1">
                        {product.availableAt.map((store) => (
                            <span
                                key={store}
                                className="bg-[#0f172a] px-2 py-1 rounded border border-gray-600"
                            >
                                {store}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Lowest Price */}
                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                    Lowest: {newSetLowestPrice}
                </p>

                {/* View Details Button */}
                <button
                    type="button"
                    className="relative z-10 flex w-full justify-center items-center gap-2 px-3 py-2 sm:py-3 mt-3 text-sm sm:text-lg text-gray-50 bg-gray-900 border-2 border-gray-900 rounded-xl shadow-xl backdrop-blur-md overflow-hidden group isolation-auto font-semibold cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                >
                    View Details
                    <svg
                        className="w-5 h-5 p-1 rotate-45 text-gray-50 border border-gray-700 bg-gray-300 rounded-full ease-linear duration-300 group-hover:rotate-90 group-hover:bg-gray-50 group-hover:border-none"
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            className="fill-gray-800 group-hover:fill-gray-800"
                        ></path>
                    </svg>
                    <span className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                        <span className="absolute top-0 left-[-100%] w-full h-full bg-purple-900 rounded-full transition-all duration-700 group-hover:left-0 group-hover:scale-150"></span>
                    </span>
                </button>
            </div>
        </div>
    );
}

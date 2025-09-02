import { TrendingDown, TrendingUp, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMemo, useState } from "react";

export default function ProductCard({ product, likedItems, setLikedItems }) {
    const navigate = useNavigate();
    const randomNum = useMemo(() => Math.floor(Math.random() * 2), []);

    const priceRandum = useMemo(() => {
        const rawPrice = parseFloat(product.price.replace(/[₹,]/g, ""));
        const step = 5;

        let min, max;

        min = rawPrice * 0.01;
        max = rawPrice * 0.05;
        const stepsCount = Math.floor((max - min) / step) + 1;
        const randomStepIndex = Math.floor(Math.random() * stepsCount);
        return Math.round(min + randomStepIndex * step);

    }, [product.price, randomNum]);




    const isHeart = likedItems.includes(product.id);

    const toggleHeart = () => {
        if (isHeart) {
            setLikedItems(likedItems.filter((id) => id !== product.id));
        } else {
            setLikedItems([...likedItems, product.id]);
        }
    };

    return (
        <div className="bg-[#1e293b] rounded-2xl  shadow relative">
            <div className=" flex justify-between items-center">

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-green-100 text-black font-medium text-xs px-2 py-1 rounded-full">
                    {product.discount}
                </span>

                <button className="absolute top-3 right-3 p-2 flex items-center justify-center bg-gray-600 rounded-full cursor-pointer"
                    onClick={toggleHeart}
                >
                    {isHeart ? <FaHeart className="h-4 w-4 text-red-500" /> : <Heart className="h-4 w-4 hover:text-red-400 text-white" />}
                </button>
            </div>
            {/* Product Image */}
            <img
                src={product.image}
                alt={product.name}
                className="h-70 w-full object-cover rounded-t-2xl bg-black cursor-cell"
                onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
            <div className="p-6">
                {/* Product Info */}
                <h3 className="mt-2 font-bold text-gray-300">{product.name}</h3>
                <div className="flex justify-between">
                    <p className="text-xl mt-2 font-semibold">{product.price}</p>

                    {randomNum === 0 ? (
                        <span className="flex items-end text-red-500"><TrendingDown /> &nbsp; -₹{priceRandum}</span>
                    ) : (
                        <span className="flex items-end text-green-500"><TrendingUp /> &nbsp; +₹{priceRandum}</span>
                    )}

                </div>
                <p className="text-sm line-through text-gray-400">{product.oldPrice}</p>

                <div className="flex flex-col gap-2">
                    <p className="mt-4 text-gray-400 text-sm">Available at:</p>
                    {/* Available At */}
                    <div className=" flex gap-2 flex-wrap text-xs text-gray-300">

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
                <p className="mt-2 text-sm text-gray-400">
                    Lowest: {product.lowestPrice}
                </p>

                {/* <button className="mt-4 w-full bg-purple-900 py-2 rounded cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                >
                    View Details
                </button> */}


                <button
                    type="submit"
                    class="relative z-10 flex w-full justify-center items-center gap-2 px-4 py-2 mt-2 text-lg text-gray-50 bg-gray-900 border-2 border-gray-900 rounded-xl shadow-xl backdrop-blur-md overflow-hidden group isolation-auto lg:font-semibold cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                >
                    View Details
                    <svg
                        class="w-5 h-5 p-1 rotate-45 text-gray-50 border border-gray-700 bg-gray-300 rounded-full ease-linear duration-300 group-hover:rotate-90 group-hover:bg-gray-50 group-hover:border-none"
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            class="fill-gray-800 group-hover:fill-gray-800"
                        ></path>
                    </svg>

                    <span class="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                        <span class="absolute top-0 left-[-100%] w-full h-full bg-purple-900 rounded-full transition-all duration-700 group-hover:left-0 group-hover:scale-150"></span>
                    </span>
                </button>



            </div>
        </div>
    );
}

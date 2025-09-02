import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceChart from "../components/PriceChart";

export default function ProductDetail({ product }) {

    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState({
        student: 5,
        bank: 5,
        festive: 5,
    });

    const launchPrice = parseFloat(product.oldPrice.replace(/[₹,]/g, ""));
    const companyPrice = parseFloat(product.price.replace(/[₹,]/g, ""));

    // Start with company price
    let runningPrice = companyPrice;
    let reductions = {}; // track reductions

    Object.entries(discounts).forEach(([key, value]) => {
        if (value > 0) {
            const reduction = runningPrice * (value / 100);
            reductions[key] = reduction;
            runningPrice -= reduction;
        } else {
            reductions[key] = 0;
        }
    });

    const finalPrice = runningPrice;

    return (
        <section className="px-10 py-12">
            {/* Back Button */}
            
            <button
                className="mb-6 bg-gray-700 text-center w-32 rounded-2xl h-12 relative text-gray-200 text-xl font-semibold group cursor-pointer"
                type="button"
                onClick={() => navigate('/', { state: { scrollTo: 'dashboard' } })}
            >
                <div
                    class="bg-gradient-to-b  from-gray-500 and to-gray-900  rounded-xl h-10 w-1/3 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-30 z-10 duration-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                    >
                        <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#000000"
                        ></path>
                        <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#000000"
                        ></path>
                    </svg>
                </div>
                <p class="translate-x-5">Back</p>
            </button>


            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Image */}
                <div className="flex flex-col items-end gap-10">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl shadow-lg w-full object-cover max-h-[500px] bg-black"
                    />
                    <PriceChart

                        launchPrice={launchPrice}
                        salePrice={companyPrice}
                        extraDiscountPrice={finalPrice}
                    />
                </div>

                {/* Details */}
                <div>
                    <h2 className="text-3xl font-bold text-purple-400">{product.name}</h2>

                    {/* Price Info */}
                    <div className="mt-6">
                        <p className="text-md font-medium text-gray-300">
                            Launch Price: ₹{launchPrice.toLocaleString()}
                        </p>
                        <p className="text-xl font-bold text-blue-300">
                            Sale Price:{" "}
                            <span className="line-through text-gray-400">
                                ₹{launchPrice.toLocaleString()}
                            </span>{" "}
                            <span className="text-green-400 ml-2">
                                ₹{companyPrice.toLocaleString()}
                            </span>
                            <span className="ml-2 text-sm bg-red-600 text-white px-2 py-1 rounded">
                                {Math.round(
                                    ((launchPrice - companyPrice) / launchPrice) * 100
                                )}
                                % OFF
                            </span>
                        </p>
                    </div>

                    {/* Specs */}
                    {product.specs && (
                        // <div className="mt-6">
                        //     <h3 className="font-semibold mb-2">Specifications:</h3>
                        //     <div className="grid grid-cols-3 gap-3">
                        //         {Object.entries(product.specs).map(([key, value]) => (
                        //             <div key={key} className="bg-[#1e293b] p-3 rounded-lg">
                        //                 <p className="text-sm text-gray-400">{key}</p>
                        //                 <p className="font-semibold">{value}</p>
                        //             </div>
                        //         ))}
                        //     </div>
                        // </div>

                              
                    <div class="mt-6">
                        <h3 className="font-semibold mb-2">Specifications:</h3>
                       
                        <div
                            class="grid grid-cols-3 gap-3  "
                        >
                            {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className=" rounded-lg bg-[rgb(41,49,79)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[5px] hover:shadow-[0_-3px_0px_0px_rgb(244,67,54)]">
                                        <p className="text-sm text-gray-400">{key}</p>
                                        <p className="font-semibold">{value}</p>
                                    </div>
                                ))}
                        </div>
                    </div>


                    )}

                    {/* Description */}
                    {product.description && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Description:</h3>
                            <p className="text-gray-300 leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    {/* Available Stores */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Available At:</h3>
                        <ul className="list-disc pl-6 text-gray-300">
                            {product.availableAt.map((store) => (
                                <li key={store}>{store}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Discount Calculator */}
                    <div className="mt-6 space-y-3">
                        <div className="flex gap-3 items-end">
                            <p className="text-xl font-bold text-purple-300 mt-2">
                                Final Price can be range after extra discounts upto: &nbsp;
                                <span className="text-green-100">₹{Math.round(finalPrice).toLocaleString()}</span>
                            </p>
                            <span className="ml-2 text-sm bg-red-600 text-white px-2 py-1 rounded">
                                {Math.round(
                                    ((companyPrice - finalPrice) / companyPrice) * 100
                                )}
                                % OFF
                            </span>
                        </div>

                        {["student", "bank", "festive"].map((key) => (
                            <div key={key} className="flex items-center gap-3">
                                <label className="w-24 capitalize">{key} %</label>
                                <input
                                    type="number"
                                    value={discounts[key]}
                                    onChange={(e) =>
                                        setDiscounts({
                                            ...discounts,
                                            [key]: Number(e.target.value),
                                        })
                                    }
                                    className="px-3 py-2 rounded bg-[#1e293b] border border-gray-600 w-28"
                                />
                                {reductions[key] > 0 && (
                                    <span className="text-green-400 font-semibold">
                                        -₹{Math.round(reductions[key]).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}

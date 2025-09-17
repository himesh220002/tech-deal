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
  let reductions = {};

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
    <section className="px-4 md:px-10 py-12">
      {/* Back Button */}
      {/* <div
        className="cursor-pointer w-fit border-4 border-black bg-gray-500 text-white pb-2 
                   transition ease-in-out duration-100 select-none active:pb-0 mb-4 
                   active:mb-6 active:translate-y-2"
        onClick={() => navigate("/", { state: { scrollTo: "dashboard" } })}
      >
        <div className="bg-gray-800 border-4 border-gray-800 px-4 py-2">
          <span className="text-lg tracking-wide">Back</span>
        </div>
      </div> */}

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] xl:grid-cols-[2fr_3fr] gap-10 items-start mt-2 md:mt-10">
        {/* Image & Chart */}
        <div className="flex flex-col items-center md:items-end gap-10 w-full sm:w-full ">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg w-full max-h-[350px] sm:max-h-[400px] xl:max-h-[500px] object-contain bg-black"
          />
          
        </div>

        {/* Details */}
        <div className="w-full">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-center md:text-start font-bold text-purple-400">
            {product.name}
          </h2>

          {/* Price Info */}
          <div className="mt-6">
            <p className="text-sm md:text-md font-medium text-gray-300">
              Launch Price: ₹{launchPrice.toLocaleString()}
            </p>
            <p className="text-lg md:text-xl font-bold text-blue-300 mt-1">
              Sale Price:{" "}
              <span className="line-through text-gray-400">
                ₹{launchPrice.toLocaleString()}
              </span>{" "}
              <span className="text-green-400 ml-2">
                ₹{companyPrice.toLocaleString()}
              </span>
              <span className="ml-2 text-xs md:text-sm bg-red-600 text-white px-2 py-1 rounded">
                {Math.round(((launchPrice - companyPrice) / launchPrice) * 100)}%
                OFF
              </span>
            </p>
          </div>

          {/* Specs */}
          {product.specs && (
            <div className="mt-6">
              <h3 className="font-semibold text-center md:text-start mb-2">Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg bg-[rgb(41,49,79)] p-4 transition relative duration-300 
                               cursor-pointer hover:translate-y-[5px] hover:shadow-[0_-3px_0px_0px_rgb(244,67,54)]"
                  >
                    <p className="text-xs md:text-sm text-gray-400">{key}</p>
                    <p className="font-semibold text-sm md:text-base">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>
          )}

          {/* Available Stores */}
          <div className="mt-6">
            <div className="flex gap-6 sm:gap-10 items-center justify-between sm:items-center">
              <div>
                <h3 className="font-semibold mb-2">Available At:</h3>
                <ul className="list-disc pl-6 text-gray-300 text-sm md:text-base">
                  {product.availableAt.map((store) => (
                    <li key={store}>{store}</li>
                  ))}
                </ul>
              </div>
              <a
                href={product.product_link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded px-4 py-2 shadow-md bg-gray-700 hover:bg-gray-800 text-sm md:text-base"
              >
                Buy Product
              </a>
            </div>
          </div>

          {/* Discount Calculator */}
          <div className="mt-10 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
              <p className="text-lg md:text-xl font-bold text-purple-300">
                Final Price after extra discounts:{" "}
                <span className="text-green-100">
                  ₹{Math.round(finalPrice).toLocaleString()}
                </span>
              </p>
              <span className="ml-2 text-xs md:text-sm bg-red-600 text-white px-2 py-1 rounded w-[80px]">
                {Math.round(((companyPrice - finalPrice) / companyPrice) * 100)}%
                OFF
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">

            {["student", "bank", "festive"].map((key) => (
              <div
                key={key}
                className="flex flex-row sm:flex-row items-center gap-2 justify-between sm:gap-3 border border-gray-700 px-3 py-1 rounded-md"
              >
                <div className="flex items-center gap-5">
                <label className="w-18 md:w-20 capitalize text-sm md:text-base">
                  {key} %
                </label>
                <input
                  type="number"
                  value={discounts[key]}
                  onChange={(e) =>
                    setDiscounts({
                      ...discounts,
                      [key]: Number(e.target.value),
                    })
                  }
                  className="px-3 py-2 rounded bg-[#1e293b] border border-gray-600 w-24 text-sm md:text-base"
                />
                </div>
                {reductions[key] > 0 && (
                  <span className="text-green-400 font-semibold text-sm md:text-base">
                    -₹{Math.round(reductions[key]).toLocaleString()}
                  </span>
                )}
              </div>
              
            ))}

            </div>

            <PriceChart
            launchPrice={launchPrice}
            salePrice={companyPrice}
            extraDiscountPrice={finalPrice}
          />
          </div>
        </div>
      </div>
    </section>
  );
}

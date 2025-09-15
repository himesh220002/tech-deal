// src/pages/Compare.jsx
import { useState } from "react";
import products from "../../../backend/data/products";

export default function Compare() {
    const defaultType = products[0]?.product_type || "";
    const defaultProducts = products.filter((p) => p.product_type === defaultType);

    const [selectedType, setSelectedType] = useState(defaultType);
    const [product1, setProduct1] = useState(defaultProducts[0]?.id || "");
    const [product2, setProduct2] = useState(
        defaultProducts[1]?.id || defaultProducts[0]?.id || ""
    );

    const productTypes = [...new Set(products.map((p) => p.product_type))];
    const filteredProducts = selectedType
        ? products.filter((p) => p.product_type === selectedType)
        : [];

    const prod1 = products.find((p) => p.id === product1);
    const prod2 = products.find((p) => p.id === product2);

    const specKeys = [
        ...new Set([
            ...(prod1 ? Object.keys(prod1.specs || {}) : []),
            ...(prod2 ? Object.keys(prod2.specs || {}) : []),
        ]),
    ];

    const singleProductMode = filteredProducts.length === 1;

    return (
        <div className="p-4 sm:p-6  mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 text-center sm:text-left">
                Product Comparison
            </h1>

            {/* Select Type */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="font-semibold text-gray-300">
                    Select Product Type:
                </label>
                <select
                    value={selectedType}
                    onChange={(e) => {
                        const newType = e.target.value;
                        setSelectedType(newType);

                        const typeProducts = products.filter(
                            (p) => p.product_type === newType
                        );
                        setProduct1(typeProducts[0]?.id || "");
                        setProduct2(typeProducts[1]?.id || typeProducts[0]?.id || "");
                    }}
                    className="px-3 py-2 text-gray-200 bg-[#1e293b] rounded w-full sm:w-auto"
                >
                    {productTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/*  Select Products */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="font-semibold text-gray-300">Product 1:</label>
                    <select
                        value={product1}
                        onChange={(e) => setProduct1(e.target.value)}
                        className="px-3 py-2 text-gray-200 bg-[#1e293b] rounded w-full sm:w-auto"
                    >
                        {filteredProducts.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {!singleProductMode && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="font-semibold text-gray-300">Product 2:</label>
                        <select
                            value={product2}
                            onChange={(e) => setProduct2(e.target.value)}
                            className="px-3 py-2 text-gray-200 bg-[#1e293b] rounded w-full sm:w-auto"
                        >
                            {filteredProducts.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/*  Comparison */}
            {prod1 && prod2 && (
                <div className="overflow-x-auto">
                    <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                        <table className="w-full  md:min-w-[600px] table-auto border-collapse border border-gray-600 text-sm sm:text-base">

                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-purple-900 text-white border-b border-gray-500">
                                    <th className="px-4 sm:px-6 py-2 sm:py-3 text-left whitespace-nowrap border-r border-gray-500">
                                        Specification
                                    </th>
                                    <th className="px-4 sm:px-6 py-2 sm:py-3 text-center border-r border-gray-500">
                                        {prod1.name}
                                    </th>

                                    {!singleProductMode && (
                                        <th className="px-4 sm:px-6 py-2 sm:py-3 text-center">
                                            {prod2.name}
                                        </th>

                                    )}
                                </tr>
                            </thead>
                            <tbody className="text-gray-200">
                                {/* Image Row */}
                                <tr className="bg-[#111827] hover:bg-gradient-to-r from-blue-900 to-purple-900 transition border-b border-gray-700">
                                    <td className="px-4 sm:px-6 py-3 font-semibold border-r border-gray-700">
                                        Image
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 text-center border-r border-gray-700">
                                        <img
                                            src={prod1.image}
                                            alt={prod1.name}
                                            className="h-20 sm:h-28 mx-auto rounded-lg shadow-md"
                                        />
                                    </td>
                                    {!singleProductMode && (
                                        <td className="px-4 sm:px-6 py-3 text-center">
                                            <img
                                                src={prod2.image}
                                                alt={prod2.name}
                                                className="h-20 sm:h-28 mx-auto rounded-lg shadow-md"
                                            />
                                        </td>
                                    )}
                                </tr>

                                {/* Price */}
                                <tr className="bg-gray-800 hover:bg-gradient-to-r from-blue-900 to-purple-900 transition border-b border-gray-700">
                                    <td className="px-4 sm:px-6 py-3 font-semibold border-r border-gray-700">
                                        Price
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 text-center text-green-400 font-bold border-r border-gray-700">
                                        {prod1.price}
                                    </td>
                                    {!singleProductMode && (
                                        <td className="px-4 sm:px-6 py-3 text-center text-green-400 font-bold">
                                            {prod2.price}
                                        </td>
                                    )}
                                </tr>

                                {/* Dynamic Specs */}
                                {specKeys.map((key, idx) => (
                                    <tr
                                        key={key}
                                        className={`transition ${idx % 2 === 0 ? "bg-[#0f172a]" : "bg-gray-800"
                                            } hover:bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-700`}
                                    >
                                        <td className="px-4 sm:px-6 py-3 font-semibold capitalize border-r border-gray-700">
                                            {key}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 text-center border-r border-gray-700">
                                            {prod1.specs?.[key] || "-"}
                                        </td>
                                        {!singleProductMode && (
                                            <td className="px-4 sm:px-6 py-3 text-center">
                                                {prod2.specs?.[key] || "-"}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

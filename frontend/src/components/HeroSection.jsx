import { Search, Target, Smartphone, Laptop, Headphones, Monitor, HardDrive, Cpu, Mouse } from "lucide-react";
import { useState } from "react";

export default function HeroSection({ activeCategory, setActiveCategory, setSearchTerm, dashboardRef }) {
  const categories = [
    { name: "All Products", icon: Target },
    { name: "Smartphones", icon: Smartphone },
    { name: "Laptops", icon: Laptop },
    { name: "Audio", icon: Headphones },
    { name: "Displays", icon: Monitor },
    { name: "Storage", icon: HardDrive },
    { name: "Memory", icon: Cpu },
    { name: "Peripheral", icon: Mouse },
  ];



  return (
    <section className="text-center py-16 px-4 md:px-20">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold">
        Find the Best <span className="text-purple-400">Tech Deals</span>
      </h2>
      <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
        Track prices, stack discounts, and never miss a deal. Powered by AI and
        community wisdom.
      </p>

      {/* Search Bar */}
      <div className="mt-10 w-full max-w-[800px] mx-auto flex items-center rounded-lg border border-gray-600 bg-gray-800 px-4 py-4 shadow">
        <Search className="text-gray-400 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search for tech products, deals, or brands..."
          className="flex-grow bg-transparent text-gray-200 placeholder-gray-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && dashboardRef?.current) {
              dashboardRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>

      {/* Categories */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 ">
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveCategory(name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${activeCategory === name
                ? "bg-blue-600 text-white"
                : "bg-[#1e293b] text-gray-300 hover:bg-purple-600"
              }`}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import HeroSection from "../components/HeroSection";
import Stats from "../components/Stats";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

// import "./../styles/newstyle.css"

export default function HomePage({ likedItems, setLikedItems }) {

  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // show 2 rows initially

  
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categoryMap = {
    Smartphones: "Mobile",
    Laptops: "Laptop",
    Audio: "Audio",
    Displays: "Display",
    Storage: "Storage",
    Memory: "Memory",
    Peripheral: "Peripheral"
  };

  const filteredByCategory = activeCategory === "All Products"
    ? products
    : products.filter((p) => p.product_type === categoryMap[activeCategory]);

  const filteredProducts = filteredByCategory.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const dashboardRef = useRef(null);

  



  return (
    <>
      <HeroSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setSearchTerm={setSearchTerm}
        dashboardRef={dashboardRef}
      />
      <Stats />
      <section ref={dashboardRef} className="px-40 py-12">
        <h2 className="text-2xl font-bold mb-6">Price Tracker Dashboard</h2>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No matching products found.</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              likedItems={likedItems}
              setLikedItems={setLikedItems}
            />
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="mt-8 text-center">

            <div className="flex items-center justify-center">
              <div className="relative group">
                <button
                  className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                >
                  <span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  ></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1">Load More</span>

                    </div>
                  </span>
                </button>
              </div>
            </div>

          </div>

        )}
        
      </section>

    </>
  );
}

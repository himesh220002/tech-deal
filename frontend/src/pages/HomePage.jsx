import { useState, useEffect, useRef } from "react";
import HeroSection from "../components/HeroSection";
import Stats from "../components/Stats";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function HomePage({ likedItems, setLikedItems }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // show 2 rows initially
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);


  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const hasMounted = useRef(false);
  const prevCategory = useRef(activeCategory);


  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasMounted.current && prevCategory.current !== activeCategory) {
      scrollToDashboard();
    }
    hasMounted.current = true;
    prevCategory.current = activeCategory;
  }, [activeCategory]);


  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);


  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoadingSkeleton(false);
    });
  }, []);

  const categoryMap = {
    Smartphones: "Mobile",
    Laptops: "Laptop",
    Tablet: "Tablet",
    Audio: "Audio",
    Displays: "Display",
    Storage: "Storage",
    Memory: "Memory",
    Peripheral: "Peripheral",
  };

  const filteredByCategory =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.product_type === categoryMap[activeCategory]);

  const filteredProducts = filteredByCategory.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeroSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setSearchTerm={setSearchTerm}
        dashboardRef={dashboardRef}
      />
      <Stats />

      {/* Responsive Padding */}
      <section ref={dashboardRef} className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          Price Tracker Dashboard
        </h2>

        

        {loadingSkeleton && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[400px] bg-gray-800 rounded-xl shadow-inner"
              />
            ))}
          </div>
        )}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No matching products found.
          </p>
        )}

        {/* Responsive Grid */}
        {!loadingSkeleton && (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              likedItems={likedItems}
              setLikedItems={setLikedItems}
            />
          ))}
        </div>
        )}
        

        {visibleCount < filteredProducts.length && (
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center">
              <div className="relative group">
                <button
                  className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1">
                        Load More
                      </span>
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

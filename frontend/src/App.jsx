import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailWrapper from "./pages/ProductDetailWrapper";

function App() {

  const [likedItems, setLikedItems] = useState(() => {
    const stored = localStorage.getItem("likedItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);



  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
        <Navbar notificationCount={3} likedCount={likedItems.length} />
        <Routes>
          <Route path="/" element={<HomePage likedItems={likedItems} setLikedItems={setLikedItems} />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

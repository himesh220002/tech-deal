import {useEffect} from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Compare from "./pages/Compare";
import DealsPage from "./pages/DealsPage";
import CommunityPage from "./pages/CommunityPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductDetailWrapper from "./pages/ProductDetailWrapper";
import { useLiked } from "./context/LikedContext";

export default function AppContent() {
  const location = useLocation();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);
  const { likedItems, setLikedItems } = useLiked();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/signup"];
    const currentPath = window.location.pathname;

    console.log("🧭 App.jsx route check:");
    console.log("Current path:", currentPath);
    console.log("Token exists:", !!token);

    if (!token && !publicPaths.includes(currentPath)) {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail")?.trim().toLowerCase();
    if (email) {
      localStorage.setItem(`likedItems:${email}`, JSON.stringify(likedItems));
    }
    console.log("❤️ likedItems in AppContent:", likedItems);
  }, [likedItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      {!hideLayout && <Navbar notificationCount={3} likedCount={likedItems.length} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

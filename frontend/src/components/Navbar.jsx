import { useState, useEffect } from "react";
import { Zap, Bell, Heart, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as logoutApi } from "../api/auth";
import "./../styles/newstyle.css";

export default function Navbar({ notificationCount = 0, likedCount = 0 }) {
    const navLinks = ["Price Tracker", "Compare", "Deals", "Community"];
    const [activeLink, setActiveLink] = useState("Price Tracker");
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const { userEmail, logout } = useAuth();
    const userPic = localStorage.getItem("userPic");

    useEffect(() => {
        setShowProfile(false);
    }, [userEmail]);

    const handleLogout = async () => {
        try {
            await logoutApi(userEmail);
        } catch (err) {
            console.error("Logout API call failed:", err.message);
        }

        // Clear localStorage for this user
        localStorage.removeItem(`likedItems:${userEmail}`);
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("userPic");

        logout();
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-[#1e293b] shadow relative">
            {/* Logo */}
            <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => navigate("/")}
            >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-purple-400">Tech Deal Radar</h1>
            </div>

            {/* Nav Links */}
            <ul className="flex gap-6">
                {navLinks.map((link) => (
                    <li
                        key={link}
                        onClick={() => setActiveLink(link)}
                        className={`px-3 py-1 rounded cursor-pointer transition ${link === activeLink
                                ? "bg-blue-600 text-white"
                                : "hover:bg-blue-500 hover:text-white text-gray-300"
                            }`}
                    >
                        {link}
                    </li>
                ))}
            </ul>

            {/* Icons */}
            <div className="flex gap-4 items-center">
                {/* Profile */}
                {userEmail && (
                    <div className="relative group">
                        <button
                            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-400 hover:border-blue-500 transition cursor-pointer flex items-center justify-center bg-gray-700"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            {userPic ? (
                                <img src={userPic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-white" />
                            )}
                        </button>

                        {!showProfile && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                                {userEmail}
                            </div>
                        )}

                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-xl p-4 z-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">Profile</h3>
                                    <button
                                        onClick={() => setShowProfile(false)}
                                        className="text-gray-500 hover:text-black cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    {userPic ? (
                                        <img src={userPic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-6 h-6 text-gray-500" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Logged in as: <br />
                                            <span className="font-semibold">{userEmail}</span>
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 rounded-full hover:bg-blue-500 transition">
                        <Bell className="w-5 h-5 text-white" />
                    </button>
                    {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {notificationCount}
                        </span>
                    )}
                </div>

                {/* Liked Items */}
                <div className="relative">
                    <button className="p-2 rounded-full hover:bg-blue-500 transition">
                        <Heart className="w-5 h-5 text-white" />
                    </button>
                    {likedCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {likedCount}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}
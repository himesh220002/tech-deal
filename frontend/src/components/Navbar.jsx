import { useState, useEffect } from "react";
import { Zap, Bell, Heart, User, X, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout as logoutApi } from "../api/auth";
import { GiCoffeeCup } from "react-icons/gi";
import "./../styles/newstyle.css";

export default function Navbar({ notificationCount = 0, likedCount = 0 }) {
    const navLinks = [
        { name: "Price Tracker", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: "Deals", path: "/deals" },
        { name: "Community", path: "/community" },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const { userEmail, logout } = useAuth();
    const userPic = localStorage.getItem("userPic");

    const sliceEmail = userEmail?.length > 9
        ? userEmail.slice(0, 9) + "..."
        : userEmail || "";

    const [activePanel, setActivePanel] = useState(null);

    const togglePanel = (panel) => {
        setActivePanel((prev) => (prev === panel ? null : panel));
    };

    useEffect(() => {
        if (activePanel === "profile") {
            const timer = setTimeout(() => {
                setActivePanel(null);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [activePanel]);



    const handleLogout = async () => {
        try {
            await logoutApi(userEmail);
        } catch (err) {
            console.error("Logout API call failed:", err.message);
        }

        localStorage.removeItem(`likedItems:${userEmail}`);
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("userPic");

        logout();
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-[#1e293b] shadow relative">
            {/* Logo */}
            <div
                className="flex gap-2 items-center cursor-pointer group"
                onClick={() => navigate("/")}
            >
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-white drop-shadow-md animate-pulse" />
                </div>
                <h1 className="text-xl hidden sm:block sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 tracking-wide">
                    Tech Deal Radar
                </h1>
            </div>


            {/* Desktop Nav Links */}
            <ul className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                    <li
                        key={link.name}
                        onClick={() => navigate(link.path)}
                        className={`px-3 py-1 rounded cursor-pointer transition ${location.pathname === link.path
                            ? "bg-gradient-to-r from-blue-600 to-purple-900 text-white"
                            : "hover:bg-gradient-to-r from-blue-800 to-purple-900 hover:text-white text-gray-300"
                            }`}
                    >
                        {link.name}
                    </li>
                ))}
            </ul>
            {/* Icons + Hamburger */}
            <div className="flex gap-4 items-center">

                <div className="relative group">
                    
                    <button 
                    className=" flex gap-1 items-end cursor-pointer text-gray-200 py-1 px-2 rounded-md bg-gradient-to-r from-gray-900 to-purple-800 hover:bg-black"
                    onClick={()=> navigate("/coffee")}
                    >
                        Buy<GiCoffeeCup className="w-7 h-7 text-yellow-100"/>
                    </button>
                </div>

                {/* Profile */}
                {userEmail && (
                    <div className="relative group">
                        <button
                            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-400 hover:border-blue-500 transition cursor-pointer flex items-center justify-center bg-gray-700"
                            onClick={() => togglePanel("profile")}
                        >
                            {userPic ? (
                                <img src={userPic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-white" />
                            )}
                        </button>

                        {/* Tooltip on hover */}
                        {activePanel !== "profile" && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                                {userEmail}
                            </div>
                        )}

                        {/* Profile Panel */}
                        {activePanel === "profile" && (
                            <div className="absolute top-14 -right-20 mt-2 w-72 bg-[#0f171a] text-white rounded-lg shadow-xl p-4 z-50 flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">Account</h3>
                                    <button onClick={() => togglePanel("profile")} className="text-gray-400 hover:text-white">
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    {userPic ? (
                                        <img src={userPic} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                            <User className="w-6 h-6 text-gray-300" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-300">{userEmail}</p>
                                        <p className="text-xs text-gray-500">
                                            Signed in as <span className="font-medium">{sliceEmail}</span>
                                        </p>
                                    </div>
                                </div>

                                <hr className="border-gray-700" />

                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Language</span>
                                    <span className="text-purple-400">EN</span>
                                </div>

                                <hr className="border-gray-700" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
                                >
                                    Logout
                                </button>

                                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-700">
                                    <button className="hover:text-white">Privacy</button>
                                    <button className="hover:text-white">Terms</button>
                                    <button className="hover:text-white">FAQ</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Notifications */}
                <div className="relative hidden sm:block">
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
                <div className="relative hidden sm:block">
                    <button className="p-2 rounded-full hover:bg-blue-500 transition">
                        <Heart className="w-5 h-5 text-white" />
                    </button>
                    {likedCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {likedCount}
                        </span>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-700 transition"
                    onClick={() => togglePanel("menu")}
                >
                    {activePanel === "menu" ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <Menu className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {activePanel === "menu" && (
                <div className="fixed top-20 right-0 w-64 bg-[#0f171a] text-white rounded-l-lg shadow-2xl z-50 flex flex-col md:hidden transition-transform duration-300">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                navigate(link.path);
                                togglePanel("menu");
                            }}
                            className={`px-4 py-3 rounded-tl-lg text-left text-sm font-medium transition ${location.pathname === link.path
                                ? "bg-gradient-to-r from-blue-600 to-purple-900 text-white"
                                : "hover:bg-gradient-to-r from-blue-800 to-purple-900 hover:text-white text-gray-300"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}

                    <hr className="border-gray-700 my-2" />

                    <div className="flex justify-around text-xs text-gray-400 px-4 pb-4">
                        <button className="hover:text-white">Privacy</button>
                        <button className="hover:text-white">Terms</button>
                        <button className="hover:text-white">FAQ</button>
                    </div>
                </div>
            )}


        </nav>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Bell, Heart } from "lucide-react";
import "./../styles/newstyle.css"

export default function Navbar({ notificationCount = 0, likedCount = 0 }) {
    const navLinks = ["Price Tracker", "Compare", "Deals", "Community"];
    const [activeLink, setActiveLink] = useState("Price Tracker");
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-[#1e293b] shadow">
            {/* Logo */}
            <div className="flex gap-2 items-center  cursor-pointer"
                onClick={() => navigate('/')}
            >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-purple-400" > Tech Deal Radar</h1>
            </div>


            {/* Nav Links */}
            <ul className="flex gap-6">
                {navLinks.map((link) => (
                    <li
                        key={link}
                        onClick={() => setActiveLink(link)}
                        className={`px-3 py-1 rounded cursor-pointer transition 
              ${link === activeLink
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

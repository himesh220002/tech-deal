import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useLiked } from "../context/LikedContext";

export default function LoginPage({ }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { setLikedItems } = useLiked();
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginApi(email, password);
        if (res.token) {
            login(email, res.token);
            localStorage.setItem("email", email);
            localStorage.setItem("token", res.token);
            localStorage.setItem(`likedItems:${email}`, JSON.stringify(res.likedItems || []));
            setLikedItems(res.likedItems || []);

            setMessage("Login successful ✅ Redirecting...");
            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 1500);
        } else {
            setMessage(res.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Welcome to Tech Deal Radar</h1>
                <p className="text-gray-600 mt-2">Track prices, compare deals, and save smarter</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <h2 className="text-xl text-black font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-black mb-3 p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-black mb-3 p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white mt-5 p-2 py-3 rounded hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
                    disabled={loading}
                    onClick={() => console.log("submit login pressed")}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    className="w-full my-5 bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
                    onClick={() => {
                        navigate("/signup");
                        console.log("login's -> signup btn pressed")
                    }}
                >
                    Signup
                </button>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </form>
        </div>
    );
}

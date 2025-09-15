import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();
    const { logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await signup(email, password);
        setMessage(res.message);

        if (res.message.includes("Please verify your email")) {
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        setLoading(false);

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Welcome to Tech Deal Radar</h1>
                <p className="text-gray-600 mt-2">Track prices, compare deals, and save smarter</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-black text-center">Create Account</h2>

                <label className="block mb-2 text-gray-700 font-medium">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg text-gray-900 placeholder-gray-400"
                    required
                />

                <label className="block mb-2 text-gray-700 font-medium">Password</label>
                <input
                    type="password"
                    placeholder="Choose a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 p-3 border rounded-lg text-gray-900 placeholder-gray-400"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                    disabled={loading}
                    onClick={() => console.log("submit signup pressed")}
                >
                    {loading ? "Submitting..." : "Sign Up"}
                </button>
                <button
                    type="button"
                    className="w-full my-5 bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
                    onClick={() => {
                        navigate("/login");
                        console.log("page signup's-> login btn pressed");
                    }}
                >
                    Login
                </button>
            </form>

            {message && <p className="mt-6 text-center text-gray-700 font-medium">{message}</p>}
        </div>
    );
}

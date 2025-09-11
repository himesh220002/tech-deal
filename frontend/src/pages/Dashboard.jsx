import { useEffect, useState } from "react";
import { getProtected } from "../api/auth";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProtected(token).then((res) => setMessage(res.message));
    } else {
      setMessage("Not logged in ❌");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
}

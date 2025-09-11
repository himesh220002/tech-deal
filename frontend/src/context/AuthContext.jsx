import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on app start
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedToken = localStorage.getItem("token");

    console.log("🔍 AuthContext init:");
    console.log("userEmail from localStorage:", savedEmail);
    console.log("token from localStorage:", savedToken);

    if (savedEmail && savedToken) {
      setUserEmail(savedEmail);
      setToken(savedToken);
    }
  }, []);

  const login = (email, token) => {
    setUserEmail(email);
    setToken(token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", token);
  };

  const logout = () => {

    console.log("🚪 Logging out...");
    console.log("Before cleanup:", {
      userEmail: localStorage.getItem("userEmail"),
      token: localStorage.getItem("token"),
    });

    setUserEmail(null);
    setToken(null);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");

    console.log("After cleanup:", {
      userEmail: localStorage.getItem("userEmail"),
      token: localStorage.getItem("token"),
    });
  };

  return (
    <AuthContext.Provider value={{ userEmail, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

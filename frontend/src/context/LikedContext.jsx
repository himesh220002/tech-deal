import { createContext, useContext, useState, useEffect } from "react";

const LikedContext = createContext();

export function LikedProvider({ children }) {
  const [likedItems, setLikedItems] = useState(() => {
    const email = localStorage.getItem("userEmail")?.trim().toLowerCase();
    if (!email) return [];
    const stored = localStorage.getItem(`likedItems:${email}`);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail")?.trim().toLowerCase();
    if (email) {
      localStorage.setItem(`likedItems:${email}`, JSON.stringify(likedItems));
    }
  }, [likedItems]);

  

  return (
    <LikedContext.Provider value={{ likedItems, setLikedItems}}>
      {children}
    </LikedContext.Provider>
  );
}

export function useLiked() {
  return useContext(LikedContext);
}

// src/context/AppContext.js
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Auto-check auth status on app load (using cookie-based session)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/authenticated`, {
          method: 'POST',
          credentials: 'include', // Send cookies
        });

        const data = await response.json();

        if (data.success) {
          setIsLoggedIn(true);
          setUserData(data.user); // assuming { success: true, user: { ... } }
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, [backendUrl]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

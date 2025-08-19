// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { listenToAuthChanges } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // Firebase user object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = listenToAuthChanges((firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

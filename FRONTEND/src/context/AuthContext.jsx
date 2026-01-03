// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from "../services/authService.js";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
// const AuthContext = createContext(null);


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // Firebase user object
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    setLoading(false);
  });

  return unsubscribe;
}, []);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
  return   useContext(AuthContext);
}
 

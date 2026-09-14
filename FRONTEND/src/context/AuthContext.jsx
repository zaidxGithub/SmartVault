// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listenToAuthChanges } from "../services/authService.js";
import { auth } from "../firebase.js";
import { onAuthStateChanged ,signOut} from "firebase/auth";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // Firebase user object
  const [loading, setLoading] = useState(true);
//Logout loading
  const [logoutLoading, setLogoutLoading] = useState(false);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    setTimeout(()=>{
    setLoading(false);
    },100)
  });

  return unsubscribe;
}, []);

const handleLogout = async () => {
  try {
    setLogoutLoading(true);

    await signOut(auth);

    setTimeout(() => {
      setLogoutLoading(false);
    }, 700);

  } catch (error) {
    console.error("Logout failed:", error);
    setLogoutLoading(false);
  }
};
  return (
    <AuthContext.Provider value={{ user, loading ,logoutLoading,handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
  return   useContext(AuthContext);
}


import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PasswordGenerator from "./components/PassGenerator/PasswordGenerator.jsx";
import PasswordManager from "./components/PasswordStore/PasswordManager.jsx";

import "react-toastify/dist/ReactToastify.css";
import { auth 
} from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  replace,
} from "react-router-dom";
import "./App.css";
import { useState } from "react";
import NotesRoutes from "./routes/NotesRoutes.jsx";
import FileManager from "./routes/FileManager.jsx";
import { useEffect } from "react";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const[isAuthLoading,setIsAuthLoading]=useState(true);



useEffect(()=>{

  const unsubscribe=onAuthStateChanged(auth,(user)=>{
    setIsUserLoggedIn(!!user);
    setIsAuthLoading(false);
  });
  return()=>unsubscribe();


},[])
if(isAuthLoading){
  return <p> Checking for authentication...</p>
}











  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            isUserLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/PasswordGenerator"
          element={
          
              <Navigate to="/login" replace />
        
          }
        />
        <Route
          path="/PasswordManager"
          element={
           
              <PasswordManager />
          
             
          }
        />
        <Route
        // base url of  the note manager app
          path="/noteshome/*"
          element={
            
              <NotesRoutes/> 
            
          } 
        />
        <Route
        // base url of  the note manager app
          path="/filemanager/*"
          element={
            
              <FileManager/> 
            
          } 
        />
       
       
        
      </Routes>
    </Router>
  );

}

export default App;

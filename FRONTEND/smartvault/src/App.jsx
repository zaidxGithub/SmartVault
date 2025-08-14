import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PasswordGenerator from "./components/PassGenerator/PasswordGenerator.jsx";
import PasswordManager from "./components/PasswordStore/PasswordManager.jsx";
import HomeNotes from "./components/NotesApp/HomeNotes.jsx";
import NotesRoutes from "./routes/NotesRoutes.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"; // ✅ Added Navbar

import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <Router>
      {/* Navbar added here */}
      {isUserLoggedIn && <Navbar />}

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
              <Login onLogin={() => setIsUserLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/PasswordGenerator"
          element={
            isUserLoggedIn ? (
              <PasswordGenerator />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/PasswordManager"
          element={
            isUserLoggedIn ? (
              <PasswordManager />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/noteshome/*" element={<NotesRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;

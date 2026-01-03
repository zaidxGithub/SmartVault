import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PasswordManager from "./components/PasswordStore/PasswordManager.jsx";
import PasswordRoutes from "./routes/PasswordRoutes.jsx";
import Register from "./pages/Register.jsx";
import CompleteProfile from "./smallComponents/CompleteProfile.jsx";
import NotesRoutes from "./routes/NotesRoutes.jsx";
import FileManager from "./routes/FileManager.jsx";
import { Profile } from "./pages/Profile.jsx";
import  PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoaderCircleIcon } from "lucide-react";
import "./App.css";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div>
          <div className="flex flex-col justify-center items-center gap-6 h-screen bg-black">
            <p className="text-2xl text-gray-300">Authenticating...</p>
            <LoaderCircleIcon className="size-15  text-white animate-spin"></LoaderCircleIcon>
          </div>
        </div>
      );
    }
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-condition" element={<Terms />} />

  
      <Route path="/complete-profile" element={<CompleteProfile />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
           </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
           </ProtectedRoute>
        }
      />

      <Route
        path="/Passwordmanager/*"
        element={
           <ProtectedRoute>
            <PasswordRoutes />
           </ProtectedRoute>
        }
      />



      <Route
        // base url of  the note manager app
        path="/noteshome/*"
        element={
           <ProtectedRoute>
            <NotesRoutes />
          </ProtectedRoute>
        }
      />



      <Route
        // base url of  the note manager app
        path="/filemanager/*"
        element={
           <ProtectedRoute>
            <FileManager />
           </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  CheckCheck,
  KeyRound,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword.jsx";

import {
  loginWithEmail,
  loginWithGoogle,
} from "../services/authService";
import { toast ,ToastContainer} from "react-toastify";
import { loginUserAPI } from "../services/user.controller.js";

export default function SmartVaultAuth() {
  const [isRegistered, setisRegistered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const[loading,setIsLoading]=useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
            const loginResponse = await loginWithEmail(
        formData.email,
        formData.password
      );

      if (
        loginResponse.operationType == "signIn" ||
        loginResponse.operationType == "signUp"
      ) {console.log(loginResponse);
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setShowWarning(true);
        setTimeout(()=>{
            setShowWarning(false);

        },6000)
        console.log("Invalid Credentials");
      } else if (error.code === "auth/invalid-email") {
        console.error("Invalid Email");
      } else {
        console.log(error);
      }
    }finally{
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      //firebase acoount creation heree
      const userCredential = await loginWithGoogle();
      const firebaseUser = userCredential.user;
      const displayName = firebaseUser.displayName;
       const res = await loginUserAPI(firebaseUser,displayName);
       if(!res){
        toast.warn("Login Failed!")
       }

      navigate("/", { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };



  return (
    <div className="min-h-screen flex bg-[#f9fafb] font-sans">
       <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
           

          />
  
      <div className="w-full lg:w-[55%] flex justify-center items-center px-4  sm:px-6  ">
        <ResetPassword open={showReset} onClose={() => setShowReset(false)} />
        <div className="w-full max-w-xl space-y-6  py-15">
        
          <div className="flex gap-2 space-y-1">
            <div>
              <img
                className="size-11 block lg:hidden rounded-lg"
                src="/favicon.ico"
                alt="app-logo"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg-text-4xl xl-text-6xl  font-semibold text-slate-900">
                SmartVault
              </h1>
              <p className="text-sm text-slate-500">
                Your Secure Digital Vault
              </p>
            </div>
          </div>

      
          <div className="mt-10">
            <h2 className="text-xl font-medium text-slate-800">
              Log in to your account
            </h2>
            <p className="text-sm text-slate-500">
              Don’t have an account?{" "}
              <button onClick={() => navigate("/register")}>
                <span className="text-emerald-600 cursor-pointer hover:underline">
                  Sign up
                </span>
              </button>
            </p>
          </div>

       
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-md text-sm">
            <CheckCheck size={18} />
            <p>You have successfully logged out.</p>
          </div>

         
          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              className="w-full border border-slate-300 rounded-md px-4 py-2 flex items-center justify-center gap-3 hover:bg-slate-50 transition"
            >
              <img src="/googlesvg.png" alt="Google" className="w-5 h-5" />

              <span className="text-sm  text-black/70 font-medium">
                Continue with Google
              </span>
            </button>
          </div>

         
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {showWarning && (
            <div
              className="mt-3 rounded-md border border-l-5 border-yellow-400 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 transition-all duration-300 ease-out
  "
            >
              <p className="font-medium">Unable to sign in</p>

              <div>
                <p className="mt-1">
                  Please provide a valid email address and password. If you
                  continue to have issues logging into your account, contact our
                  Support team.
                </p>
              </div>
            </div>
          )}

       
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                className="w-full border border-slate-300  text-black/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  className="
        w-full border border-slate-300 text-black/70
        rounded-md px-3 py-2 pr-10 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-300
      "/>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
        absolute inset-y-0 right-2 flex items-center
        text-slate-400 hover:text-slate-600
        focus:outline-none
      "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowReset(true)}
                  type="button"
                  className="
        mt-1 flex items-center gap-1 text-xs font-medium
        text-blue-600 hover:text-blue-700 hover:underline
      "
                >
                  <KeyRound size={12} />
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.email || !formData.password}
              className={`w-full flex justify-center items-center  rounded-md py-2 text-white font-medium transition ${
                !formData.email || !formData.password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "  bg-blue-600   hover:bg-blue-700"
              }`}
            >
              { loading ? (<div className="flex items-center gap-2"> <LoaderCircle className="size-4 animate-spin"/><p> Login...</p></div>): "Login"  }
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center">
        <div className="text-center px-10 space-y-4 ">
          <img
            src="/favicon.ico"
            alt="SmartVault"
            className="w-24 mx-auto opacity-90 rounded-xl"
          />
          <h2 className="text-2xl font-semibold text-white">
            Secure. Private. Reliable.
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Store your passwords, notes, and files securely with SmartVault.
            Built with encryption-first architecture.
          </p>
        </div>
      </div>
    </div>
  );
}

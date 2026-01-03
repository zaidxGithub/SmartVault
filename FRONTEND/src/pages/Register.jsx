import React, { useState ,useEffect} from "react";
import {sendEmailVerification} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  registerWithEmail,
} from "../services/authService.js";
import { ToastContainer, toast } from "react-toastify";
import { Eye,EyeOff, LoaderCircle } from "lucide-react";
import { resgisterUserAPI } from "../services/user.controller.js";

export default function Register() {
  const navigate = useNavigate();

  const [isRegistered, setisRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPassMatch, setIsPassMatch] = useState(true);
  const [ispassValid, setIsPassValid] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [isRegisterLoading, setIsregisterLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passValid = () => {
    if (formData.password.trim().length < 6) {
      setIsPassValid(false);
    } else {
      setIsPassValid(true);
    }
  };

  useEffect(() => {
    if (formData.confirmPassword) {
      setIsPassMatch(formData.password === formData.confirmPassword);
    }
    passValid();
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsregisterLoading(true);
      const user = auth.currentUser;

    try {
      const res = await handleVerifyEmail();

      if (res.status == "verification_sent") {
         toast.success("Verification email sent. Please verify to continue.");
         setIsregisterLoading(false);
        return;
      }
      if (res.status == "exists_not_verified") {
        toast.success("verify User Again");
         setIsregisterLoading(false);
        return;
      }
      if (res.status == "already_verified") {
         
        
         const data = await resgisterUserAPI(formData.username);
      if(data.status=="user_exists")
            console.log(data.message);
             setIsregisterLoading(false);
           toast.error("User Already Registered");
          setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);


      }

     
    } catch (error) {
      setIsregisterLoading(false);
      {
        if (error.code === "auth/email-already-in-use") {
          toast.error(error.message);
          console.error(error.message);
          setShowWarning(true);
        } else if (error.code === "auth/invalid-email") {
          console.log("Invalid Email");
          toast.error("Invalid Email ")
        } else {
          console.error(error.message);
        }
      }
    }
  };

  const handleVerifyEmail = async (e) => {
    try {
      try {
        const user = await registerWithEmail(formData.email, formData.password);
        await sendEmailVerification(user);
      
        return {
          status: "verification_sent",
          user,
        };
      } catch (error) {
      
        if (error.code === "auth/email-already-in-use") {
          console.warn("User Already Exist with this Email.")
          toast.error("User Already Exist with this Email")
          const cred = await loginWithEmail(
            formData.email,
            formData.password
          );

          const user = cred.user;
          await user.reload();
          if (user.emailVerified) {
            return {
              status: "already_verified",
              user,
            };
          }

          await sendEmailVerification(user);
          toast.warning(
            "Account exists but email not verified. Verification email resent."
          );
          return {
            status: "exists_not_verified",
            user,
          };
        }

        throw error;
      }
    } catch (err) {
      console.error(err.message);
    }finally{
      setIsregisterLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex bg-[#f9fafb] font-sans">
    
      <div className="w-full lg:w-[55%] flex justify-center items-center px-6 ">
        <div className="w-full max-w-xl space-y-6  ">
             <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
           

          />
         
          <div className="flex gap-2 space-y-1 ">
            <div>
              <img
                className="size-11 block lg:hidden  rounded-lg"
                src="/favicon.ico"
                alt="app-logo"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg-text-4xl xl-text-6xl font-semibold text-slate-900">
                SmartVault
              </h1>
              <p className="text-sm text-slate-500">
                Your Secure Digital Vault
              </p>
            </div>
          </div>
          <ToastContainer />

         
          <div>
            <h2 className="text-xl font-medium text-slate-800">Regsiter</h2>
            <p className="text-sm text-slate-500">
              Have an existing account?{" "}
              <button onClick={() => navigate("/login")}>
                <span className="text-emerald-600 cursor-pointer hover:underline">
                  Login
                </span>
              </button>
            </p>
          </div>

          <div className="space-y-3"></div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          {showWarning && (
            <div className="mt-3 rounded-md border border-l-5 border-yellow-400 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 transition-all">
              <p className="font-medium">Unable to sign in</p>
              <p className="mt-1">Acoount Already Exist With Same Email</p>
            </div>
          )}

    
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                username
              </label>
              <input
                type="text"
                placeholder="you@example"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                className="w-full border  text-black/70  border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

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
                className="w-full border border-slate-300   text-black/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <div>
               
              </div>
              <div>
               
              </div>
              <div>
               
              </div>
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
      "
    />

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


  {!ispassValid && (
    <p className="text-xs text-gray-500">
      Password should be at least 6 characters
    </p>
  )}
  </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                onChange={handleInputChange}
                value={formData.confirmPassword}
                className="w-full border border-slate-300  text-black/70 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {!isPassMatch && (
                <p className="text-xs text-gray-600">Password do not match !</p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                !formData.email ||
                !formData.password ||
                !formData.username ||
                !formData.confirmPassword
              }
              className={`w-full flex justify-center items-center rounded-md py-2 text-white font-medium transition ${
                !formData.email ||
                !formData.password ||
                !formData.username ||
                !formData.confirmPassword
                  ? "bg-gray-400 cursor-not-allowed"
                  : "  bg-blue-600   hover:bg-blue-700"
              }`}
            >
              {isRegisterLoading ? (<div  className="flex items-center gap-2"> <LoaderCircle className="size-4 animate-spin"/><p>Registering...</p> </div>) : "Register"}
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
          <p className="text-blue-100 text-sm leading-relaxed">
            Store your passwords, notes, and files securely with SmartVault.
            Built with encryption-first architecture.
          </p>
        </div>
      </div>
    </div>
  );
}

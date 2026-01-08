import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteUserAPI } from "../services/user.controller";
import { auth } from "../firebase";
import { replace } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Loader2Icon, LoaderIcon } from "lucide-react";

const DeletePass = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showCredentialWarninig, setShowCredentialWarning] = useState(false);
  const[loading,setLoading]=useState(false);

  if (!isOpen) return null;

  const handleDeleteUser = async () => {
   setLoading(true)

    try {
      const response = await deleteUserAPI(email, password);
      if (response.error == "auth/invalid-credential") {
        setShowCredentialWarning(true);
        setLoading(false);
        setTimeout(() => {
          setShowCredentialWarning(false);
        }, 8000);

        return;
      }

      if (response.success == "false") {
        setLoading(false);
        console.log(response.message);
        return;
      }
      setLoading(false);
      if(!response){
        console.log("Deleteion Failed!")
        return;

      }

      navigate("/login", { replace: true });

      toast.success(response.message);
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        setShowCredentialWarning(true);
        setTimeout(() => {
          setShowCredentialWarning(false);
        }, 2000);

        console.warn("Invalid Credentials By ERROR:", error.message);
      }
    }finally{
        setLoading(false);
    }
  };

  const verifyAuthenticUser = async () => {
      if (email.trim() == "" || password.trim() == "") {
      toast.warn("Enter email and password");
      return;
    }
    setShowWarning(true);
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
     <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
           

          />

      {/* Modal */}
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-xl transition-all duration-300 ease-in-out">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center">Delete  Account</h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          Please confirm your credentials to continue
        </p>

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-red-400 dark:bg-neutral-800
                       dark:border-neutral-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm outline-none
                       focus:ring-2 focus:ring-red-500 dark:bg-neutral-800
                       dark:border-neutral-700"
          />
        </div>

        {/* Warning message */}
        {showWarning && (
          <div className="mt-4 rounded-lg bg-red-100 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
            ⚠️ Are you sure you want to delete your account?
            <br />
            <strong>All your data will be permanently lost.</strong>
          </div>
        )}
        {showCredentialWarninig && (
          <div className="mt-4 rounded-lg bg-red-100 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
            ⚠️Invalid User Credentails!
            <br />
            <strong>Reset Your password or Try Again.</strong>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3 ">
          <button
            onClick={onClose}
            className="rounded-lg border-1 border-[var(--border)] px-4 py-2 text-sm text-gray-600
                       hover:bg-gray-100 dark:text-gray-300
                       dark:hover:bg-neutral-800"
          >
            Cancel
          </button>

          {!showWarning ? (
            <button
              onClick={() => verifyAuthenticUser()}
              className="rounded-lg bg-red-700/50 px-4 py-2 text-sm text-white
                         hover:bg-red-700"
            >
              Confirm Delete
            </button>
          ) : (
            <button
              onClick={() => handleDeleteUser()}
              className="rounded-lg  bg-red-600/60 px-4 py-2 text-sm text-white
                         hover:bg-red-800"
            >
              {  loading ? (<div className="flex gap-1"><Loader2Icon className="animate-spin size-4"/>Deleting...</div>):("Delete Permanently")}
            </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default DeletePass;

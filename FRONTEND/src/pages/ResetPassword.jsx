import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { X } from "lucide-react";
import { toast ,ToastContainer} from "react-toastify";

export default function ResetPassword({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;
  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent!");
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 ">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />
   <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
           

          />
      <div className="
        relative z-10 w-full max-w-sm rounded-xl bg-white p-6
        shadow-xl transition-all duration-300 ease-out
        animate-in fade-in zoom-in-95
      ">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          Reset password
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your email and we’ll send you a reset link.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            mt-4 w-full rounded-md border border-gray-300
            px-3 py-2 text-sm outline-none
            focus:border-blue-500 focus:ring-2 text-gray-950 focus:ring-blue-500/30
          "
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="
            mt-4 w-full rounded-md bg-blue-600 px-4 py-2
            text-sm font-medium text-white
            hover:bg-blue-700 disabled:opacity-60
            transition-colors
          "
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Copy, Sparkles, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { aiAPI } from "../../../services/ai";

export default function GeneratePassword() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = async () => {
    setLoading(true);
    setCopied(false);

    try {
      const prompt = "Generate a strong and secure password of 12-16 characters, including uppercase, lowercase, numbers, and @. Return only the password without any explanation.";

      const data = await aiAPI(prompt);
      setGeneratedPassword(data || "Failed to generate password");
    } catch (err) {
      console.error(err);
      setGeneratedPassword("Error generating password");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      toast.success("Password Copied!");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const resetGeneration = () => {
    setGeneratedPassword("");
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center  ">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss
        draggable
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }
      />
      {!generatedPassword ? (
        <button
          type="button"
          onClick={generatePassword}
          disabled={loading}
          className={`flex justify-center ai-glow-btn group relative  px-2  py-2 sm:py-3 sm:px-4  w-full 
      text-sm font-medium text-[var(--foreground)] transition-all duration-300 
      ${
        loading
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-[var(--hover)] hover:shadow-md"
      }`}
        >
          <span className="relative z-10 flex items-center gap-2 text-sm sm:text-sm">
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-[var(--foreground)] rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className=" w-4 h-4 text-[var(--foreground)] item-center transition-transform duration-300 group-hover:rotate-12" />
                 Generate Password 
              </>
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#58a6ff40] to-[#8b5cf640] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </button>
      ) : (
        <div className="w-full flex items-center justify-between px-3 py-2  border-2 rounded-md">
          <span className="text-sm font-mono text-[var(--foreground)]  truncate">
            {generatedPassword}
          </span>
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="text-[var(--icon)] hover:text-[var(--secondary)] focus:text-[var(--icon-copy-focus)]  transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => resetGeneration()}
              className="text-[var(--icon)] hover:text-[var(--secondary)] focus:text-[var(--icon-copy-focus)]  transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

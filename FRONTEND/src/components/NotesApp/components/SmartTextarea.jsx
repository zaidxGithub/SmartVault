import React, { useState } from "react";

const SmartTextarea=()=> {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative w-full">
      <textarea
        name="newnotetextbox"
        onChange={(e) => setContent(e.target.value)}
        value={loading ? "" : content}
        placeholder="Write your note here..."
        disabled={loading}
        className="w-full px-4 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
          focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
          transition text-[var(--foreground)] placeholder-[#8b949e] min-h-[160px] sm:min-h-[200px] 
          resize-y text-sm sm:text-base"
      />

      {/* Animated overlay when loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--accent)] bg-opacity-90 rounded-md">
          <div className="flex items-center gap-1 text-[#58a6ff] text-base sm:text-lg font-medium">
            <span className="animate-bounce delay-0">●</span>
            <span className="animate-bounce delay-150">●</span>
            <span className="animate-bounce delay-300">●</span>
          </div>
        </div>
      )}

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="bg-[#58a6ff] hover:bg-[#1f6feb] text-black font-semibold px-4 py-1 rounded-md transition"
        >
          Test AI
        </button>
      </div>
    </div>
  );
}
export default SmartTextarea;
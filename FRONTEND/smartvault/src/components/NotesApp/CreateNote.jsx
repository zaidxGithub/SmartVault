



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotesLogic } from "./noteLogic";
import { ToastContainer } from "react-toastify";

const CreateNote = () => {
  const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const navigate = useNavigate();
  const { title, content, setTitle, setContent, createNote } = useNotesLogic();

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-6">
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-3xl mx-auto bg-[#161b22] rounded-lg shadow-lg border border-[#30363d]">
        <div className="p-4 sm:p-6 border-b border-[#30363d]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#c9d1d9]">NEW NOTE</h2>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Title Section */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-[#c9d1d9]">TITLE</h3>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
            />
            <div className="text-xs sm:text-sm flex justify-between">
              {title === "" ? (
                <p className="text-[#f03c3ce8]">* Title</p>
              ) : (
                <p className="text-[#c9d1d9]">{countWords(title) + " word"}</p>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg font-semibold text-[#c9d1d9]">CONTENT</p>
            <textarea
              name="newnotetextbox"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e] min-h-[150px] sm:min-h-[200px] resize-vertical text-sm sm:text-base"
            ></textarea>
            {content === "" ? (
              <p className="text-[#f03c3ce8] text-xs sm:text-sm">* Content</p>
            ) : (
              <p className="text-[#c9d1d9] text-xs sm:text-sm">
                {countWords(content) + " word"}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 border-t border-[#30363d]">
            <button
              onClick={() => navigate("/noteshome")}
              className="px-5 py-2 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] hover:cursor-pointer focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={createNote}
              className="px-5 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] hover:cursor-pointer focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors text-sm sm:text-base"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;

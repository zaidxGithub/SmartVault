
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateNoteById } from "./noteLogic";

const UpdateNote = () => {
  const countWords = (str) =>
    str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    try {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const note = notes.find(
        (storedNote) => String(storedNote.id) === String(id)
      );
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    } catch (error) {
      console.log("Error loading note:", error);
    }
  }, [id]);

  const handleUpdate = () => {
    updateNoteById(id, {
      title,
      content,
      date: new Date().toLocaleDateString(),
    });
    toast.success("Note Updated Successfully");
    setTimeout(() => navigate("/notesHome"), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto bg-[#161b22] rounded-lg shadow-lg border border-[#30363d]">
        <ToastContainer />

        <div className="p-4 sm:p-6 border-b border-[#30363d]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#c9d1d9] text-center sm:text-left">
            UPDATE NOTE
          </h2>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-[#c9d1d9]">
              NEW TITLE
            </h3>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
            />
            <div className="text-xs sm:text-sm">
              {title === "" ? (
                <p className="text-[#f85149]">* Title </p>
              ) : (
                <p className="text-[#c9d1d9]">{countWords(title)} word</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-base sm:text-lg font-semibold text-[#c9d1d9]">
              NEW CONTENT
            </p>
            <textarea
              name="newnotetextbox"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none text-[#c9d1d9] placeholder-[#8b949e] min-h-[150px] sm:min-h-[200px] resize-y text-sm sm:text-base"
            ></textarea>
            <div className="text-xs sm:text-sm">
              {content === "" ? (
                <p className="text-[#f85149]">* Content </p>
              ) : (
                <p className="text-[#c9d1d9]">{countWords(content)} word</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-[#30363d]">
            <button
              onClick={() => navigate("/notesHome")}
              className="w-full sm:w-auto px-5 py-2 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto px-5 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;


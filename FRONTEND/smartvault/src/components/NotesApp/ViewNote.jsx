

import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const ViewNote = () => {
  const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  try {
    useEffect(() => {
      const notes = JSON.parse(localStorage.getItem("notes")) || []
      console.log("ALL NOTES FETCHED:", notes)

      const note = notes.find((storedNote) => String(storedNote.id) === String(id))

      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else {
        console.log("Old note not found :");
      }
    }, [id]);
  } catch (error) {
    console.log("there some error in useEffect of Updatenote.jsx :", error)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto bg-[#161b22] rounded-xl shadow-2xl border border-[#30363d] overflow-hidden">

        <div className="p-4 sm:p-10 space-y-6 sm:space-y-10">
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-lg sm:text-2xl font-bold text-[#c9d1d9]/70 tracking-wide uppercase">Title</h3>
            <input
              value={title}
              disabled
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none text-[#c9d1d9] placeholder-[#8b949e]"
            />
            {title && (
              <p className="text-xs sm:text-sm text-[#8b949e]">
                {countWords(title)} {countWords(title) === 1 ? "word" : "words"}
              </p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-4">
            <p className="text-lg sm:text-2xl font-bold text-[#c9d1d9]/70 uppercase">Your Note</p>
            <textarea
              name="newnotetextbox"
              value={content}
              disabled
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none text-[#c9d1d9] placeholder-[#8b949e] min-h-[40vh] sm:min-h-[60vh] leading-relaxed"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-[#30363d]">
            <NavLink to={"/noteshome"}>
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border border-[#30363d] bg-[#21262d] hover:cursor-pointer text-[#c9d1d9] rounded-lg hover:bg-[#30363d] focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-all"
              >
                Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNote

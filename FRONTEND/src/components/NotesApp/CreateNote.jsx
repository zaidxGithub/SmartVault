import React, { useState } from "react";
import { Sparkles, Wand2, Tags, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotesLogic } from "./noteLogic.js";
import { toast, ToastContainer } from "react-toastify";
import NoteOptions from "./components/NoteOptions.jsx";
import ReminderPicker from "./components/ReminderPicker.jsx";
import { auth } from "../../firebase";
import { aiAPI } from "../../services/ai.js";

const CreateNote = () => {

  const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const navigate = useNavigate();
  const {
    title,
    content,
    setTitle,
    setContent,
    createNote,
    section,
    subject,
    tags,
    color,
    pinned,
    favorite,
    reminder,
    setSection,
    setSubject,
    setTags,
    setColor,
    setPinned,
    setFavorite,
    setReminder,
  } = useNotesLogic();

  const [loading, setLoading] = useState(false);
  const note = content;

  const handleAIAction = async (actionType) => {
   
    if (!content.trim()) {
      toast.error("Please write a note first!");
      return;
    }

    setLoading(true);

    const promptMap = {
      summarize: `Summarize this note briefly and give only the brief part as the output ,nothing else like here are ,this is your summerized version and no special symbols etc:\n${note}`,
      fix: `Fix grammar and rephrase this note,donot give multiple responses and no special symbols:\n${note}`,
      tags: `Suggest 3-5 tags for this note dont give any other response like here are tags etc,just provide the tags with either ordered list and no special symbols:\n${note}`,
      todo: `Extract actionable to-do items from this note dont give any other response like here are todos etc,just todos and no special symbols:\n${note}`,
    };
    const prompt=promptMap[actionType];
    try {

      const data= await aiAPI(prompt);
      console.log(data);

      if (data) {
      setContent(data|| "Failed to generate ");
      setLoading(false);
      }
    } catch (error) {
      console.error("AI request failed:", err);
      alert("AI processing failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-0 sm:p-5">
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

      <div className="max-w-8xl mx-auto bg-[var(--card)] rounded-md shadow-lg border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] tracking-wide">
            New Note
          </h2>
        </div>

        <div className="px-6 py-6 space-y-8">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--primary)]">
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter a title..."
              className="w-full px-4 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
              focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
              transition text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
            />
            <div className="flex justify-between text-xs sm:text-sm mt-1">
              {title === "" ? (
                <p className="text-[#f85149]">* Required</p>
              ) : (
                <p className="text-[#8b949e]">{countWords(title)} word(s)</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                Section
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. Semester 5"
                className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
      text-[#c9d1d9] placeholder-[#8b949e] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Data Structures"
                className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
      text-[#c9d1d9] placeholder-[#8b949e] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--primary)] mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma separated (e.g. algorithm, exam)"
                className="w-full px-3 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
      text-[#c9d1d9] placeholder-[#8b949e] text-sm"
              />
            </div>

            <div>
             
              <div className="flex items-center rounded-lg overflow-hidden space-x-3 ">
               
                <span className="text-xs text-[#8b949e]">{color}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2 ">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="w-4 h-4 accent-[#58a6ff] cursor-pointer "
              />
              <label className="text-sm text-[var(--foreground)]">
                Pin this note
              </label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="w-4 h-4 accent-[#f1e05a] cursor-pointer"
              />
              <label className="text-sm text-[var(--foreground)]">
                Mark as favorite
              </label>
            </div>

            <div className="sm:col-span-2 mt-2">
              <ReminderPicker reminder={reminder} setReminder={setReminder} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--primary)]">
              Content
            </label>

            <textarea
              name="newnotetextbox"
              onChange={(e) => setContent(e.target.value)}
              value={loading ? "Generating..." : content}
              placeholder="Write your note here..."
              disabled={loading}
              className="w-full px-4 py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
              focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
              transition  text-[var(--foreground)] placeholder-[#8b949e] min-h-[160px] sm:min-h-[200px] 
              resize-y text-sm sm:text-base"
            ></textarea>

            <div className="flex justify-between text-xs sm:text-sm ">
              {content === "" ? (
                <p className="text-[#f85149] text-[10px] sm:text-sm">*Required</p>
              ) : (
                <p className="text-[#8b949e]">{countWords(content)} word(s)</p>
              )}

             
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
               <div className="flex flex-wrap gap-1 sm:gap-2">
                <button
                  onClick={() => handleAIAction("summarize")}
                  className="ai-glow-btn flex items-center gap-1 px-2 py-2"
                >
                  <Sparkles className="w-4 h-4 opacity-80" />
                  <span className="sm:text-sm font-medium">Summarize</span>
                </button>

                <button
                  onClick={() => handleAIAction("fix")}
                  className="ai-glow-btn flex items-center gap-1 px-2 py-2"
                >
                  <Wand2 className="w-4 h-4 opacity-80" />
                  <span className="sm:text-sm font-medium">Fix</span>
                </button>

                <button
                  onClick={() => handleAIAction("tags")}
                  className="ai-glow-btn flex items-center gap-1 px-2 py-2"
                >
                  <Tags className="w-4 h-4 opacity-80" />
                  <span className="sm:text-sm font-medium">Tags</span>
                </button>

                <button
                  onClick={() => handleAIAction("todo")}
                  className="ai-glow-btn flex items-center gap-1 px-2 py-2"
                >
                  <CheckSquare className="w-4 h-4 opacity-80" />
                  <span className="sm:text-sm font-medium">Todos</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-1 pt-4 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row justify-end gap-2 border-[var(--border)]">
              <button
                onClick={() => navigate("/noteshome",{replace:true})}
                className=" w-full sm:w-auto px-5 py-2 border border-[var(--border)]  bg-[var(--copy-bg)] text-[#c9d1d9] 
              rounded-md hover:bg-[var(--slideButton)] 
              focus:ring-offset-2 focus:ring-offset-[#0d1117] transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={createNote}
                className=" w-full sm:w-auto px-5 py-2 bg-[var(--copy-bg)] text-white rounded-md 
              hover:bg-[var(--slideButton)] 
              focus:ring-offset-2 focus:ring-offset-[#0d1117] transition text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;

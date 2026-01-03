import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNotesLogic } from "./noteLogic";
import ReminderPicker from "./components/ReminderPicker";
import { aiAPI } from "../../services/ai";
import { Sparkles,
   Wand2,
    Tags,
    CheckSquare, 
    Loader2Icon
  } from "lucide-react";

const UpdateNote = () => {
  
  const countWords = (str) =>
    str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const note = content;
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("");
  const [pinned, setPinned] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [reminder, setReminder] = useState("");
  const { get_Note_By_Id, updateNote } = useNotesLogic();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await get_Note_By_Id(id);
        if (noteData) {
    setTitle(noteData[0]?.title);
    setContent(noteData[0]?.content);
    setSection(noteData[0]?.section);
    setSubject(noteData[0].subject);
    setTags(noteData[0].tags);
    setColor(noteData[0].color);
    setPinned(noteData[0].pinned);
    setFavorite(noteData[0].favorite);
    setReminder(noteData[0].reminder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    const updatedNoteData = await updateNote(
      id,
      title,
      content,
      section,
      subject,
      tags,
      color,
      pinned,
      favorite,
      reminder
    );
    if (!updatedNoteData) {
      console.log("Note Data Not recieved from the backend server!!!");
    }

    setTitle(updatedNoteData.title);
    setContent(updatedNoteData.content);
    setSection(updatedNoteData.section);
    setSubject(updatedNoteData.subject);
    setTags(updatedNoteData.tags);
    setColor(updatedNoteData.color);
    setPinned(updatedNoteData.pinned);
    setFavorite(updatedNoteData.favourite);
    setReminder(updatedNoteData.reminder);
    console.log(updatedNoteData.pinned);
    console.log(updatedNoteData.favourite);

    setTimeout(() => navigate("/notesHome",{replace:true}), 1000);
  };

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
        const data = await aiAPI(prompt);
        console.log("AI RESPONSE:", data);
        if (data) {
        setContent(data || "Failed to generate ");
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
    <div className="min-h-screen bg-[var(--background)]  sm:p-6">
      <div className="w-full max-w-8xl mx-auto bg-[var(--card)] sm:rounded-lg shadow-lg border border-[var(--border)]">
       <ToastContainer
            position="top-center"
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
          />

        <div className="p-4 sm:p-6 border-b border-[var(--border)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] text-center sm:text-left ">
             Update Note
          </h2>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)]">
              New Title
            </h3>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter your note title..."
              className="w-full px-3 py-2 sm:px-4 sm:py-2 text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] rounded-md 
                         focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
                         text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
            />
            <div className="text-xs sm:text-sm">
              {title === "" ? (
                <p className="text-[#f85149]">Title required</p>
              ) : (
                <p className="text-[#8b949e]">{countWords(title)} word(s)</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Section */}
            <div>
              <label className="block text-sm font-semibold  text-[var(--foreground)] mb-1">
                Section
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. Semester 5"
                className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
       text-[var(--foreground)] placeholder-[#8b949e] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold  text-[var(--foreground)] mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Data Structures"
                className="w-full px-3 py-2 text-[var(--foreground)]  bg-[var(--background)] border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
      text-[#c9d1d9] placeholder-[#8b949e] text-sm"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold  text-[var(--foreground)] mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma separated (e.g. algorithm, exam)"
                className="w-full px-3 py-2 bg-[var(--background)]  border border-[var(--border)] rounded-md 
      focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
 text-[var(--foreground)] placeholder-[#8b949e] text-sm"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-semibold  text-[var(--foreground)] mb-1">
                Note Color
              </label>
              <div className="flex items-center rounded-lg overflow-hidden space-x-3 ">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="size-10 border border-[var(--border)] rounded-lg cursor-pointer"
                />
                <span className="text-xs  text-[var(--foreground)]">{color}</span>
              </div>
            </div>

            {/* Pinned */}
            <div className="flex items-center space-x-2 mt-2 ">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="w-4 h-4 accent-[#58a6ff] cursor-pointer "
              />
              <label className="text-sm text-[var(--foreground)]">Pin this note</label>
            </div>

            {/* Favorite */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="w-4 h-4 accent-[#f1e05a] cursor-pointer"
              />
              <label className="text-sm  text-[var(--foreground)]">Mark as favorite</label>
            </div>

            {/* Reminder */}
            <div className="sm:col-span-2 mt-2">
              <ReminderPicker reminder={reminder} setReminder={setReminder} />
            </div>
          </div>

          {/* new code Ends herer */}

          <div className="space-y-3">
            <p className="text-base sm:text-lg font-semibold text-[var(--foreground)]">
              New Content
            </p>
            <textarea
              name="newnotetextbox"
              onChange={(e) => setContent(e.target.value)}
              value={loading ?  " Generating..."
               : content}
              placeholder="Write your updated note content here..."
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-[var(--accent)] border border-[var(--border)] rounded-md 
                         focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
                          text-[var(--foreground)] placeholder-[#8b949e] min-h-[150px] sm:min-h-[200px] resize-y 
                         text-sm sm:text-base"
            >

            </textarea>
            <div className=" flex  justify-between text-xs sm:text-sm">

              {content === "" ? (
                <p className="text-[#f85149]">Content required</p>
              ) : (
                <p className="text-[#8b949e]">{countWords(content)} word(s)</p>
              )}



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

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => navigate("/notesHome",{replace:true})}
              className="w-full sm:w-auto px-5 py-2 border border-[var(--border)] bg-[#21262d] 
                         text-[#c9d1d9] rounded-md 
                         focus:ring-1 focus:ring-[#58a6ff] focus:ring-offset-2 
                         focus:ring-offset-[var(--input)] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto px-5 py-2 bg-[var(--slideButton)] text-[var(--copy-text)] rounded-md 
                        focus:ring-1 focus:ring-[#58a6ff]
                         focus:ring-offset-2 focus:ring-offset-[var(--input)] transition"
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

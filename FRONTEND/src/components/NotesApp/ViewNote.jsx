import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNotesLogic } from "./noteLogic";
import { toast } from "react-toastify";
import { Clock10Icon, PinIcon, StarIcon } from "lucide-react";

const ViewNote = () => {
  const countWords = (str) => {
    return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("");
  const [pinned, setPinned] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [reminder, setReminder] = useState("");
  const { id } = useParams();
  const { get_Note_By_Id } = useNotesLogic();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await get_Note_By_Id(id);
        if (noteData) {
          console.log("this is note data:", noteData);
          setTitle(noteData[0]?.title);
          setContent(noteData[0]?.content);
          setSection(noteData[0]?.section);
          setSubject(noteData[0]?.subject);
          setTags(noteData[0]?.tags);
          setColor(noteData[0]?.color);
          setPinned(noteData[0]?.pinned);
          setFavorite(noteData[0]?.favorite);
          setReminder(noteData[0]?.reminder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
  }, [id]);

  return (
    <div className="min-h-screen  bg-[var(--background)]  sm:p-5 flex sm:items-center sm:justify-center">
      <div className="w-full max-w-8xl mx-auto bg-[var(--card))] rounded-md shadow-2xl border border-[var(--border)] overflow-hidden">
        <div className="p-4 pt-8 sm:p-10 space-y-6 sm:space-y-10">
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-lg sm:text-2xl font-bold text-[var(--primary)] tracking-wide uppercase">
              Title
            </h3>
            <input
              value={title}
              disabled
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg  bg-[var(--accent)] border-2 border-[var(--border)] rounded-lg 
              focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none text-[var(--foreground)] placeholder-[#8b949e]"
            />
            {title && (
              <p className="text-xs sm:text-sm text-[#8b949e]">
                {countWords(title)} {countWords(title) === 1 ? "word" : "words"}
              </p>
            )}
          </div>

          {/* ne Code */}
          <div className="mt-3 flex flex-wrap font-mono gap-2 text-xs sm:text-sm  text-[var(--foreground)] ">
            {section && (
              <span className="px-1 py-1 bg-[var(--tag-note)] rounded-sm">
                {section}
              </span>
            )}
            {subject && (
              <span className="px-1 py-1 bg-[var(--tag-note)] rounded-sm">
                {subject}
              </span>
            )}
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-[var(--tag-note)] rounded-sm">
                  #{tag}
                </span>
              ))}
            {pinned && (
              <span className="px-1 py-1 ]rounded text-[var(--pin-note-text)]">
                <PinIcon className="size-4 sm:size-5"/>
              </span>
            )}
            {favorite && (
              <span className="px-1 py-1 rounded text-[var(--star-note-text)]">
                <StarIcon className="size-4 sm:size-5"/>
              </span>
            )}
            {reminder && (
             
                                 <span className="  text-[var(--muted-foreground)] bg-[var(--accent)]  border-2 border[var(--border)] text-xs sm:text-sm px-2 py-1  rounded-md flex items-center gap-1 max-w-51 ">
               <Clock10Icon className="w-4 h-4 " /> 
               {new Date(reminder).toLocaleString()}
             </span>
            )}
          </div>

          <div className="space-y-2 sm:space-y-4">
            <p className="text-lg sm:text-2xl font-bold text-[var(--primary)] uppercase">
              Your Note
            </p>
            <textarea
              name="newnotetextbox"
              value={content}
              disabled
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-[var(--accent)] border border-[var(--border)] rounded-lg 
              focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none  text-[var(--foreground)]  placeholder-[#8b949e] 
              min-h-[40vh] sm:min-h-[60vh] leading-relaxed"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-[var(--border)]">
            <NavLink to={"/noteshome"}>
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border border-[var(--border)] bg-[var(--slideButton)] text-[var(--foreground)] 
                rounded-lg hover:bg-[var(--accent)] hover:cursor-pointer focus:ring-2 focus:ring-[#58a6ff] 
                focus:ring-offset-2 focus:ring-offset-[var(--input)] transition-all"
              >
                Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;

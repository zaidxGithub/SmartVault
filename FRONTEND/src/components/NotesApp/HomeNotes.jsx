import React, { useState } from "react";
import { NavLink, useActionData } from "react-router-dom";
import { useNotesLogic } from "./noteLogic.js";
import {
  Edit,Trash2Icon,Eye,HomeIcon,ArrowBigLeft,
  CopyIcon,Clock10Icon,PinIcon,StarIcon,Pin,Star,PlusIcon,Filter,
  IceCreamBowlIcon
} from "lucide-react";
import Sidebar from "../../smallComponents/Sidebar.jsx";
import Header from "../../smallComponents/Header.jsx";
import { toast, ToastContainer } from "react-toastify";

const HomeNotes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { deleteNote, notes } = useNotesLogic();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    pinned: false,
    favorite: false,
  });

  const [active, setActive] = useState("all");
    const tabs = [
    { id: "all", label: "All Notes" },
    { id: "pinned", label: "Pinned", icon: <Pin size={16} /> },
    { id: "favorites", label: "Favorites", icon: <Star size={16} /> },
  ];

   const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Back", route: ".", icon: ArrowBigLeft },
  ];
  const sectionName = "Notes Manager";
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .filter((note) => {
      if (filter.pinned && !note.pinned) return false;
      if (filter.favorite && !note.favorite) return false;
      return true;
    });


  const copyNote = (note) => {
    try {
      const textToCopy = `${note.title}\n\n${note.content}\n${note.reminder}`;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success("Note copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy note: ", err);
        });
    } catch (error) {
      console.error("Error copying note: ", error);
    }
  };


  const handleTabActive=(tabId)=>{
    setActive(tabId);
    if (tabId === "pinned") {
    setFilter({ pinned: true, favorite: false });
  } else if (tabId === "favorites") {
    setFilter({ pinned: false, favorite: true });
  } else if (tabId === "all") {
    // Reset both filters for "All Notes"
    setFilter({ pinned: false, favorite: false });
  }
   
     

  }
  return (
    <div className="min-h-screen bg-[var(--background)] pb-1 ">
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden ">
        <Header
          sectionName={sectionName}
          onMenuClick={() => setSidebarOpen(true)}
        />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        className="fixed inset-y-0 left-0 w-64 hidden lg:block"
      />

      <div className="flex-1 min-h-screen pt-14 sm:pt-17 lg:pt-4  lg:px-3 lg:ml-64 ">
        <div className="mb-1 lg-mb-0 ">
          <ToastContainer
            position="top-center"
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} />
          <div className="  bg-[var(--card)] sm:border-l-5 sm:border-b-2 sm:border-r-4 border-t-3 border-[var(--card-border)] sm:rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-row sm:justify-between sm:items-center gap-3 ">
              <div className="w-full sm:w-[70%]">
               
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your notes..."
                  className="w-full px-4 py-2 sm:py-3 bg-[var(--accent)] border border-[var(--border)] rounded-lg 
                  focus-[var(--ring)] focus:ring-[var(--ring)] focus:border-[var(--ring)] outline-none 
                  transition-colors text-[var(--secondary-foreground)] placeholder-[var(--muted-foreground)] text-sm sm:text-base"
                />

              </div>

              <div className="w-[42%] sm:w-auto">
                <NavLink to="/noteshome/createnote">
        <button
          className="ai-glow-btn-2 w-full sm:w-auto flex items-center justify-center gap-1 sm:gap-2
          sm:px-5 py-2 sm:py-3 text-[var(--white)] font-medium text-sm sm:text-base
          hover:cursor-pointer transition-all duration-300"
        >
          <PlusIcon className=" size-3 sm:size-5 opacity-90" />
          Add Note
        </button>
      </NavLink>
              </div>
            </div>



              <div className="w-full sm:w-[70%] h-9 sm:h-11 mt-3 lg:mt-4 flex gap-1 sm:gap-2">
      <div className="flex bg-[var(--accent)] backdrop-blur-sm border-2 border-[var(--slideBorder)] rounded-xl px-2 py-1 relative">
        {/* Sliding highlight */}
        <div
          className={`absolute top-1 bottom-1 bg-[var(--slideButton)]  shadow-xs  shadow-blue-600 rounded-lg transition-all duration-300 ease-in-out`}
          style={{
            width:
              active === "all"
                ? "90px"
                : active === "pinned"
                ? "90px"
                : "100px",
            left:
              active === "all"
                ? "4px"
                : active === "pinned"
                ? "100px"
                : "196px",
          }}
        />

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabActive(tab.id)}
            className={`relative z-10 flex items-center gap-1 px-4 py-1.5  rounded-lg text-sm font-medium transition-colors duration-300 ${
              active === tab.id
                ? "text-gray-200"
                : "text-gray-500 hover:text-gray-400"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>



          </div>
        </div>

        <div className=" flex  pt-1">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-0 gap-y-0 ">
            {filteredNotes?.map((eachNote) => (

              <div
                key={eachNote._id}
                className="bg-[var(--card)] max-h-95 min-h-80 sm:max-h-120  lg:max-h-140 overflow-hidden  rounded-md  p-4 sm:p-5 border-l-6 border-r-4  border-t-1  shadow-md shadow-blue-800/30 border-[var(--card-border)] 
                hover:scale-[1.02]  hover:border-1  hover:border-blue-300 transform transition-all duration-400 ease-in-out
      opacity-100 scale-95 animate-fadeIn"
              >
                <div className="border-b border-[var(--card-border)] pb-3 sm:pb-4">
                  <div className=" flex flex-wrap  sm:justify-around items-end sm:items-center gap-1 ">



                    <div className="flex-1 max-w-full font-mono sm:max-w-[70%]">
                      <p className="overflow-hidden  text-base sm:text-lg font-medium font-mono text-[--primary] break-words">
                        {eachNote.title}
                      </p>
                    </div>

                    {/* this */}

                    <div className=" max-w-41 sm:space-x-2 ">
                      <button
                        onClick={() => copyNote(eachNote)}
                        className=" p-2 text-[var(--muted-foreground)] rounded-md hover:text-[var(--copy-hover)] focus:ring-1 focus:ring-[#58a6ff] focus:ring-offset-1 
                       transition-colors"
                      >
                        <CopyIcon  className=" size-3 sm:size-4 "/>
                      </button>
                      <NavLink to={`/noteshome/updatenote/${eachNote._id}`}>
                        <button
                          className="p-2 text-[var(--muted-foreground)]  rounded-md  hover:text-[var(--primary)] 
                        focus:ring-1 focus:ring-[#388bfd] focus:ring-offset-1
                        focus:ring-offset-[#0d1117] transition-colors"
                        >
                          <Edit  className=" size-3 sm:size-4 " />
                        </button>
                      </NavLink>

                      <button
                        onClick={() => deleteNote(eachNote._id)}
                        className="p-2 text-[var(--muted-foreground)]  rounded-md  hover:text-[var(--delete-hover)]  
                        focus:ring-1 focus:ring-[#f85149] focus:ring-offset-1
                        focus:ring-offset-[#0d1117] transition-colors"
                      >
                        <Trash2Icon className=" size-3 sm:size-4 " />
                      </button>

                      <NavLink to={`/noteshome/viewnote/${eachNote._id}`}>
                        <button
                          className="p-2 text-[var(--muted-foreground)] rounded-md hover:text-[var(--primary)] 
                        focus:ring-1 focus:ring-[#58a6ff] focus:ring-offset-1 
                        focus:ring-offset-[#0d1117] transition-colors"
                        >
                          <Eye  className=" size-3 sm:size-4 " />
                        </button>
                      </NavLink>
                    </div>
                  </div>

                    <div className="mt-3 flex flex-wrap gap-2  font-mono text-xs sm:text-sm text-[var(--tag-text)]">
                      {eachNote.section && (
                        <span className="px-2 py-1 bg-[var(--tag-note)] rounded-sm">
                          {eachNote.section}
                        </span>
                      )}
                      {eachNote.subject && (
                        <span className="px-2 py-1 bg-[var(--tag-note)] rounded-sm">
                          {eachNote.subject}
                        </span>
                      )}
                      {eachNote.tags &&
                        eachNote.tags.length > 0 &&
                        eachNote.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[var(--tag-note)] rounded-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      {eachNote.pinned && (
                        <span className="px-2 py-1  rounded fill-[var(--pin-note-text)] text-[var(--pin-note-text)]/70">
                          <PinIcon className="size-4 sm:size-5"/>
                        </span>
                      )}
                      {eachNote.favorite && (
                        <span className="px-2 py-1 rounded text-[var(--star-note-text)]/70">
                         <StarIcon className="size-4 sm:size-5"/>
                        </span>
                      )}
                    </div>

                </div>
                <div className="mt-3">
                  <p className="text-[var(--muted-foreground)] leading-relaxed text-sm sm:text-base break-words">
                    {eachNote.content}
                  </p>
                </div>

                <div className="mt-3   ">
                  <p className="text-xs sm:text-sm text-[#6e7681] italic mb-2">
                    {new Date(eachNote.createdAt).toLocaleDateString()}
                  </p>

                  {eachNote.reminder && (
                    <span className=" text-xs sm:text-sm px-2 text-[#6e7681] py-1 bg-[var(--secondary)]  rounded-md flex items-center gap-1 sm:max-w-46 max-w-41 ">
                      <Clock10Icon className="w-4 h-4 " />
                      {new Date(eachNote.reminder).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

            ))}


           

          </div>
           {filteredNotes.length === 0 && (

             <div
        className=" flex flex-col w-full min-h-144  rounded-lg text-center items-center justify-center py-12  bg-[var(--card)]  shadow-md border border-[var(--border)]"
      >
        <div className=" mb-2 w-16 h-16 bg-[var(--input)] rounded-full flex items-center justify-center mx-auto ">
          <Filter className="w-8 h-8 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
          No Notes Found
        </h3>
        <p className="text-[var(--muted-foreground)]">
          Try adjusting your filters or Create some Notes.
        </p>
      </div>


            )}
        </div>
      </div>
    </div>
  );
};

export default HomeNotes;

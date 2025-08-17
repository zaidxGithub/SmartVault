












import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNotesLogic } from "./noteLogic.js";
import { Edit, Trash2Icon, Eye, HomeIcon, ArrowBigLeft } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

const HomeNotes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Back", route: ".", icon: ArrowBigLeft },
  ];

  const { deleteNote, notes } = useNotesLogic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const sectionName = "Notes Manager";

  return (
    <div className="min-h-screen bg-[#0d1117]">

      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
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

   
      <div className="flex-1 min-h-screen pt-20 lg:pt-8 px-3 lg:px-7 lg:ml-64">
    
        <div className="mb-4 lg:mb-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
           
              <div className="w-full sm:w-[70%]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your notes..."
                  className="w-full px-4 py-2 sm:py-3 bg-[#0d1117] border border-[#30363d] rounded-lg 
                  focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none 
                  transition-colors text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
                />
              </div>

             
              <div className="w-full sm:w-auto">
                <NavLink to="/noteshome/createnote">
                  <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#238636] text-white rounded-md 
                  hover:bg-[#2ea043] focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 
                  focus:ring-offset-[#0d1117] hover:cursor-pointer transition-colors 
                  font-medium text-sm sm:text-base">
                    Create Note
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

    
        <div className="bg-[#161b22] shadow-lg border border-[#30363d] rounded-lg p-4 sm:p-6">
          <div className="space-y-6">
            {filteredNotes?.map((eachNote, index) => (
              <div
                key={index}
                className="bg-[#161b22] rounded-lg shadow-lg p-4 sm:p-6 border border-[#30363d] 
                hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="border-b border-[#30363d] pb-3 sm:pb-4">
                  <div className="flex justify-between items-start sm:items-center gap-3">
                    <div className="flex-1 max-w-full sm:max-w-[70%]">
                      <h3 className="overflow-hidden text-base sm:text-lg font-semibold text-[#c9d1d9] break-words">
                        {eachNote.title}
                      </h3>
                    </div>

                    <div className="flex space-x-2">
                      <NavLink to={`/noteshome/updatenote/${eachNote.id}`}>
                        <button className="p-2 text-white/60 rounded-md hover:text-white 
                        focus:ring-2 focus:ring-[#388bfd] focus:ring-offset-2 
                        focus:ring-offset-[#0d1117] transition-colors">
                          <Edit size={18} />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => deleteNote(index)}
                        className="p-2 text-white/60 rounded-md hover:text-white 
                        focus:ring-2 focus:ring-[#f85149] focus:ring-offset-2 
                        focus:ring-offset-[#0d1117] transition-colors"
                      >
                        <Trash2Icon size={18} />
                      </button>
                      <NavLink to={`/noteshome/viewnote/${eachNote.id}`}>
                        <button className="p-2 text-white/60 rounded-md hover:text-white 
                        focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 
                        focus:ring-offset-[#0d1117] transition-colors">
                          <Eye size={18} />
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[#8b949e] leading-relaxed text-sm sm:text-base break-words">
                    {eachNote.content}
                  </p>
                </div>

                
                <div className="mt-3">
                  <p className="text-xs sm:text-sm text-[#6e7681] italic">
                    {eachNote.date}
                  </p>
                </div>
              </div>
            ))}

            
            {filteredNotes.length === 0 && (
              <p className="text-center text-[#8b949e] text-sm sm:text-base py-6">
                No notes found. Try creating one!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNotes;

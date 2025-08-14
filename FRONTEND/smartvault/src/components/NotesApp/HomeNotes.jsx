





import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNotesLogic } from "./noteLogic.js";
import { Edit, Trash2Icon, Eye } from "lucide-react";

const HomeNotes = () => {
  const { deleteNote, notes } = useNotesLogic();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <div className="rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="w-full sm:w-[70%]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your notes..."
                  className="w-full px-4 py-2 sm:py-3 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e] text-sm sm:text-base"
                />
              </div>
              <div className="w-full sm:w-auto">
                <NavLink to="/noteshome/createnote">
                  <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 focus:ring-offset-[#0d1117] hover:cursor-pointer transition-colors font-medium text-sm sm:text-base">
                    Create Note
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#161b22] shadow-lg border border-[#30363d] rounded-lg flex flex-col">
          <div className="space-y-6 flex flex-col">
            {filteredNotes?.map((eachNote, index) => (
              <div
                key={index}
                className="bg-[#161b22] rounded-lg shadow-lg p-4 sm:p-6 border border-[#30363d] hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-4 max-h-80 overflow-hidden">
                  <div className="border-b border-[#30363d] pb-3 sm:pb-4 overflow-hidden">
                    <div className="flex flex-row  justify-between items-start sm:items-center gap-3">
                      <div className="flex-1  max-w-full sm:max-w-[70%] ">
                        <div className="flex  overflow-hidden text-base sm:text-lg font-semibold text-[#c9d1d9] mb-2 break-words   ">
                          <p className="uppercase">{eachNote.title}</p>
                        </div>
                      </div>
                      <div className="flex f space-x-2">
                        <NavLink to={`/noteshome/updatenote/${eachNote.id}`}>
                          <button className="p-1 text-white/60 rounded-md focus:ring-2 focus:ring-[#388bfd] focus:ring-offset-2 focus:ring-offset-[#0d1117] hover:cursor-pointer transition-colors">
                            <Edit  className="hover:text-white" size={20} />
                          </button>
                        </NavLink>
                        <button
                          onClick={() => deleteNote(index)}
                          className="p-0 text-white/60 rounded-md hover:cursor-pointer focus:ring-2 focus:ring-[#388bfd] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors"
                        >
                          <Trash2Icon className="hover:text-white" size={20} />
                        </button>
                        <NavLink to={`/noteshome/viewnote/${eachNote.id}`}>
                          <button className="p-1 text-white/60 rounded-md focus:ring-2 focus:ring-[#388bfd] focus:ring-offset-2 focus:ring-offset-[#0d1117] hover:cursor-pointer transition-colors">
                            <Eye className="hover:text-white"  size={20} />
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <p className="ml-1 sm:ml-2 text-[#8b949e] leading-relaxed text-sm sm:text-base">
                      {eachNote.content}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="ml-1 sm:ml-2 text-xs sm:text-sm text-[#6e7681] italic">
                    {eachNote.date}
                  </p>
                </div>
              </div>
            ))}










          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNotes;

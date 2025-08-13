




import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useNotesLogic } from './noteLogic';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getNoteById,updateNoteById } from './noteLogic';
import { useParams } from 'react-router-dom';




const UpdateNote = () => {

    const {id}=useParams();
    const navigate=useNavigate();



    
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  try {
    useEffect(() => {
       const notes=JSON.parse(localStorage.getItem("notes"))||[]
       console.log("ALL NOTES FETCHED:",notes)

      const note =notes.find((storedNote)=>String(storedNote.id)===String(id))
      

      if (note) {
        setTitle(note.title);
        setContent(note.content);
      } else{
          console.log(" Old note not found :");
      }
    }, [id]);
  } catch (error) {
    console.log("there some error in useEfffect of Updatenote.jsx :",error)
    
  }




  const handleUpdate=()=>{
    updateNoteById(id, {
      title,
      content,
      date: new Date().toLocaleDateString(),
    });
    toast.success("Note Updated SuccessFully")
    setTimeout(()=>{
    navigate("/notesHome");


    },1000)
  };
   

   
   

    return (
        <div className="min-h-screen bg-[#0d1117] p-6">
            <div className="max-w-3xl mx-auto bg-[#161b22] rounded-lg shadow-lg border border-[#30363d]">
                  <ToastContainer />
                <div className="p-6 border-b border-[#30363d]">
                    <h2 className="text-2xl font-bold text-[#c9d1d9] ">UPDATE NOTE</h2>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* TITLE */}
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold text-[#c9d1d9]"> NEW TITLE</h3>
                        </div>
                        <div>
                            <input  
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text" 
                                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e]"
                            />
                        </div>
                        <div className="text-sm flex flex-row justify-between"> 
                            <div> 
                                {title === "" ? (
                                    <p className="text-[#f85149]">* Title </p>
                                ) : (
                                    <p className="text-[#c9d1d9]">{title.length}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* CONTENT */}
                    <div className="space-y-3">
                        <div>
                            <p className="text-lg font-semibold text-[#c9d1d9]"> NEW CONTENT</p>
                        </div>
                        <div>
                            <textarea 
                                name="newnotetextbox"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e] min-h-75 resize-vertical"
                            ></textarea>
                        </div>
                        <div>
                            {content === "" ? (
                                    <p className="text-[#f85149]">* Title </p>
                                ) : (
                                    <p className="text-[#c9d1d9]">{content.length}</p>
                                )}
                           
                        </div>
                    </div>
                    
                    {/* ACTION BUTTONS */}
                    <div className="flex justify-between pt-4 border-t border-[#30363d]">
                        <div>
                            <button 
                                onClick={() => navigate("/noteshome")}
                                className="px-6 py-2 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors"
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNote

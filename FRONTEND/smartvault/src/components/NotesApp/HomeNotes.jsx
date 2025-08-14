



import React, { useState,useEffect } from 'react'
import { NavLink, useSearchParams } from "react-router-dom";
import CreateNote from './CreateNote.jsx';
import { ToastContainer } from 'react-toastify';

import { useNotesLogic } from './noteLogic.js';
import { useNavigate } from 'react-router-dom';




const HomeNotes = () => {
    const navigate=useNavigate();


    const {   
        editNote,deleteNote,editIndex,notes,updateNote
    } = useNotesLogic();

    
//   const handleEdit = (noteId) => {
//     navigate(`/noteshome/updatenote/${noteId}`);


//   };

const [searchTerm, setSearchTerm] = useState("");
// ill filter the notes by this logic and map the div with filteredNotes 
const filteredNotes = notes.filter(note =>
  note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
);




    


    return (
        <div className="min-h-screen bg-[#0d1117] p-6  ">
            <div className="max-w-4xl mx-auto   ">
          
               

                <div className=""> 
                    <div className="rounded-lg shadow-lg  mb-6 ">
                        <div className="flex justify-between items-center  ">
                             <div className="w-[70%]">
                                    <input 
                                        type="text"
                                        value={searchTerm} 
                                        onChange={(e)=>setSearchTerm(e.target.value)}
                                        placeholder="Search your notes..."
                                        className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg focus:ring-2 focus:ring-[#58a6ff] focus:border-[#58a6ff] outline-none transition-colors text-[#c9d1d9] placeholder-[#8b949e]"
                                    />
                                </div>
                            <div>
                                <NavLink to="/noteshome/createnote"> 
                                    <button 
                                     className="  px-6 py-3 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors font-medium">
                                        Create Note
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    

                </div>  


             
           
               <div   className="bg-[#161b22]  shadow-lg  border border-[#30363d]  rounded-lg flex flex-col ">
                <div className="space-y-6  flex flex-col  ">
                   
                


                    { 

                    filteredNotes?.map(( eachNote,index)=>(
                     

                           
                         <div  key ={index} className="bg-[#161b22] rounded-lg shadow-lg p-6 border border-[#30363d]">
                        <div className="space-y-4">
                            <div className="border-b border-[#30363d] pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-[#c9d1d9] mb-2">
                                            <p> {eachNote.title}</p>
                                           
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <div>
                                            {/* <button onClick={()=>handleEdit(index)} */}
                                            <button 



                                            className="px-4 py-1 bg-[#1f6feb] text-white rounded-md hover:bg-[#388bfd] focus:ring-2 focus:ring-[#388bfd] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors text-sm">

                                                <NavLink to={`/noteshome/updatenote/${eachNote.id}`} > 
                                                    Edit

                                                </NavLink>
                                                
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={()=>deleteNote(index)}
                                            
                                            className="px-4 py-1 bg-[#da3633] text-white rounded-md hover:bg-[#f85149] focus:ring-2 focus:ring-[#f85149] focus:ring-offset-2 focus:ring-offset-[#0d1117] transition-colors text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-[#8b949e] leading-relaxed">
                                   {eachNote.content}
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm text-[#6e7681] italic">
                                   {eachNote.date}
                                </h4>
                            </div>
                        </div>
                    </div>



                        




                    ))

                    }
                     
                    
                   
                </div>    

                
                
             </div>
            </div>
        </div>

     
    )
}

export default HomeNotes

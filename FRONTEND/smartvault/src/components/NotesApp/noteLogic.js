// noteService.js
import { useState ,useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export  const useNotesLogic = () => {
  const navigate = useNavigate();

    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [notes, setNotes] = useState(() => {
  try {
    const saved = localStorage.getItem("notes");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error parsing notes from localStorage:", e);
    return [];
  }
});



  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));

  },[notes]);   


  const createNote = () => {
    if (!title.trim() || !content.trim()){
      toast.error("All fields are required !");
       return;}
    const newNote = {
      id:crypto.randomUUID(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    setNotes( prevNotes=>[newNote, ...prevNotes]);
    resetForm();
    toast.success("Note Created Successfully")
    setTimeout(()=>{
    navigate("/noteshome");


    },1000 )
    
  }; 
  
  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const updateNote = () => {
    if (!title.trim() || !content.trim()) return;
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      updatedNotes[editIndex] = {
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      return updatedNotes;
    });
    setEditIndex(null);
    resetForm();
  };


  const deleteNote = (index) => {
    setNotes(prevNotes=>prevNotes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
 
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditIndex(index);
  };

  return {
    notes,
    title,
    content,
    setTitle,
    setContent,
    editIndex,
    createNote,
    updateNote,
    deleteNote,
    editNote,
  };
};


export const getNotes = () => {
  return JSON.parse(localStorage.getItem("notes")) || [];
};

export const getNoteById = (id) => {
  const notes = getNotes();
  return notes.find((n) => n.id === id);
};

export const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const updateNoteById = (id, updatedData) => {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...updatedData };
    saveNotes(notes);
  }
};


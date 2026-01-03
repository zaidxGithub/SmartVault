import { useState, useEffect } from "react";
import { useNavigate ,replace} from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNoteAPI,
  deleteNoteAPI,
  updateNoteAPI,
  getNotesAPI,
  getNoteByIdAPI,
} from "../../services/notes.js";

export const useNotesLogic = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [notes, setNotes] = useState([]);
  // const[metaData,setMetaData]=useState([]);
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("");
  const [pinned, setPinned] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [reminder, setReminder] = useState("");

  const get_Note_By_Id = async (id) => {
    try {
      const response = await getNoteByIdAPI(id);
      return response;
    } catch (error) {
      console.log("error getting the note by id: ", error);
    }
  };


  useEffect(() => {
    laodNotes();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const laodNotes = async () => {
    try {
      const data = await getNotesAPI();
      setNotes(data.notes);
    } catch (error) {
      toast.error("Failed To fetch the Notes");
    }
  };

  

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required !");
      return;
    }
    try {
      const newNote = await createNoteAPI({title, content, section, subject, tags, color, pinned, favorite, reminder  });

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      resetForm();
      toast.success("Note Created Successfully");
      setTimeout(() => {
        navigate("/noteshome",{replace:true});
      }, 1000);
    } catch (error) {
      console.log("Error creating note", error);
    }
  };

  const updateNote = async (id ,title, content, section, subject, tags, color, pinned, favorite, reminder) => {

    try {
      
      const updatedNote = await updateNoteAPI(id, {title, content, section, subject, tags, color, pinned, favorite, reminder});
      setNotes((prev) =>
        prev.map((n) => (n.id === updatedNote.noteId ? updatedNote : n))
      );
      resetForm();
      toast.success("Notes Edited Successfully");
      if(!updateNote){
         console.log("Update Not not recieved at the frontend from the updatenoteAPI, : notesLogic")
        
      };
      return updatedNote;
    } catch (error) {
      console.log("Error in UpdateNote function: ",error)
      toast.error("Failed to Update the Note !");
    }
    
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteAPI(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note Deleted Successfully ");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Note ");
    }
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
    laodNotes,
   get_Note_By_Id,
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
   setReminder
   
  };
};








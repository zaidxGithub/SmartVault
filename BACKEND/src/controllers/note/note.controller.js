import {Note} from "../../models/note.model.js";
import {logActivity} from "../../utils/activity.js"

export const createNote = async (req, res) => {
  try {
    const { title, content, section, subject, tags, color, pinned, favorite, reminder } = req.body;
   // from Firebase token
  
    const newNote = new Note({ user: req.user._id, title, content ,  section, subject, tags, color, pinned, favorite, reminder});
    await newNote.save();

    console.log(newNote);

     await logActivity(
      req.user.id,
      "NOTE_ADDED",
      "NOTES_MANAGER",
      { noteTitle: newNote.title }
    );



    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotes=async(req,res)=>{
  try {
    const notes=await Note.find({user:req.user._id});
    res.json( {total:notes.length,notes});
    
  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
}
export const deleteNote=async(req,res)=>{
  try {
    const noteId=req.params.id;
    const deleted=await Note.findOneAndDelete({
      _id:noteId,
      user:req.user._id,

    })



      await logActivity(
      req.user.id,
      "NOTE_DELETED",
      "NOTES MANAGER",
      { noteTitle: deleted.title }
    );
    if(!deleted) return res.status(404).json({error: "Note Not Found !"})
    
      res.json({message:"Note deleted Successfully : "});
  } catch (error) {res.status(500).json({error:error.message});
    
  }
}

export const getNoteById=async(req,res)=>{
  try {
   const noteId=req.params.id;
    const particularNote=await Note.find({
      _id:noteId,
      user:req.user._id,

    })
      if(!particularNote) return res.status(404).json({error: "Note Not Found !"});
      res.json(particularNote);
    
  } catch (error) {
res.status(500).json({error:error.message})
    
  }

}


export const updateNote=async(req,res)=>{
  try { 

    const {title,content, section, subject, tags, color, pinned, favorite, reminder}=req.body;
    if(!req.body) {console.log("nothing recieved from the req.body");}

    
    //  console.log("data from the body:: ",req.body);

   
     const noteId=req.params.id;

      const newupDatedNote=await Note.findByIdAndUpdate(noteId,{title,content, section, subject, tags, color, pinned, favorite, reminder},{returnDocument:"after" } 

     
      
       ) 
       if(!newupDatedNote){
        return res.status(404)
        .json({error:error.message})

       }  
       
      await logActivity(
      req.user.id,
      "NOTE_UPDATED",
      "NOTES MANAGER",
      { noteTitle: newupDatedNote.title}
    );
       
       console.log("updte note at backedn :",newupDatedNote);
        return res.status(200).json(newupDatedNote);

    
  } catch (error) {
     res.status(500).json({ error: "Server error" });
    
  }

}

export const getAllNote=async(req,res)=>{

 try {
  const userID=req.user._id;
  // console.log("id of the user recievd : ",userID)
  const NumberOfNotes=await Note.countDocuments({user:userID});
  
  res.status(201).json(NumberOfNotes);
 } catch (error) {
  console.log("error: ",error.message)
  res.status(500).json({error:error.message});
  
 }
  
}


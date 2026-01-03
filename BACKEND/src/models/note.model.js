import mongoose from "mongoose";
const notesSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    title:{
        type:String,   
        required:true
    },
    content:{
        type:String,   
        required:true
    },
    section: {
    type: String,
    trim: true, 
  },
  subject: {
    type: String,
    trim: true, 
  },
  tags: [
    {
      type: String,
      trim: true, 
    },
  ],
  color: {
    type: String,
    default: "#ffffff", // background color for UI customization
  },
  pinned: {
    type: Boolean,
    default: false, // pinned notes stay on top
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reminder: {
    type: Date, 
  },
  archived: {
    type: Boolean,
    default: false, 
  },
    updatedAt:{
        type:Date,
        default:Date.now
    }
  
},{timestamps:true})

export const Note = mongoose.model("Note",notesSchema)
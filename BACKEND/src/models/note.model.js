import mongoose from "mongoose";
const notesSchema= new mongoose.Schema({
    userId:{
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
    updatedAt:{type:Date,
        default:Date.now
    }
  
},{timestamps:true})

export const Note =mongoose.model("Note",notesSchema)
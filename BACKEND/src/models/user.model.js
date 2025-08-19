import mongoose from "mongooose"

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    profilePicture:{
        type:Image,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },

    createdAt:{type:Date,default:Date.now},
    lastLogin:{type:Date}
})

export const User=mongoose.model("User",UserSchema);
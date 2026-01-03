import mongoose from"mongoose"

const passwordSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
      required: true 
    },
  
  title: {
     type: String,
      required: true 
    },     
    username: {
    type: String,
    required: true
  }, 
  
  password: { 
    type: String, 
    required: true 
},   

iv:{
  type:String,
},
 url: {
    type: String,
  }, 
  tags: {
    type: [String],
    default: []
  }, 

  notes: {
    type: String,
  }, 

  strength: {
    type: String,
    enum: ["Weak", "Medium", "Strong"],
  }, 

  lastUpdated: {
    type: Date,
    default: Date.now
  }, 

  expirationReminder: {
    type: Date,
  }, 
 
  createdAt: {
    type: Date,
    default: Date.now 
},
category: { 
    type: String, 
    enum: ["Social", "Work", "Banking", "Education", "Other"], 
    default: "Other" 
  },

  deviceUsed: {
    type: String,
    enum: ["Mobile", "Desktop", "Tablet", "Unknown","Others" ,"Other"],
    default: "Unknown"
  }, 

  Important: { 
    type: Boolean, 
    default: false 
  }, // mark importan
});

export const Password= mongoose.model("Password", passwordSchema);

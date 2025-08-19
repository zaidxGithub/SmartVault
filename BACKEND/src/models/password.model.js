

import mongoose from"mongoose"

const passwordSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
      required: true 
    },
  
  title: {
     type: String,
      required: true 
    },       // Example: "Gmail", "Facebook"
  username: { 
    type: String,
     required: true 
    },    // Login username/email
  password: { 
    type: String, 
    required: true 
},    // Encrypted before saving
 
  createdAt: {
    type: Date,
    default: Date.now 
}
});

export const PasswordStore= mongoose.model("PasswordStore", passwordSchema);



import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User",
      required: true 
    },

  fileName: {
     type: String, 
     required: true 
    },
  fileType: {
     type: String
     },   // jpg, pdf, docx, etc.
  fileSize: {
     type: Number
     },   // Size in bytes
  fileUrl: { 
    type: String 
 },    // If using cloud storage (AWS, GCP, etc.)

 
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("FileStore", fileSchema);

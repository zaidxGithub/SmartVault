import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  filename: { type: String, required: true },

  originalFilename: { type: String, required: true },
  url: {
    type: String,
    required: true,
  }, 
  secure_url: String, 
  public_id: {
    type: String,
    index: true,
  }, 
  resource_type: String, 
  format: String,
  bytes: Number,
  folder: String,

  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);

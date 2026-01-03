import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "FILE_UPLOADED",
        "FILE_DELETED",
        "NOTE_ADDED",
        "NOTE_DELETED",
        "NOTE_UPDATED",
        "PASSWORD_ADDED",
        "PASSWORD_DELETED",
        "LOGIN",
        "lOGOUT"
      ],
    },
    section: {
      type: String,
      required: true,
    },
    details: {
      type: Object, 
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username Already Exists!"],
    sparse: true,
    trim: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String, // "email" | "google" | "github"
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email associated with other account!"],
    trim: true,
  },

  uid: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

export const User = mongoose.model("User", UserSchema);

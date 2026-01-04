import express, { response ,Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { User } from "../models/user.model.js";
import verifyFirebaseUser from "../middlewares/userMiddleware.js";
import mongoose from "mongoose";
import Activity from "../models/activity.model.js";
import File from "../models/file.model.js";
import { Note } from "../models/note.model.js";
import { Password } from "../models/password.model.js";
import cloudinary from "../config/cloudinary.js"
import admin from "../firebase/firebase.js";
const router = express.Router();

router.post("/deleteUser", authMiddleware, async (req, res) => {
  const UID = req.user?.uid;

  if (!UID) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  let session;

  try {
    
    const user = await User.findOne({ uid: UID });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userID = user._id;

    
    const files = await File.find(
      { userId: userID },
      { public_id: 1, resource_type: 1 }
    );

   
    session = await mongoose.startSession();
    session.startTransaction();

    await Activity.deleteMany({ userId: userID }).session(session);
    await File.deleteMany({ userId: userID }).session(session);
    await Note.deleteMany({ user: userID }).session(session);
    await Password.deleteMany({ user: userID }).session(session);
    await User.deleteOne({ _id: userID }).session(session);

    await session.commitTransaction();
    session.endSession();

    for (const file of files) {
      try {
        await cloudinary.uploader.destroy(file.public_id, {
          resource_type: file.resource_type || "image",
        });
      } catch (err) {
        console.error(
          `Cloudinary delete failed: ${file.public_id}`,
          err.message
        );
      }
    }

    
    try {
      await admin.auth().deleteUser(UID);
    } catch (firebaseErr) {
      console.error("Firebase delete failed:", firebaseErr.message);
     
    }

    return res.json({
      success: true,
      message: "User and all related data deleted successfully",
    });

  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    console.error("Delete user error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

router.post("/login", authMiddleware, async (req, res) => {
  // console.log(" LOGIN WITH GOOGLE INTIATED");
  const { uid, email, picture, provider } = req.user;
  const { username } = req.body;
  console.log("UID NEWUSUER AT BACKEND", uid);

  try {
    let user = await User.findOne({ uid });
    console.log("USER AVAILABLE OR NOT! FIREBASE OR MONGO-", user);

    if (!user) {
      user = await User.create({
        username,
        uid,
        email,
        photo: picture,
        provider,
        isProfileComplete: true,
      });
     
    }

    // console.log("ALREADY EXITED USER IN MONGO-------", user);
    res.json(user);
  } catch (error) {
    console.warn(error.message);
    res.status(401).json(error);
  }
});

router.get("/authUser", authMiddleware, async (req, res) => {
  const uid = req.user.uid;

  let user = null;

  for (let i = 0; i < 5; i++) {
    user = await User.findOne({ uid });
    if (user) break;
    await new Promise((r) => setTimeout(r, 850)); // wait 150ms
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.post("/register", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const uid = req.user.uid;
  session.startTransaction();

  try {
    const email = req.user.email;
    const provider = req.user.provider;
    const picture = req.user.picture;
    // console.log(uid, email, provider, picture);
    const { username } = req.body;
    // console.log("userName from frontend FIREBASE", username);

    if (!username || username.trim() === "") {
      throw new Error("Username is required");
    }

    const exists = await User.findOne({ email }).session(session);
    if (exists) {
      return res.json({ status: "User_exists", user: exists });
    }

    const user = await User.create(
      [
        {
          uid,
          email,
          username,
          provider,
          photo: picture || null,
          isProfileComplete: true,
        },
      ],
      { session }
    );

    // console.log("Created User Details In Mongo->", user);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, user: user[0] });
  } catch (error) {
    console.log("USER NOT CREATED IN MONGO!");
    const deleteMessage = await User.deleteMany({ uid: req.user.uid });
    console.log("MOngo User deletd,", deleteMessage);
    await session.abortTransaction();
    session.endSession();

    // 🔥 CRITICAL ROLLBACK
    try {
      await admin.auth().deleteUser(req.user.uid);
      console.log("USER DELETED FROM FIREBASE TOO");
    } catch (error) {
      console.error("firbase rollback failed", error.message);
    }
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/checkuser", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(409).json({ error: "Username already exists" });
    }

    return res.status(200).json({ message: "Username available" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.get(
  "/activity/recent", verifyFirebaseUser,authMiddleware,async (req, res) => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const firebaseUid = req.user.uid;
    const mongoUser = await User.findOne({ uid: firebaseUid });
    const activities = await Activity.find({
      userId: mongoUser._id,
      createdAt: { $gte: oneHourAgo },
    }).sort({ createdAt: -1 });
    res.json(activities);
  }
);

export default router;

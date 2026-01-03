import {User} from "../models/user.model.js";
import admin from "firebase-admin"; 

export const verifyFirebaseUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)  return res.status(401).json({ error: "No token provided" });
    const decoded = await admin.auth().verifyIdToken(token);
    // find or create user in MongoDB
    let user = await User.findOne({ email: decoded.email });
    req.user = user; // attach Mongo user object
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default verifyFirebaseUser;
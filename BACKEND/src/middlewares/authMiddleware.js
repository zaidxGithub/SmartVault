
import admin from "../firebase/firebase.js";

const authMiddleware = async (req, res, next) => {
  // verifying the firebase token recieved from the fronend
  const authHeader=req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

  const token = req.headers.authorization?.split(" ")[1]; 
  // console.log("token at the backned firebaseuser:",token)
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
  
  req.user = {
  uid: decodedToken.uid,
  email: decodedToken.email,
  provider: decodedToken.firebase.sign_in_provider,
  picture:decodedToken.picture,

};

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token verification failed" });
  }
};

export default authMiddleware;


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const registerWithEmail = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(user, { displayName });
  return user;
};

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

// Observe logged-in user
export const listenToAuthChanges = (callback) =>
  onAuthStateChanged(auth, callback);

// Get fresh JWT to send to your backend
export const fetchIdToken = (forceRefresh = false) =>
  auth.currentUser ? getIdToken(auth.currentUser, forceRefresh) : null;

import { auth } from "../firebase.js";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { GoogleAuthProvider,reauthenticateWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const deleteUserAPI = async (email, password) => {
  const user = auth.currentUser;
  const providerId = user.providerData[0]?.providerId;

  try {
    let authenticateResponse;
    if (providerId === "password") {
      const userCredentials = EmailAuthProvider.credential(
        user.email,
        password
      );
       authenticateResponse = await reauthenticateWithCredential(
        user,
        userCredentials
      );
    }

    if (providerId === "google.com") {
    const provider = new GoogleAuthProvider();
     authenticateResponse = await reauthenticateWithPopup(user, provider);
  }
    

    console.log("Auth response REAUTH:", authenticateResponse.user.uid);

    console.log("User re Authenticated SuccesFully.");
  } catch (error) {
    console.error("Re-auth failed:", error.code);
    return {
      success: false,
      error: error.message,
    };
  }

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${BASE_URL}/user/deleteUser`;
  console.log("API URL DELETE", API_URL);

  const token = await auth.currentUser.getIdToken();
  // console.log("TOKEN",token);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const deleteResponse = await response.json();
  console.log("deleteResponse:", deleteResponse);

  return deleteResponse;
};


export const resgisterUserAPI=async(username)=>{
    const token = await auth.currentUser.getIdToken();
          const BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username: username,
            }),
          });

            const data = await response.json();
            console.log("USER STATUSSS", data.status);

                if (!response.ok) {
            toast.error("Register again.")
           throw new Error(data.error || "Registration failed");
      }

      return data;
}


export const loginUserAPI=async(firebaseUser,displayName)=>{

    const token = await firebaseUser.getIdToken();
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: displayName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      return data;

}
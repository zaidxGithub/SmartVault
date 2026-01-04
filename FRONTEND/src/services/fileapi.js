import { auth } from "./../firebase.js";
import { getIdToken } from "firebase/auth";

const getToken = async () => {
  if (auth.currentUser) {
    return auth.currentUser.getIdToken();
  }
  return null;
};

export const handleDeleteAPI = async (file) => {
     const BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${BASE_URL}/api/file/`;
  try {
    const currentFilePublicId = file.public_id;
    const resourceType = file.resource_type;

    const token = await getToken();
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentFilePublicId, resourceType }),
    });
    if (!response.ok) {
      console.log("file not deleted");

      return { success: false, message: "File cant be deleted!" };
    }
   
    return { success: true, message: "File deleted successfully!" };
  } catch (error) {
    console.log("Error deleting the file:", error);
  }
};

export const handleDownloadAPI = async (file) => {
  try {
    const response = await fetch(file.secure_url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const link = document.createElement("a");

    // save with original filename (spaces allowed)
    link.href = window.URL.createObjectURL(blob);
    link.download = file.originalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href); 
    return { success: true, message: "Download successful" };
  } catch (err) {
    console.error("Download failed:", err);
    return { success: false, message: err.message || "Download failed" };
  }
};

export const getEachFileDetailsAPI = async (file) => {
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${BASE_URL}/api/file/filestats`;
  try {
    const token = await getToken();
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log("error getting eachdeatails:");
      return { message: "Details Cant be Fetched", success: false };
    }

    const data = await response.json();
    return { message: "Data fetched", success: true, data };
  } catch (error) {
    console.log("error getting alldetails:", error);
  }
};

export const getUserFilesAPI = async (e) => {
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${BASE_URL}/api/file`;
   
  try {
    const token = await getToken();
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { message: "Cant fetch Details", success: false };
    }

    const fetchedFiles = await response.json();
    const arrayOfFiles = fetchedFiles.data;
    return { message: "fetched succesfully,", success: true, arrayOfFiles };
  } catch (error) {
    console.log("error", error);
  }
};

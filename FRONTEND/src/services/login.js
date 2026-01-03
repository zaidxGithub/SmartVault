
import {auth} from"../firebase.js"

export const checkUsername = async (username) => {
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;
 const API_URL = `${BASE_URL}/user/checkuser?username=${encodeURIComponent(username)}`;
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    if (!response.ok) {

      console.log("Error getting user exist or not.:",data.error);
       return { success: false, error: data.error };
    }

     return { success: true, data };
   
  } catch (error) {
    console.error("Error checking username:", error);
    return { success: false, error: "Network error" };
  }
};

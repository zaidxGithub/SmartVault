import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

 const BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const API_URL = `${BASE_URL}/passwords`;

const getToken=async()=>{
    if(auth.currentUser){ 
        return await auth.currentUser.getIdToken();
    }
    return null;

}

export const getAllPassword=async()=>{
  const token=await getToken();
  const response=await fetch(API_URL,{
     method:"GET",
    headers:{
      "Content-Type":"application/json",
     Authorization: `Bearer ${token}`,
    }

  });
  if(!response.ok) throw new Error("Passwords Not recieved from the Backend Server!");
  const pass=await response.json();
  return pass;
}

export const getPassStatsAPI=async()=>{
  const token=await getToken();
  const API_URL_STATS=`${BASE_URL}/passwords/stats`;
  const response=await fetch(API_URL_STATS,{
     method:"GET",
    headers:{
      "Content-Type":"application/json",
     Authorization: `Bearer ${token}`,
   

    }

  });
  if(!response.ok) throw new Error("PassStats Not recieved from the Backend Server!");

  const passStats=await response.json();
  return passStats;

}
 export const createpasswordAPI=async(formData)=>{
   let {title,password,username,url,tags,notes,strength,expirationReminder,category,Important,deviceUsed}=formData;
    strength = strength.charAt(0).toUpperCase() + strength.slice(1).toLowerCase();
  category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  deviceUsed = deviceUsed.charAt(0).toUpperCase() + deviceUsed.slice(1).toLowerCase();


    const token = await getToken();
    const response =await fetch(API_URL,{
      method:"POST",
      headers: {
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`,
    },

    body:JSON.stringify(
      {title,
        password,
        username,
        url:url||"",
        tags:tags||[],
        notes:notes||""
        ,strength: strength || "Weak",
        expirationReminder: expirationReminder || null,
        category:category||"Other",
        Important:Important||false,
        deviceUsed,

      }),

    });  
   
    if (!response.ok) {
    const errText = await response.text();
    // console.error(" Server Error:", errText);
    throw new Error("Failed to save password.");
  }
     const passReturned=await response.json();
    return passReturned;
}

export const deletePasswordAPI=async(id)=>{
   const token= await getToken();

   const response =await fetch(`${API_URL}/${id}`,{
       method:"DELETE",
     headers: {
     "Content-Type":"application/json",
     Authorization: `Bearer ${token}`,
   },
   });

   
  if (!response.ok) throw new Error("Failed to Delete the password ");
    return response.json();
}




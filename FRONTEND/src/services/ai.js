
import { auth

 } from "../firebase";


 export const aiAPI=async(prompt)=>{
    try {
       const token=await auth.currentUser.getIdToken();
        const BASE_URL=import.meta.env.VITE_API_BASE_URL;
         const API_URL = `${BASE_URL}/ai/gemini`
  
    const response=await fetch(API_URL,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({prompt}),
  
    })
    const data=await response.json()
    return data.output;
  
    } catch (error) {
      console.log(error);
      
    }

 }
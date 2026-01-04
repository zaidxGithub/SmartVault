import {auth} from "../firebase.js"
const fetchCurrentUser=async()=>{

  if(!auth.currentUser){
    throw new Error("Not Authorized to Fetch!");
  }
    const token = await auth.currentUser.getIdToken();
     const BASE_URL=import.meta.env.VITE_API_BASE_URL;
     const route=`${BASE_URL}/api/user/profile`;
    
  const response = await fetch(route, {
    headers:{
       Authorization: `Bearer ${token}`,  
    }

  });

  if(!response.ok){
    throw new Error("Failed to fetch User")
  }

  const userData=await response.json();
  return userData;
}






export default fetchCurrentUser 
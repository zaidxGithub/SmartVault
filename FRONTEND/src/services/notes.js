import {auth} from"../firebase.js"

 const BASE_URL=import.meta.env.VITE_API_BASE_URL;
 const API_URL = `${BASE_URL}/notes`;

const getToken=async()=>{
    if(auth.currentUser){ return auth.currentUser.getIdToken();}
    return null;


}

export const getNotesAPI=async()=>{
    const token=await getToken();
    const response=await fetch(API_URL,{    
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
});
if(!response.ok) throw new Error("Failed to fetch the Notes!");
return response.json();

}


 export const createNoteAPI=async({title, content, section, subject, tags, color, pinned, favorite, reminder})=>{
    const token= await getToken();
    const response =await fetch(API_URL,{
        method:"POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body:JSON.stringify({title, content, section, subject, tags, color, pinned, favorite, reminder}),

    });
    if(!response.ok) throw new Error("Failed to Create the Note!");
    return  response.json();
}

export const deleteNoteAPI=async( id)=>{
   const token= await getToken();

   const response =await fetch(`${API_URL}/${id}`,{
       method:"DELETE",
     headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
   });

   
  if (!response.ok) throw new Error("Failed to Delete the note");
  
 return response.json();
}

export const getNoteByIdAPI=async( id)=>{
   const token= await getToken();

   const response =await fetch(`${API_URL}/${id}`,{
     headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
   });
  if (!response.ok) throw new Error("Failed to fetch the note");
  const data=await response.json();
 return data;
}


export const updateNoteAPI=async( id,{title, content, section, subject, tags, color, pinned, favorite, reminder })=>{
   const token= await getToken();
   const response =await fetch(`${API_URL}/${id}`,{
       method:"PUT",
     headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },

   body:JSON.stringify({title, content, section, subject, tags, color, pinned, favorite, reminder}),
   });
  if (!response.ok) throw new Error("Failed to update note");
  const data=await response.json();
return data;
}


export const getTotalNoteAPI=async()=>{
  const token=await auth.currentUser.getIdToken();
     const route=`${BASE_URL}/notes`; 
     const response=await fetch( route,{
        
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  
}  

);

if(!response.ok)
  { throw new Error( "Failed to fetch the all Notes!");
}
return response.json();

     
}

import {auth} from"../firebase.js"

const createUser=async(userData)=>{
    const token=await auth.currentUser.getIdToken();
    const BASE_URL=import.meta.env.VITE_API_BASE_URL;
    const route=`${BASE_URL}/user/register`;

    const res= await fetch(route,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(userData),

    });
    const data=await res.json();
    if (!res.ok) {
    return res.status(500).json({message:"Mongo user creation failed."})
}
return data;
}


export default createUser;
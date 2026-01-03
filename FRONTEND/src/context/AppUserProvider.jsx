
import fetchCurrentUser from '../services/fetchUser.js';
import {createContext,useContext, useState,useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const AppUserContext=createContext();

export const AppUserProvider  = ({children}) => {
    const {user:firebaseUser,loading:authLoading} = useAuth();
    const[loading,setLoading]=useState(false);

  const [appUser, setAppUser] = useState(null);

  useEffect(() => {

    if(authLoading) return;
    if(!firebaseUser){
        setAppUser(null);
        return;

    }
    if (!firebaseUser.emailVerified) {
      setAppUser(null);
      return;
    }
    const loadUserDetails = async () => {
      try {
        const userData = await fetchCurrentUser();

        setAppUser(userData);
        console.log(userData.photo);
      } catch (error) {
        setAppUser(null);
        setLoading(false);
        console.log(error);
      }
    };
    loadUserDetails();
  }, [firebaseUser,authLoading]);


  return (
    <div>
        <AppUserContext.Provider value={{ appUser, loading }}>
      {children}
    </AppUserContext.Provider>
      
    </div>
  )
}

export const useAppUser=()=>{
    return useContext(AppUserContext);
}

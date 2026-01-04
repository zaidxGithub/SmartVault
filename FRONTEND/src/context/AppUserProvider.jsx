
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
    setLoading(true);
    if(!firebaseUser){
        setAppUser(null);
        setLoading(false);
        return;

    }
 
    let retryCount=0;
    const loadUserDetails = async () => {
      try {
        const userData = await fetchCurrentUser();
        if(!userData && retryCount<3){
          retryCount++;
          setTimeout(loadUserDetails,600);
          return;
        }

        setAppUser(userData);
        setLoading(false);
      } catch (error) {
        if(retryCount<3){
          retryCount++;
          setTimeout(loadUserDetails,600);
          return;
        }
        setAppUser(null);
        setLoading(false);
      
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

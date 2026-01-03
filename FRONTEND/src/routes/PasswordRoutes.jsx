import PasswordForm from "../components/PasswordStore/components/PasswordForm";
import PasswordManager from "../components/PasswordStore/PasswordManager";
import { Routes,Router,Route } from "react-router-dom";

import React from 'react'

const PasswordRoutes = () => {
  return (
    <div>
         <Routes>
        <Route path="" element ={ <PasswordManager/> } 
        />
        <Route path='create-password' element ={ <PasswordForm/>} />    
    </Routes>
      
    </div>
  )
}

export default PasswordRoutes;

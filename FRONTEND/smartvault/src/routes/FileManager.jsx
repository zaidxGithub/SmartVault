import React from 'react'
import HomeFileManager from '../components/FIleManagerApp/pages/HomeFileManager.jsx'
import {Route,Routes,Link,NavLink} from "react-router-dom";
import UploadFile from '../components/FIleManagerApp/pages/UploadFile.jsx';
import { Search } from 'lucide-react';
import { FileProvider } from '../components/FIleManagerApp/context/filecontext.jsx';


const FileManager = () => {
  return (

    <div>

      <FileProvider> 
          <Routes>
        <Route path="" element ={<HomeFileManager/>} 
        />
        <Route path='uploadfile' element ={ <UploadFile/>} />
     
      
    </Routes>




      </FileProvider>
    
    </div>
  )
}

export default FileManager
// ye file manager ke routes hain ...  sare components+ main oage yaha render krnge
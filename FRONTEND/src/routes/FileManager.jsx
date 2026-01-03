import React from 'react'
import HomeFileManager from "../components/FileManagerApp/pages/HomeFileManager.jsx";
import {Route,Routes,Link,NavLink} from "react-router-dom";
import UploadFile from '../components/FileManagerApp/pages/UploadFile.jsx';
import { FileProvider } from '../components/FileManagerApp/context/filecontext.jsx';

const FileManager = () => {
  return (
    <div>
      <FileProvider> 
          <Routes>
        <Route path="" element ={<HomeFileManager key={location.pathname}/>} 
        />
        <Route path='uploadfile' element ={ <UploadFile/>} />    
    </Routes>
      </FileProvider>   
    </div>
  )
}

export default FileManager
// ye file manager ke routes hain ...  sare components+ main page yaha render krnge
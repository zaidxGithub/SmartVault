import React from 'react'
import {Route,Routes,Link,NavLink} from "react-router-dom";
import HomeNotes from '../components/NotesApp/HomeNotes';
import CreateNote from '../components/NotesApp/CreateNote';


const NotesRoutes = () => {
  return (
    <div> 

    <Routes>
        <Route path="" element ={ <HomeNotes/>} 
        />
        <Route path='createnote' element ={ <CreateNote/>} />


    </Routes>
      
    </div> 
  )
}

export default NotesRoutes

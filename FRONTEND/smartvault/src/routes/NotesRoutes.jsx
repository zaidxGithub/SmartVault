import React from 'react'
import {Route,Routes,Link,NavLink} from "react-router-dom";
import HomeNotes from '../components/NotesApp/HomeNotes.jsx';
import CreateNote from '../components/NotesApp/CreateNote.jsx';
import UpdateNote from '..//components/NotesApp/UpdateNote.jsx'
import ViewNote from '..//components/NotesApp/ViewNote.jsx'

const NotesRoutes = () => {
  return (

    
    <div> 

    <Routes>
        <Route path="" element ={ <HomeNotes/>} 
        />
        <Route path='createnote' element ={ <CreateNote/>} />
        <Route path='updatenote/:id' element ={<UpdateNote/>} />
        <Route path='viewnote/:id' element ={<ViewNote/>} />




    </Routes>
      
    </div> 
   
  )
}

export default NotesRoutes

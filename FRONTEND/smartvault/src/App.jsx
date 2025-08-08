import { useEffect,useState } from 'react'
import{auth} from "./authFirebase/firebase.js"
import { onAuthStateChanged } from 'firebase/auth'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

function App() {
 

  return (
    <>
    <h2 className='bg-red-100'> vite project main page where all the subprojects will be imported

    </h2>
   


    </>
  )
}

export default App

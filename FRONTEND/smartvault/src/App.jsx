import Login from "./pages/Login.jsx"
import Home from './pages/Home.jsx';
import{BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import './App.css'
import { useState } from 'react';

function App() {

  const[isUserLoggedIn,setIsUserLoggedIn]=useState(false);

  return(
    <Router>
      <Routes>
        <Route  path="/"
        element={ isUserLoggedIn ?( <Home/>):(<Navigate to="/login" replace/>)}/>
        <Route  path="/login"

        element= {isUserLoggedIn ?(<Navigate to ="/" replace/>):(<Login onLogin={()=>
          setIsUserLoggedIn(true)
        }/>)} 
        />
        


  
      </Routes>
    </Router>
  )

  // if(!isUserLoggedIn){
  //   return(
  //     <div>
  //       <Login />
  //     </div>
  //   )
  // }
  //  return(
  //     <div>
  //       <Home/>
  //     </div>
  //   )
 




  
}

export default App

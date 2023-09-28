import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Home} from "./components/Home/Home"
import Navigation from "./components/Navigation/Navigation"
import {Authentication} from "./components/Authentication/Authentication"
import {Signup} from "./components/Signup/Signup"


function App() {

const [user, setUser] = useState(null);
const updateUser = (user) => setUser(user);

  return (
    <>
      <div>  
      <Navigation />
      <Routes>
         <Route path ="/" element = {<Home />}> </Route>  
         <Route path={"/authentication"} element={<Authentication updateUser={updateUser}/>}></Route>
         <Route path={"/signup"} element={<Signup  />}></Route>
      </Routes> 
      </div>
    </> 
  )
}

export default App;

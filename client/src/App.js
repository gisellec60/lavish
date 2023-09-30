import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import {Home} from "./components/Home/Home"
import {Navigation} from "./components/Navigation/Navigation"
import {Signup} from "./components/Signup/Signup"
import {Portal} from "./components/Portal/Portal"
import {Login} from "./components/Login/Login"
import {AddDancer} from "./components/AddDancer/AddDancer"
import {DeleteDancer} from "./components/DeleteDancer/DeleteDancer"
import {SignUpComplete} from "./components/SignUpComplete/SignUpComplete"
import ModifyDancer from "./components/ModifyDancer/ModifyDancer"

function App() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        navigate('/')
      }
    });
  }, []);

   const handleSetUser = ((user) => {
       setUser(user)
       navigate('/portal')
   })

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <div>  
      <Navigation setUser={setUser} user={user}/>
      <Routes>
         <Route path ="/" element = {<Home />}> </Route>  
         <Route path={"/signup"} element={<Signup onSignUp={handleSetUser} />}></Route>
         <Route path={"/signupcomplete"} element={<SignUpComplete  />}></Route>
         <Route path={"/login"} element={<Login onLogin={setUser} />}></Route>
         {
          user ? 
           <Route path={"/portal"} element={<Portal />}></Route>
           : <Route path={"/login"} element={<Login onLogin={setUser} />}></Route> 
         }
         <Route path={"/addDancer"} element={<AddDancer />}></Route>
         <Route path={"/modifyDancer"} element={<ModifyDancer />}></Route>
         <Route path={"/deleteDancer"} element={<DeleteDancer />}></Route>

      </Routes> 
      </div>
    </> 
  )
}


export default App;

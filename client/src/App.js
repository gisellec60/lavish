import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import {Home} from "./components/Home/Home"
import {Navigation} from "./components/Navigation/Navigation"
import {Signup} from "./components/Signup/Signup"
import {Portal} from "./components/Portal/Portal"
import {Login} from "./components/Login/Login"
import {AddDancer} from "./components/AddDancer/AddDancer"
import AddEvent from "./components/AddEvent/AddEvent"
import AddPractice from "./components/AddPractice/AddPractice"
import {DeleteDancer} from "./components/DeleteDancer/DeleteDancer"
import {SignUpComplete} from "./components/SignUpComplete/SignUpComplete"
import ModifyDancer from "./components/ModifyDancer/ModifyDancer"
import ListDancer from "./components/ListDancer/ListDancer"
import ModifyForm from "./components/GetForm/ModifyForm"
import ShowDancerListing from "./components/ShowDancerListing/ShowDancerListing"
import ShowErrorMessages  from "./components/ShowErrorMessages/ShowErrorMessages"
import AllDancers from "./components/AllDancers/AllDancers"
import AllEvents from "./components/AllEvents/AllEvents"
import DeleteEvent from "./components/DeleteEvent/DeleteEvent"
import AllPractices from "./components/AllPractices/AllPractices"
import DeletePractice from "./components/DeletePractice/DeletePractice"


function App() {

  const [user, setUser] = useState(null);
  const [dancer, setDancer] = useState({})
  const [errors, setErrors] = useState(null)

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

   const handleModifyDancer = ((dancer) => {
       setDancer(dancer)
       navigate("/modifyform")
   })

   const handleListDancer = ((dancer) => {
       setDancer(dancer)
       navigate("/showdancerlisting")
    })

    const handleErrorMessages = ((errors)=>{
        setErrors(errors)
        navigate("/showerrormessages")
    })

    const handleCloseButton = (() => {
          navigate ("/portal")
    })
   

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
           <Route path={"/portal"} element={<Portal dancer={dancer} />}></Route>
           : <Route path={"/login"} element={<Login onLogin={setUser} />}></Route> 
         }
         <Route path={"/addDancer"} element={<AddDancer />}></Route>
         <Route path={"/allDancers"} element={<AllDancers onCloseButton={handleCloseButton}/>}></Route>
         <Route path={"/modifyDancer"} element={<ModifyDancer onModifyDancer={handleModifyDancer} />}></Route>
         <Route path={"/deleteDancer"} element={<DeleteDancer />}></Route>
         <Route path={"/listDancer"} element={<ListDancer onListDancer={handleListDancer} />}></Route>
         <Route path= {"/modifyForm"} element={<ModifyForm dancer={dancer} />}></Route>
         <Route path= {"/showdancerlisting"} element={<ShowDancerListing dancer={dancer} />}></Route>
         <Route path={"/showerrormessages"} element={<ShowErrorMessages error={errors} />}></Route>
         <Route path={"/addEvent"} element={<AddEvent />}></Route>
         <Route path={"/deleteEvent"} element={<DeleteEvent />}></Route>
         <Route path={"/allEvents"} element={<AllEvents />}></Route>
         <Route path={"/addPractice"} element={<AddPractice />}></Route>
         <Route path={"/allPractices"} element={<AllPractices />}></Route>
         <Route path={"/deletePractice"} element={<DeletePractice />}></Route>
      </Routes> 
      </div>
    </> 
  )
}

export default App;

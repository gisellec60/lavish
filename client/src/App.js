import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css'
import {Home} from "./components/Home/Home"
import {Navigation} from "./components/Navigation/Navigation"
import {Signup} from "./components/Signup/Signup"
import {Portal} from "./components/Portal/Portal"
import {Login} from "./components/Login/Login"
import {Admin} from "./components/Admin/Admin"
import {AddDancer} from "./components/AddDancer/AddDancer"
import AddEvent from "./components/AddEvent/AddEvent"
import AddPractice from "./components/AddPractice/AddPractice"
import {DeleteDancer} from "./components/DeleteDancer/DeleteDancer"
import ModifyDancer from "./components/ModifyDancer/ModifyDancer"
import ListDancer from "./components/ListDancer/ListDancer"
import AllDancers from "./components/AllDancers/AllDancers"
import DancerEvents from "./components/DancerEvent/DancerEvents"

import AllEvents from "./components/AllEvents/AllEvents"
import DeleteEvent from "./components/DeleteEvent/DeleteEvent"
import ModifyEvent from "./components/ModifyEvent/ModifyEvent"
import EventRegistration from "./components/EventRegistration/EventRegistration"
import EventDancers from "./components/EventDancers/EventDancers"
import AddToEvent from "./components/AddToEvent/AddToEvent"
import DeleteFromEvent from "./components/DeleteFromEvent/DeleteFromEvent"

import AllPractices from "./components/AllPractices/AllPractices"
import DeletePractice from "./components/DeletePractice/DeletePractice"
import ModifyPractice from "./components/ModifyPractice/ModifyPractice"
import DancerPractices from "./components/DancerPractice/DancerPractices"
import PracticeSignup from "./components/PracticeSignup/PracticeSignup"
import PracticeDancers from "./components/PracticeDancers/PracticeDancers"
import AddToPractice from "./components/AddToPractice/AddToPractice"
import DeleteFromPractice from "./components/DeleteFromPractice/DeleteFromPractice"

import AllParents from "./components/Parents/AllParents/AllParents"
import SearchParent from "./components/Parents/SearchParent/SearchParent"
import ModifyParent from "./components/Parents/ModifyParent/ModifyParent"
import {DeleteParent} from "./components/Parents/DeleteParent/DeleteParent"
import ParentDancers from "./components/Parents/ParentDancers/ParentDancers"

import Balances from "./components/Balances/Balances"
import PaymentInfo from "./components/Payment/PaymentInfo"



function App() {

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null)
  const [isParent, setIsParent] = useState(null)
  const [dancer, setDancer] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log(user) 
          handleIsAdmin(user)
          handleIsParent(user)
          setUser(user)
       });
        console.log(user)
        navigate('/')
      }
    });
  }, []);

  const handleIsAdmin = ((user) => {
    if (user.isadmin)
        setIsAdmin(user.isadmin)
  })

  const handleIsParent = ((user) => {
     if (user.isparent)
        setIsParent(user.isparent)
  })

   const handleSetUser = ((user) => {
       setUser(user)
       navigate('/portal')
   })

   const handleModifyDancer = ((dancer) => {
       setDancer(dancer)
       navigate("/modifyform")
   })

   const handleCloseButton = (() => {
          navigate ("/portal")
    })
   
  return (
    <>
      <div>  
      <Navigation setUser={setUser} user={user} setIsAdmin={setIsAdmin} setIsParent={setIsParent}/>
      <Routes>
         <Route path ="/" element = {<Home />}> </Route>  
         <Route path={"/signup"} element={<Signup onSignUp={handleSetUser} handleIsParent={handleIsParent} setIsParent={setIsParent}  />}></Route>
         {
          user ? 
           <Route path={"/admin"} element={<Admin onSignUp={handleSetUser} />}></Route>
            : <Route path={"/login"} element={<Login onLogin={setUser} handleIsParent={handleIsParent} handleIsAdmin={handleIsAdmin} />}></Route> 
         }

         {
          user ? 
           <Route path={"/portal"} element={<Portal dancer={dancer} isAdmin={isAdmin} />}></Route>
           : <Route path={"/login"} element={<Login onLogin={setUser} handleIsParent={handleIsParent} handleIsAdmin={handleIsAdmin}/>}></Route> 
         }

         <Route path={"/addDancer"} element={<AddDancer />}></Route>
         <Route path={"/allDancers"} element={<AllDancers onCloseButton={handleCloseButton}/>}></Route>
         <Route path={"/modifyDancer"} element={<ModifyDancer onModifyDancer={handleModifyDancer} />}></Route>
         <Route path={"/deleteDancer"} element={<DeleteDancer setUser={setUser} setIsAdmin={setIsAdmin} setIsParent={setIsParent} />}></Route>
         <Route path={"/listDancer"} element={<ListDancer  />}></Route>
         <Route path={"/dancer/events"} element={<DancerEvents  />}></Route>
         <Route path={"/dancer/practices"} element={<DancerPractices />}></Route>
         
         <Route path={"/addEvent"} element={<AddEvent />}></Route>
         <Route path={"/deleteEvent"} element={<DeleteEvent />}></Route>
         <Route path={"/allEvents"} element={<AllEvents />}></Route>
         <Route path={"/modifyEvent"} element={<ModifyEvent />}></Route>
         <Route path={"/event/signup"} element={<EventRegistration onClose={handleCloseButton}/>}></Route>
         <Route path={"/eventDancers"} element={<EventDancers onClose={handleCloseButton}/>}></Route>
         <Route path={"/dancer/addtoevent"} element={<AddToEvent onClose={handleCloseButton}/>}></Route>
         <Route path={"/dancer/delfromevent"} element={<DeleteFromEvent onClose={handleCloseButton}/>}></Route>

         <Route path={"/modifyPractice"} element={<ModifyPractice onClose={handleCloseButton} />}></Route>  
         <Route path={"/addPractice"} element={<AddPractice />}></Route>
         <Route path={"/allPractices"} element={<AllPractices />}></Route>
         <Route path={"/deletePractice"} element={<DeletePractice />}></Route>
         <Route path={"/practice/signup"} element={<PracticeSignup onClose={handleCloseButton}/>}></Route>
         <Route path={"/practiceDancers"} element={<PracticeDancers onClose={handleCloseButton}/>}></Route>
         <Route path={"/dancer/addtopractice"} element={<AddToPractice onClose={handleCloseButton}/>}></Route>
         <Route path={"/dancer/delfrompractice"} element={<DeleteFromPractice onClose={handleCloseButton}/>}></Route>

         <Route path={"/parents"} element={<AllParents isAdmin={isAdmin} />}></Route>
         <Route path={"/listParent"} element={<SearchParent />}></Route>
         <Route path={"/modifyParent"} element={<ModifyParent />}></Route>
         <Route path={"/deleteParent"} element={<DeleteParent isAdmin={isAdmin} />}></Route>
         <Route path={"/parentDancers"} element={<ParentDancers />}></Route>

         <Route path={"/balances"} element={<Balances onClose={handleCloseButton} />}></Route>
         <Route path={"/payment"} element={<PaymentInfo />}></Route>
  
      </Routes> 
      </div>
    </> 
  )
}

export default App;

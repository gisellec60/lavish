import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import {Home} from "./components/Home/Home"
import Navigation from "./components/Navigation/Navigation"
import {Signup} from "./components/Signup/Signup"
import {Portal} from "./components/Portal/Portal"
import {AddDancer} from "./components/AddDancer/AddDancer"
import {DeleteDancer} from "./components/DeleteDancer/DeleteDancer"


function App() {
  
  return (
    <>
      <div>  
      <Navigation />
      <Routes>
         <Route path ="/" element = {<Home />}> </Route>  
         <Route path={"/signup"} element={<Signup />}></Route>
         <Route path={"/portal"} element={<Portal />}></Route>
         <Route path={"/addDancer"} element={<AddDancer />}></Route>
         <Route path={"/deleteDancer"} element={<DeleteDancer />}></Route>

      </Routes> 
      </div>
    </> 
  )
}


export default App;

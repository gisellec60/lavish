// import { useState, useEffect } from "react";
import {Route} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";

function App() {
 

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path={"/productions/new"}
          element={
            <div>
              <NewProductionForm  />
            </div>
          }
        />
        <Route path={"/productions/:id"}  />
        <Route
          path={"/authentication"}
          element={
            <div>
              <Authentication />
            </div>
          }
        />
        <Route
          path={"/"}
          element={
            <div>
              <Home productions={productions} />
            </div>
          }
        />
        <Route
          path={"*"}
          element={
            <>
              <h1>Sorry We can't find the Page you're looking for!</h1>
              <h1>404 Not Found</h1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
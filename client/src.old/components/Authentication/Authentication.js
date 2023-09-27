import React, { useState } from "react";
import "./styles.css";

const Authentication = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);

  const handleSignUpClick = () => setSignUp((signUp) => !signUp);

  /*
    - Finish building the authentication controlled for to handle the:
        - value
        - onchange
        - onsubmit of the form
    - on submit create a POST. 
        - There is a button that toggles the component between login and sign up.
        - if signUp is true use the path '/users' else use '/login' (we will be writing login soon)
        - Complete the post and test our '/users' route 
    - On a successful POST add the user to state (updateUser is passed down from app through props) and redirect to the Home page.
    - return to server/app.py to build the next route
*/

  const handleSubmit = () => {
    console.log("Handle the submit");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="name" value={"value"} onChange={console.log} />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={"value"}
              onChange={console.log}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>
      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">{"Errors here!!"}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={handleSignUpClick}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </>
  );
};
export default Authentication;
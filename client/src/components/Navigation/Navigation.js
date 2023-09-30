import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./styles.css";

export const Navigation = ({setUser, user}) => {

  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"}
    )
    .then((r) => {
      if (r.ok) {
        setUser(null)
        navigate("/") 
      }
    });
  }
  const toggleMenu = () => setMenu((prev) => !prev);

  return (
    <div className="navigation">
      <h1 className="nav-title">Lavish Divas Majorette Dance</h1>
      <section className="nav-menu">
        {menu ? (
          <ul>
            <li className="close-button" onClick={() => setMenu(!menu)}>
              X
            </li>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/signup"> Signup</Link>
            </li>
            {
              user ? 
            <li>
              <Link to="/portal"> Portal</Link>
            </li>
            : null
            }
             <li>
               <Link to="/login"> Login</Link>
            </li> 
            <li className="logout-button" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
            <GiHamburgerMenu style={{color:"goldenrod"}} size={50} />
          </div>
        )}
      </section>
    </div>
  )
}  
// export default Navigation;
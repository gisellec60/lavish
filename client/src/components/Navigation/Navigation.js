import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./styles.css";

const Navigation = ({ updateUser }) => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handle logout");
    navigate("/");
  };

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
            <li>
              <Link to="/portal"> Portal</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </li>
          </ul>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
            <GiHamburgerMenu size={50} />
          </div>
        )}
      </section>
    </div>
  );
};
export default Navigation;

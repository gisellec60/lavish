import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./styles.css";

export const Navigation = ({setUser, user}) => {

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

  const activeLinkStyle ={
    color:"white"
  }

  return (
    <Container fluid="md">
      <Row>
        <Col md={6}>
          <div className="navigation">
             <h1 className="nav-title">Lavish Divas Majorette Dance</h1>
          </div>  
      </Col>
      <Col md={1}></Col>
      <Col md={4}>
        <div className="nav-menu">
          <NavLink to="/" exact className="linkStyles"  >
            Home
          </NavLink>
          <NavLink exact to="/signup" className="linkStyles"  activeStyle={activeLinkStyle} >
            Signup
          </NavLink> 
          <NavLink exact to="/portal" className="linkStyles" activeStyle={activeLinkStyle} >
            Portal
          </NavLink>  
          <NavLink exact to="/login" className="linkStyles"  activeStyle={{color:"white",}} >
            Login
          </NavLink> 
          <NavLink exact to="/logout" className="linkStyles"  activeStyle={{color:"white",}} >
            Logout
          </NavLink> 
          </div>
        </Col>
      </Row>
    </Container>
  )
}  

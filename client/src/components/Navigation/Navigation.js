import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./styles.css";

export const Navigation = ({setUser, user, setIsAdmin, setIsParent}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"}
    )
    .then((r) => {
      if (r.ok) {
        handleIsAdmin()
        handleIsParent()
        setUser(null)
        navigate("/") 
      }
    });
  }

   const handleIsParent = (() =>{
       setIsParent(null)
   })

   const handleIsAdmin = (() =>{
    setIsAdmin(null)
  })

   const activeLinkStyle ={
    color:"white"
  }

  return (
    <Container fluid >
      <Row>
        <Col sm={12} md={6} >
          <div className="navigation">
             <h1 className="nav-title">Lavish Divas Majorette Dance</h1>
          </div>  
      </Col>
      {/* <Col md={1}></Col> */}
      <Col sm={{ span: 8, offset: 3 }} md={{ span: 3, offset: 3 }}>
      {/* <Col md={4}> */}
        <div className="nav-menu">
          <NavLink to="/" exact className="linkStyles"  >
            Home
          </NavLink>
          <NavLink exact to="/signup" className="linkStyles"  activeStyle={activeLinkStyle} >
            Signup
          </NavLink> 
          {user ? <NavLink exact to="/portal" className="linkStyles" activeStyle={activeLinkStyle} >
            Portal
          </NavLink> :null  }

          {user ?
            <NavLink exact to="/logout" className="linkStyles"  activeStyle={{color:"white",}}
              onClick={() => {handleLogout()}} >
            Logout
            </NavLink> 
          :
            <NavLink exact to="/login" className="linkStyles"  activeStyle={{color:"white",}} >
            Login
            </NavLink> 
          }
          </div>
        </Col>
      </Row>
    </Container>
  )
}  

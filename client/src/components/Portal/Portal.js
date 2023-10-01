import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import "./styles.css"

export const Portal = ({dancer}) => {
  console.log("this is dance from list", dancer)
  return (
    <div>
        <Container className = "portal-container" >

           <Row>
               <Col className="header">
                    <div className="lavish-heading">
                        Lavish Divas Majorett Dance Portal
                    </div>   
                </Col>
            </Row> 
            <Row>'' </Row>
            <Row>
                <Col className ="col-2 sidebar" >
                    <ul class="list-group" className="list-group">
                        <li>Parent</li>
                        <li class="list-group-item">
                            <Link to="/addDancer"> Add Dancer</Link>
                        </li>  
                        <li class="list-group-item">
                            <Link to="/deleteDancer"> Delete Dancer</Link>
                        </li>                        
                        <li class="list-group-item">
                            <Link to="/listDancer"> Dancer Information </Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/dancer/practice "> Dancer Practice </Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/dancer/events "> Dancer Events </Link>
                        </li> 
                         <li class="list-group-item">
                             <Link to="/dancer/events "> Dancer Events </Link>
                        </li> 
                    </ul>
                    <ul class="list-group" className="list-group">
                       <li>Dancers</li> 
                      <li class="list-group-item">Competitions</li> 
                      <li class="list-group-item">Practice</li> 
                      <li class="list-group-item">
                         <Link to="/listDancer">Dancer by Name </Link>
                      </li>
                    </ul>
                </Col>    
                <Col className="main-content">
                    <form>
                        <label for="first"></label> 
                    </form> 
                </Col>
                <Col className="col-2 sidebar " >
                    <ul class="list-group" className="list-group">
                        <li>Admin Portal</li>
                        <li class="list-group-item">
                            <Link to="/addDancer"> Add Dancer</Link>
                        </li> 
                        <li class="list-group-item">
                            <Link to="/deleteDancer"> Delete Dancer</Link>
                        </li>    
                        <li class="list-group-item">
                            <Link to="/modifyDancer"> Modify Dancer</Link>
                        </li>
                        <li class="list-group-item">
                              <Link to="/dancerbyid"> Search Dancer</Link>
                        </li> 
                        <li class="list-group-item">
                              <Link to="/dancers"> All Dancers</Link>
                        </li>  
                        <li class="list-group-item">
                            <Link to="/addcompetition"> Add Event</Link>
                        </li> 
                        <li class="list-group-item">
                            <Link to="/deletecompetion"> Delete Event</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/modifycompetion"> Modify Event</Link>
                        </li>
                        <li class="list-group-item">
                             <Link to="addpractice"> Add Practice</Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/deletepractice"> Delete Practice</Link>
                        </li>     
                        <li class="list-group-item">
                             <Link to="/modifypractice"> Modify Practice</Link>
                        </li>
                        <li class="list-group-item">Balances</li>   
                    </ul>
                </Col>
            </Row> 
      </Container>
    </div>
  )
}


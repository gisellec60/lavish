import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import { Link } from "react-router-dom";
import "./styles.css"

export const Portal = () => {
  return (
    <div>
        <Container >

           <Row>
               <Col className="header">
                    <div className="lavish-heading">
                        Lavish Divas Majorett Dance Portal
                    </div>   
                </Col>
            </Row> 

            <Row>
                <Col className ="col-2 sidebar" >
                    <h5>Parents</h5>
                    <ul>
                        <li>Search Dancer Information</li> 
                        <li>Payment Information</li> 
                    </ul>
                    <h5>Everyone</h5>
                    <ul>
                      <li>Competition Information</li> 
                      <li>Practice Information </li> 
                      <li>Search Dancer by Name</li>
                    </ul>
                </Col>    
                <Col className="main-content">
                    <p> Just want to see how to put stiff here</p>
                </Col>
                <Col className="col-2 sidebar " >
                    <h5>Admin</h5>
                    <ul>
                        Dancers
                        <li>
                            <Link to="/adddancer"> Add</Link>
                        </li> 
                        <li>
                            <Link to="/deletedancer"> Delete</Link>
                        </li>    
                        <li>
                            <Link to="/modifydancer"> Modify</Link>
                        </li>
                        <li>-----</li>
                        Competition
                        <li>
                            <Link to="/addcompetition"> Add</Link>
                        </li> 
                        <li>
                            <Link to="/deletecompetion"> Delete</Link>
                        </li>
                        <li>
                            <Link to="/modifycompetion"> Modify</Link>
                        </li>
                        <li>-----</li>
                        Practice
                        <li>
                             <Link to="addpractice"> Add</Link>
                        </li> 
                             <Link to="/deletepractice"> Delete</Link>
                        <li>
                             <Link to="/modifypractice"> Modify</Link>
                        </li>
                        <li>-----</li>
                        Search
                        <li>
                              <Link to="/dancerbyid"> Dancer</Link>
                        </li> 
                        <li>
                              <Link to="/dancers"> All Dancers</Link>
                        </li>  
                        Parent
                        <li>Payment Information</li>   
                    </ul>
                </Col>
            </Row> 
      </Container>
    </div>
  )
}


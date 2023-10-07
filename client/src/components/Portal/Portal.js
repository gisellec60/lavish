import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import { Link } from "react-router-dom";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../ExampleCarouselImage/ExampleCarouselImage';
import SpotLight from '../DivaNews/SpotLight';
import DivaNews from '../DivaNews/DivaNews';
import "./styles.css"

export const Portal = ({isAdmin}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
        <Container className = "portal-container" >

           <Row>
               <Col className="header">
                    <div className="lavish-heading">
                        Lavish Divas Majorette Dance Portal
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
                             <Link to="/dancer/practices "> Dancer Practice </Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/dancer/events "> Dancer Events </Link>
                        </li> 
                    </ul>
                    <ul class="list-group" className="list-group">
                       <li>Dancers</li> 
                       <li class="list-group-item">
                         <Link to="/dancer/events "> Competitions </Link>
                        </li> 
                      <li class="list-group-item">
                        <Link to="/dancer/practices">Practice </Link>
                      </li> 
                      <li class="list-group-item">
                         <Link to="/listDancer">Dancer by UserName </Link>
                      </li>
                    </ul>
                </Col>    
                <Col className="main-content">
                     <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <ExampleCarouselImage text="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <SpotLight text="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <DivaNews text="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                {
                 isAdmin ?
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
                              <Link to="/listDancer"> Search Dancer</Link>
                        </li> 
                        <li class="list-group-item">
                              <Link to="/allDancers"> All Dancers</Link>
                        </li>  
                        <li class="list-group-item">
                            <Link to="/allEvents"> All Events</Link>
                        </li> 
                        <li class="list-group-item">
                            <Link to="/addEvent"> Add Event</Link>
                        </li> 
                        <li class="list-group-item">
                            <Link to="/deleteEvent"> Delete Event</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/modifyEvent"> Modify Event</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/allPractices"> All Practices</Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/addPractice"> Add Practice</Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/deletePractice"> Delete Practice</Link>
                        </li>     
                        <li class="list-group-item">
                             <Link to="/modifyPractice"> Modify Practice</Link>
                        </li>
                        <li class="list-group-item">Balances</li>   
                    </ul>
                 </Col>
                   :null
                }  
            </Row> 
      </Container>
    </div>
  )
}


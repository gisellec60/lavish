import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../ExampleCarouselImage/ExampleCarouselImage';
import SpotLight from '../DivaNews/SpotLight';
import DivaNews from '../DivaNews/DivaNews';
import "./styles.css"

export const Portal = ({dancer}) => {
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


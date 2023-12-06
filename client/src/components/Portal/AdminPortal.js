import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../ExampleCarouselImage/ExampleCarouselImage';
import SpotLight from '../DivaNews/SpotLight';
import DivaNews from '../DivaNews/DivaNews';
import "./styles.css"
import { useState } from 'react';

export const AdminPortal = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  

  return (
    <div>
        <Container fluid className = "portal-container" >
        <Row>
        <Col className="header" xs={12} sm={12} md={12}>
                <div className="lavish-heading">
                    Lavish Divas Admin Portal
                </div>   
            </Col>
        </Row> 
        <Row>'' </Row>
    
        <Row>
        <Col className ="col-2 sidebar"  xs ={12} sm={12} md={2} >
            <ul class="list-group" className="list-group">

                {/* Parent Side */}
                <h5 style={{color:"goldenrod"}}>Parent</h5>
                <li class="list-group-item">
                    <Link to="/listParent"> Search Parent</Link>
                </li>  
                <li class="list-group-item">
                    <Link to="/modifyParent"> Modify Parent</Link>
                </li>
                <li class="list-group-item">
                    <Link to="/deleteParent"> Delete Parent</Link>
                </li>                        
                
                <li class="list-group-item">
                        <Link to="/parentDancers "> List Dancer(s) </Link>
                </li> 
                <li class="list-group-item">
                        <Link to="/parents"> All Parents</Link>
                </li> 
                <li class="list-group-item">
                    <Link to="/balances"> Balances </Link>
                </li>
                {/* <li class="list-group-item">
                    <Link to="/"> Payment </Link>
                </li> */}
                </ul>

                {/* Dancer side */}
                <ul class="list-group" className="list-group">
                <h1></h1> 
                <h5 style={{color:"goldenrod"}}>Dancer</h5> 
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
                        <Link to="/dancer/events ">Dancer's Event Schedule</Link>
                </li> 
                <li class="list-group-item">
                        <Link to="/dancer/practices">Dancer's Practice Schedule </Link>
                </li> 
                <li class="list-group-item">
                        <Link to="/dancer/addtopractice">Add To Practice Schedule </Link>
                </li> 
                <li class="list-group-item">
                        <Link to="/dancer/addtoevent">Add Dancer To Event Schedule </Link>
                </li> 
                <li class="list-group-item">
                        <Link to="/dancer/delfromevent">Delete Dancer From Event Schedule </Link>
                </li> 

            </ul>   
        </Col>  

            {/* Carousel */}
        <Col className="main-content" xs={12} sm={12} md={8} >
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

        {/* Events */}
        <Col className="col-2 sidebar " xs={12} sm={12} md={2}>
            <ul class="list-group" className="list-group">
                <h5 style={{color:"goldenrod"}}>Events</h5>
                    <li class="list-group-item">
                    <Link to="/allEvents"> Events Schedule</Link>
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
                    <Link to="/eventDancers"> List Dancers</Link>
                </li>
            </ul>

                {/* Practice */}
            <ul class="list-group" className="list-group">
                <h5 style={{color:"goldenrod"}}>Practice</h5>
                <li class="list-group-item">
                    <Link to="/allPractices"> Practice Schedule</Link>
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
                <li class="list-group-item">
                    <Link to="/practiceDancers"> List Dancers</Link>
                </li>
            </ul>
            <ul class="list-group" className="list-group">
                <h5 style={{color:"goldenrod"}}>Other</h5>
                <li class="list-group-item">
                    <Link to="/admin"> Add Admin</Link>
                </li> 
            </ul>    
        </Col>
      </Row> 
   </Container>
 </div>
  )
}

// xs ={{ span: 6, offset:4 }} sm={{ span: 6, offset: 6 }} md={{span:2, offset:0}}
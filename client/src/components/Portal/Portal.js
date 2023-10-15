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
         
        <Container fluid className = "portal-container" >
         {
           isAdmin ?
           <>
           <Row>
               <Col className="header">
                    <div className="lavish-heading">
                        Lavish Divas Admin Portal
                    </div>   
                </Col>
            </Row> 
            <Row>'' </Row>
            
            <Row>
                <Col className ="col-2 sidebar" >
                    <ul class="list-group" className="list-group">

                        {/* Parent Side */}
                        <h5 style={{color:"goldenrod"}}>Parent</h5>
                        <li class="list-group-item">
                            <Link to="/addDancer"> Search Parent</Link>
                        </li>  
                        <li class="list-group-item">
                            <Link to="/modifyDancer"> Modify Parent</Link>
                        </li>
                        <li class="list-group-item">
                            <Link to="/deleteDancer"> Delete Parent</Link>
                        </li>                        
                        <li class="list-group-item">
                            <Link to="/listbalances">  List Balances </Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/dancer/practices "> List Dancer(s) </Link>
                        </li> 
                        <li class="list-group-item">
                             <Link to="/dancer/events "> All Parents</Link>
                        </li> 
                        <li class="list-group-item">
                            <Link to="/practice/signup"> Balances </Link>
                       </li>
                       <li class="list-group-item">
                            <Link to="/event/signup"> Payment </Link>
                       </li>
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
                    </ul>   
                </Col>  

                 {/* Carousel */}
                <Col className="main-content" >
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
                <Col className="col-2 sidebar " >
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
           </>

        //Parent and Dancer Portal
         :
         <>
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
                  <h5 style={{color:"goldenrod"}}>Parent</h5>
                  <li class="list-group-item">
                      <Link to="/addDancer"> Add Dancer</Link>
                  </li>  
                  <li class="list-group-item">
                      <Link to="/modifyDancer"> Modify Dancer</Link>
                  </li>
                  <li class="list-group-item">
                      <Link to="/deleteDancer"> Delete Dancer</Link>
                  </li>                        
                  <li class="list-group-item">
                      <Link to="/listDancer"> Access Dancer</Link>
                  </li> 
                  <li class="list-group-item">
                       <Link to="/dancer/practices "> Dancer's Practice Schedule </Link>
                  </li> 
                  <li class="list-group-item">
                       <Link to="/dancer/events "> Dancer's Events Schedule</Link>
                  </li> 
                  <li class="list-group-item">
                      <Link to="/practice/signup">Signup for Practice </Link>
                 </li>
                 <li class="list-group-item">
                      <Link to="/event/signup">Register for Event </Link>
                 </li>
                 <li class="list-group-item">
                      <Link to="/practice/signup">Delete Dancer from Practice </Link>
                 </li>
                 <li class="list-group-item">
                      <Link to="/event/signup">Delete Dancer from Event </Link>
                 </li>
              </ul>
              <ul class="list-group" className="list-group">
                 <h1></h1> 
                 <h5 style={{color:"goldenrod"}}>Dancer</h5> 
                 <li class="list-group-item">
                   <Link to="/dancer/events ">Dancer's Event Schedule</Link>
                  </li> 
                <li class="list-group-item">
                  <Link to="/dancer/practices">Dancer's Practice Schedule </Link>
                </li> 
                <li class="list-group-item">
                   <Link to="/listDancer">Access Dancer </Link>
                </li>
                <li class="list-group-item">
                      <Link to="/allEvents"> Events Schedule</Link>
                </li> 
                <li class="list-group-item">
                      <Link to="/allPractices"> Practice Schedule</Link>
                </li> 
                <li class="list-group-item">
                   <Link to="/practice/signup">Signup for Practice </Link>
                </li>
                <li class="list-group-item">
                   <Link to="/event/signup">Register for Event </Link>
                </li>
              </ul>
          </Col>    
          <Col className="main-content" >
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
                  <h5 style={{color:"goldenrod"}}>Admin</h5>
                  <li class="list-group-item">
                      <Link to="/admin"> Add Admin</Link>
                  </li> 
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
                  <li class="list-group-item">Balances</li>   
              </ul>
           </Col>
      </Row> 
      <Row>
      <Col className ="col-2 sidebar" >
          <ul class="list-group" className="list-group">
              <h5 style={{color:"goldenrod"}}>Parent</h5>
              <li class="list-group-item">
                  <Link to="/addDancer"> Add Dancer</Link>
              </li>  
              <li class="list-group-item">
                  <Link to="/modifyDancer"> Modify Dancer</Link>
              </li>
              <li class="list-group-item">
                  <Link to="/deleteDancer"> Delete Dancer</Link>
              </li>                        
              <li class="list-group-item">
                  <Link to="/listDancer"> Access Dancer</Link>
              </li> 
              <li class="list-group-item">
                   <Link to="/dancer/practices "> Dancer's Practice Schedule </Link>
              </li> 
              <li class="list-group-item">
                   <Link to="/dancer/events "> Dancer's Events Schedule</Link>
              </li> 
              <li class="list-group-item">
                  <Link to="/practice/signup">Signup for Practice </Link>
             </li>
             <li class="list-group-item">
                  <Link to="/event/signup">Register for Event </Link>
             </li>
             <li class="list-group-item">
                  <Link to="/practice/signup">Delete Dancer from Practice </Link>
             </li>
             <li class="list-group-item">
                  <Link to="/event/signup">Delete Dancer from Event </Link>
             </li>
          </ul>
          <ul class="list-group" className="list-group">
             <h1></h1> 
             <h5 style={{color:"goldenrod"}}>Dancer</h5> 
             <li class="list-group-item">
               <Link to="/dancer/events ">Dancer's Event Schedule</Link>
              </li> 
            <li class="list-group-item">
              <Link to="/dancer/practices">Dancer's Practice Schedule </Link>
            </li> 
            <li class="list-group-item">
               <Link to="/listDancer">Access Dancer </Link>
            </li>
            <li class="list-group-item">
                  <Link to="/allEvents"> Events Schedule</Link>
            </li> 
            <li class="list-group-item">
                  <Link to="/allPractices"> Practice Schedule</Link>
            </li> 
            <li class="list-group-item">
               <Link to="/practice/signup">Signup for Practice </Link>
            </li>
            <li class="list-group-item">
               <Link to="/event/signup">Register for Event </Link>
            </li>
          </ul>
      </Col>    
      <Col className="main-content" >
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
              <h5 style={{color:"goldenrod"}}>Admin</h5>
              <li class="list-group-item">
                  <Link to="/admin"> Add Admin</Link>
              </li> 
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
              <li class="list-group-item">Balances</li>   
          </ul>
       </Col>
  </Row> 
  </>         
  }
    </Container>
 </div>
  )
}


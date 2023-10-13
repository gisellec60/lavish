import React from 'react'
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'

export const Home = () =>  {
  return (
  <div>
    <Container fluid>
         <Row>
                <Col className = "columns1" xsm ={12} sm={10} md={2} >
                    <h1 className='productions-heading' ><span className='heading-highlight'>L</span>avish <span className='heading-highlight'>D</span>ivas <span className='heading-highlight'>M</span>ajorette <span className='heading-highlight'>D</span>ance </h1> 
                </Col>
         </Row>
         <Row>
                <Col  className="columns2"  >
                   <img className="hero-image" src="https://www.clker.com/cliparts/0/S/k/i/k/0/dance-logo-hi.png" alt="majorette dancer" />
                </Col>  
          </Row>
        </Container>
  </div>

  )
}

// xsm ={12} sm={10} md={2}
// md={{ span: 4, offset: 3 }}


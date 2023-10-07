import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton';
import "./p_styles.css"

const PracticeSignup = ({onClose}) => {
   
  
  return (
    <Container fluid="md">
      <Row className="row-no-user">
        <Col >
           <p className='text'>🚧 Under Construction 🚧 </p>
           <p> Signup for Practice Link is not ready
           </p>
           <CloseButton arial-lable="close" onClick={onClose}/>
        </Col>
      </Row>
    </Container>
     )
}

export default PracticeSignup
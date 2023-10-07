import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import "./styles.css"

const ShowErrorMessages = ({error, onCloseButton }) => {
  return (
    <Container fluid="md">
      <Row className="row1">
        <Col >
           <p className='text'>{error}</p>
           <p>Click "x" to try again or to return to the Portal       
           </p>
           <CloseButton arial-lable="close" onClick={onCloseButton}/>
        </Col>
      </Row>
    </Container>
     )
}

export default ShowErrorMessages

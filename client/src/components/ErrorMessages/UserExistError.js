import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import "./styles.css"

const UserExistError = ({error, onCloseButton }) => {
  return (
    <Container fluid="md">
      <Row className="row-no-user">
        <Col >
           <p className='text'>{error}</p>
           <p>The user you're trying to access does not exist.
            in use. Click 'Signup' to re-enter email or 'Home' to quit.
           </p>
           <CloseButton arial-lable="close" onClick={onCloseButton}/>
        </Col>
      </Row>
    </Container>
     )
}

export default UserExistError

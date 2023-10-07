import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton';

import "./error_styles.css"

const UserExistError = ({error, onCloseButton }) => {
  return (
    <Container fluid="md">
      <Row className="row-no-user">
        <Col >
           <p className='text'>{error}</p>
           <p> Click "X" to try again or to return to Portal.
           </p>
           <CloseButton arial-lable="close" onClick={onCloseButton}/>
        </Col>
      </Row>
    </Container>
     )
}

export default UserExistError

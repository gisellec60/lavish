import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import CloseButton from 'react-bootstrap/CloseButton';
// import "./styles.css"

const UserNotAuthorized = ({error, onCloseButton}) => {
  return (
    <div>
       <Container fluid="md">
        <Row className="row-not-authorized">
            <Col >
            <p className='text'>{error}</p>
            <p>Only the someone with admin priviledges can access "All Dancers."
                Click "X" to return to Portal.
            </p>
            <CloseButton arial-lable="close" onClick={onCloseButton}/>
            </Col>
        </Row>
        </Container>
    </div>
  )
}

export default UserNotAuthorized

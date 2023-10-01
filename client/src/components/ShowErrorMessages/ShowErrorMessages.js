import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import "./styles.css"

const ShowErrorMessages = ({errors}) => {
  return (
    <Container fluid="md">
      <p>{errors}</p>
    </Container>
     )
}

export default ShowErrorMessages

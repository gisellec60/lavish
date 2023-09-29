import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import "./styles.css"

export const SignUpComplete = () => {

  return (
    <div>
      <Container fluid="md">
        <Row className = "rows1">
            <Col className = "cols1">
              <div>
                <h2 className = "h2"></h2>
              </div>  
            </Col>
        </Row>    
        <Row className = "rows2" >   
            <Col className = "cols2">
              <div>
                <h2 className = "h2">Go either home or inside </h2>
              </div>  
            </Col>
        </Row>
      </Container>
    </div>
  )
}



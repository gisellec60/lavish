import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import "./getParent.css"

function ShowParent({parent}) {
    return (
     <Container fluid="md" className="list-container">
       <Row>
          <Col md={2}>  </Col>
            <Col >
              <Card style={{ width: '50rem' }} bg='dark' border='warning' >
                <ListGroup variant="flush">
                  <ListGroup.Item >{parent['first']} {parent['last']}</ListGroup.Item>
                  <ListGroup.Item>E-mail: {parent['email']}</ListGroup.Item>
                  <ListGroup.Item>Phone: {parent['phone']}</ListGroup.Item>
                  <ListGroup.Item>Username : {parent['username']}</ListGroup.Item>
                  <ListGroup.Item>Address : {parent['address']}</ListGroup.Item>
                  <ListGroup.Item>Balance : {parent['balance']}</ListGroup.Item>
                </ListGroup>
              </Card>
          </Col>
           <Col md={2}></Col>
        </Row>  
     </Container>  
    );
  }
  
  export default ShowParent;
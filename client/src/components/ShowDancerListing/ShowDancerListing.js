import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import "./dancerlist.css"

function ShowDancerListing({dancer}) {
  return (
   <Container fluid="md" className="list-container">
     <Row>
        <Col md={2}>  </Col>
          <Col >
            <Card style={{ width: '50rem' }} bg='dark' border='warning' >
              <ListGroup variant="flush">
                <ListGroup.Item >{dancer['first']} {dancer['last']}</ListGroup.Item>
                <ListGroup.Item>E-mail: {dancer['email']}</ListGroup.Item>
                <ListGroup.Item>Phone: {dancer['phone']}</ListGroup.Item>
                <ListGroup.Item>Date of Birth : {dancer['dob']}</ListGroup.Item>
                <ListGroup.Item>Age : {dancer['age']}</ListGroup.Item>
                <ListGroup.Item>Gender : {dancer['gender']}</ListGroup.Item>
                <ListGroup.Item>Username : {dancer['username']}</ListGroup.Item>
                <ListGroup.Item >Bio: {dancer['bio']} </ListGroup.Item>
                <ListGroup.Item >Parent: {dancer['Parent']['first']} </ListGroup.Item>

              </ListGroup>
            </Card>
        </Col>
         <Col md={2}></Col>
      </Row>  
   </Container>  
  );
}

export default ShowDancerListing;
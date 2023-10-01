import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'

function ShowDancerListing({dancer}) {
  return (
   <Container fluid="md">
     <Row>
        <Card style={{ width: '50rem' }} bg='dark' border='warning'>
          <ListGroup variant="flush">
            <ListGroup.Item >{dancer['first']} {dancer['last']}</ListGroup.Item>
            <ListGroup.Item>E-mail: {dancer['email']}</ListGroup.Item>
            <ListGroup.Item>Phone: {dancer['phone']}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>  
      <Row>
        <Card style={{ width: '50rem' }} bg='dark' border='warning'>
          <ListGroup variant="flush">
            <ListGroup.Item >Bio: {dancer['bio']} </ListGroup.Item>
          </ListGroup>
         </Card> 
      </Row>
   </Container>  
  );
}

export default ShowDancerListing;
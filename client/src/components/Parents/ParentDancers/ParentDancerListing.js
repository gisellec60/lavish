import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./parentdancers.css"

function ShowDancerEventsListing({dancers}) {
   
  const eventlist =
    <Container fluid="md" className="list-container">
        {/* <h3 className="nameHeading">{dancer[Parent]['first']} {dancer[Parent]['last']}  </h3> */}
        <Table responsive striped boarded variant="dark" className="tablesize" >
          <thead >
              <tr className="table_style">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Username</th>
              </tr>
          </thead>
          <tbody>
          { 
            dancers.map((dancer) => {
                    return (
                        <tr className="table_style">
                            <th>{dancer.first} {dancer.last}</th>
                            <td>{dancer.email}</td>
                            <td>{dancer.phone}</td>
                            <td>{dancer.username}</td> 
                        </tr>
                    )
                 })}
          </tbody>
        </Table>
   </Container>  

  return eventlist
}

export default ShowDancerEventsListing;
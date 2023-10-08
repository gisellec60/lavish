import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./dancePracticeStyle.css"

function ShowDanceerPracticeListing({dancer, practices, empty}) {
  console.log("this is dancer and practices", dancer, practices)

  const practicelist =
    <Container fluid="md" className="list-container">
      {
        empty ? <h3 className="nameHeading">{dancer['first']} {dancer['last']} : No Practices Scheduled</h3>
        : <h3 className="nameHeading">{dancer['first']} {dancer['last']}</h3>
      }
        <Table responsive striped boarded hoover variant="dark">
          <thead >
              <tr >
                  <th>#</th>                    
                  <th>Date</th>
                  <th>practice Time</th>
                  <th>Arrival Time</th>
                  <th>Venue</th>
                  <th>Address</th>
              </tr>
          </thead>
          <tbody>
          {practices.map((practice) => {
                    return (
                        <tr key={practice.id}>
                          <th>{practice.id}</th>
                            <td>{practice.date}</td>
                            <td>{practice.practice_time}</td> 
                            <td>{practice.arrival_time}</td>
                            <td>{practice.venue}</td>
                            <td>{practice.address}</td>
                         </tr>
                    )
                 })}
          </tbody>
        </Table>
   </Container>  

  return practicelist
}

export default ShowDanceerPracticeListing;
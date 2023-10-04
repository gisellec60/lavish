import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./danceEventStyle.css"

function ShowDancerEventsListing({dancer, events}) {
  console.log("this is dancer and events", dancer, events)

  const eventlist =
    <Container fluid="md" className="list-container">
      <h3 className="nameHeading">{dancer['first']} {dancer['last']}</h3>
        <Table responsive striped boarded variant="dark">
          <thead >
              <tr >
                  <th>Date</th>
                  <th>event Time</th>
                  <th>Arrival Time</th>
                  <th>Venue</th>
                  <th>Address</th>
              </tr>
          </thead>
          <tbody>
          {events.map((event) => {
                    return (
                        <tr key={event.id}>
                            <td>{event.date}</td>
                            <td>{event.event_time}</td> 
                            <td>{event.arrival_time}</td>
                            <td>{event.venue}</td>
                            <td>{event.address}</td>
                         </tr>
                    )
                 })}
          </tbody>
        </Table>
   </Container>  

  return eventlist
}

export default ShowDancerEventsListing;
import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./events.css"

const AllEvents = () => {

  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

    useEffect(() => {
        fetch("/events")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((events) => {
                    setEvents(events)
                    console.log(events)
                })
            }else{
                res.json()
                .then((error) => {
                    console.log("Returned error", error); 
                    setError(error) 
                })  
            }        
        })
        }, []);
  
    const eventList = 
        <Container fluid='md' className="event-container">
/home/gisellec60/development/code/phase-5/lavish/client/src/components/Portal            <h3>Event Schedule</h3>
            <Table responsive striped boarded variant="dark">
                <thead >
                    <tr >
                        <th>Date</th>
                        <th>Event Time</th>
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

    return (
    <div>
      {eventList}
    </div>
  )
}

export default AllEvents

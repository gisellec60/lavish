import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const ListEventsToAdd = ({showDancerList, setShowDancerList, setEventObj}) => {

   const [event, setEvent] = useState([])

   useEffect(() => {
        fetch("/events")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((event) => {
                    setEvent(event)
                })
            }else{
                res.json()
                .then((error) => {
                    console.log("Returned error", error); 
                })  
            }        
        })
        }, []);
    
    const eventList = 
        <Container fluid='md' className="event-container">
            <h3>event Table - click event </h3>
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
                {event.map((event) => {
                    return (
                        <tr key={event.id} onClick={() => {setEventObj(event);setShowDancerList(!showDancerList)}}>
                            <td >{event.date}</td>
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

    return (<div>{eventList}</div>
  )
}

export default ListEventsToAdd
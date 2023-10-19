import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const ShowEvents = ({showDancers, setShowDancers, setEventObj }) => {

   const [events, setEvents] = useState([])
   const [error, setError] = useState(null)
     
    useEffect(() => {
        fetch("/events")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((events) => {
                    setEvents(events)
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
    
          
    const handleEditClick = (() => {
        setShowDancers(!showDancers)
    })

    const eventList = 
        <Container fluid='md' className="event-container">
            <h3 className="heading">Schedule of Events </h3>
            <h3 className="subheading"> Select an event to see a list of dancers attending</h3>
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
                        <tr key={event.id} onClick={() => {setEventObj(event); handleEditClick()}}>
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

    return (
     <>    
        <div>
        {eventList}
        </div>

    </>
  )
}

export default ShowEvents

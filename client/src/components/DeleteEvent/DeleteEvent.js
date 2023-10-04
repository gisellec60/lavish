import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./delevents.css"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const DeleteEvent = () => {

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
    
    const handleDeleteClick = ((id) => {
         fetch(`/events/delete/${id}`,{
            method:"DELETE"
         })
         .then (res => {
            if (res.ok) { 
                alert("Event was deleted succesfully")
                handleDeleteTask(id) 
            }else{
                res.json().then((error)=> {
                console.log("Error Returned",error);    
                setError(error)
                })
            }    
        })
    })    

    const handleDeleteTask = ((id) => {
        const upDatedEvents = events.filter((event) => event.id !== id )
        setEvents(upDatedEvents)
    })   

    const eventList = 
        <Container fluid='md' className="event-container">
            <h3>Click icon to remove event from schedule </h3>
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
                            <IconButton aria-label="delete" onClick={() => handleDeleteClick(event.id)} >
                              <DeleteIcon />
                            </IconButton>
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

export default DeleteEvent

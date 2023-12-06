import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized'

const DeletePractice = () => {

   const [practices, setEvents] = useState([])
   const [error, setError] = useState(null)

   const closeErrorButton = (() => {
       setError(null)
   })
  
    useEffect(() => {
        fetch("/practices")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((practices) => {
                    setEvents(practices)
                    console.log(practices)
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
         fetch(`/practices/delete/${id}`,{
            method:"DELETE"
         })
         .then (res => {
            if (res.ok) { 
                alert("Practice was deleted succesfully")
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
        const upDatedEvents = practices.filter((event) => event.id !== id )
        setEvents(upDatedEvents)
    })   

    const eventList = 
        <Container fluid='md' className="event-container">
            <h3>Click icon to remove practice from schedule</h3>
            <Table responsive striped boarded variant="dark">
                <thead >
                    <tr >
                        <th>Date</th>
                        <th>Event Time</th>
                        <th>Arrival Time</th>
                        <th>Venue</th>
                        <th>Address</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {practices.map((event) => {
                    return (
                        <tr key={event.id}>
                            <td>{event.date}</td>
                            <td>{event.event_time}</td> 
                            <td>{event.arrival_time}</td>
                            <td>{event.venue}</td>
                            <td>{event.address}</td>
                            <td>
                                <IconButton aria-label="delete" onClick={() => handleDeleteClick(event.id)} >
                                <DeleteIcon style= {{color:'goldenrod'}} />
                                </IconButton>
                            </td>    
                         </tr>
                    )
                 })}
                </tbody>
            </Table>
        </Container>

    return (
    <div>
      {eventList}
      {
            error ? <UserNotAuthorized error = {error} onCloseButton={closeErrorButton} />
            : null
      }
    </div>
  )
}

export default DeletePractice
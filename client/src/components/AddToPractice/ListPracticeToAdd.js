import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const ListPracticeToAdd = ({showDancerList, setShowDancerList, setPracticeObj}) => {

   const [practice, setPractice] = useState([])

   useEffect(() => {
        fetch("/practices")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((practice) => {
                    setPractice(practice)
                })
            }else{
                res.json()
                .then((error) => {
                    console.log("Returned error", error); 
                })  
            }        
        })
        }, []);
    
    const practiceList = 
        <Container fluid='md' className="event-container">
            <h3>Practice Table - click practice </h3>
            <Table responsive striped boarded variant="dark">
                <thead >
                    <tr >
                        <th>Date</th>
                        <th>Practice Time</th>
                        <th>Arrival Time</th>
                        <th>Venue</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                {practice.map((practice) => {
                    return (
                        <tr key={practice.id} onClick={() => {setPracticeObj(practice);setShowDancerList(!showDancerList)}}>
                            <td >{practice.date}</td>
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

    return (<div>{practiceList}</div>
  )
}

export default ListPracticeToAdd
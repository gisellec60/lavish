import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./practices.css"

const AllPractice = () => {

  const [practices, setPractices] = useState([])
  const [error, setError] = useState(null)

    useEffect(() => {
        fetch("/practices")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((practices) => {
                    setPractices(practices)
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
  
    const practiceList = 
        <Container fluid='md' className="practice-container">
            <h3>Practice Schedule</h3>
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
                {practices.map((practice) => {
                    return (
                        <tr key={practice.id}>
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

    return (
    <div>
      {practiceList}
    </div>
  )
}

export default AllPractice

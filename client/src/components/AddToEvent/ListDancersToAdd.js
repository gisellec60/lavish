import {React} from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';  
  
import "./addToEvent.css"

const ListDancersToAdd = ({onClose, event}) => {
  
  const [dancers, setDancers] = useState([])

  useEffect(() => {
    fetch("/dancers")
    .then(res => {
        if (res.ok) {
            res.json()
            .then((users) => {
                setDancers(users)
                console.log("this is is res: ", res)
            })
        }else{
            res.json()
            .then(() => {
                console.log("Returned error", res); 
                
            })  
        }        
    })
    }, []);

    const handleClick  = ((dancer) => {
        console.log("This is dancer: ", dancer)
        fetch(`/events/add/${dancer["id"]}/${event["id"]}`)
        .then(res => {
            if (res.ok) {
              if (res.status == 208){
                alert(`${dancer.first} ${dancer.last} is already scheduled for event at ${event.venue} on ${event.date}`)
              }else{
                alert(`${dancer.first} ${dancer.last} has been added to event schedule \n Location: ${event.venue} Date: ${event.date}`)    
              }
              // onClose()
            }else{
                res.json()
                .then(() => {
                    console.log("Returned error", res); 
                })
            }     
        })
   })  

   const dancerlist = 
     <Container fluid='md' className="container-size">
        <h4 className="heading">Dancer Roster</h4>
        <Button className="button" variant="contained" onClick={() => {onClose()}} >Finish</Button>
        <Table responsive striped bordered hover variant="dark" className="table-size">
            <thead >
              <tr className="width">
                <th className="id">#</th>
                <th className="name" >Name</th>
                <th className="email">Username</th>
              </tr>
            </thead>
            <tbody>
              {dancers.map((dancer) => {
                 return (
                    <tr key={dancer.id} onClick={() => handleClick(dancer)}>
                      <th scope="row">{dancer.id}</th>
                        <td >{dancer.first} {dancer.last}</td>
                        <td>{dancer.username}</td> 
                    </tr>
                )
              })}
            </tbody>
      </Table>
    </Container> 
        
  return( 
     <div>
       { dancerlist }    
   
     </div> 
)  
  
}

export default ListDancersToAdd


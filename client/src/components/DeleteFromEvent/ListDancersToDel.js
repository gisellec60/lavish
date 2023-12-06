import {React} from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';  
  
import "./delFromEvent.css"

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
        fetch(`/events/delete/${dancer["id"]}/${event["id"]}`, {
          method:"DELETE"
        })
        .then(res => {
            if (res.ok) {
                alert(`${dancer.first} ${dancer.last} has been deleted from ${event.venue} on ${event.date}`)
            }else{
                alert(`${dancer.first} ${dancer.last} is not scheduled for ${event.venue} on ${event.date}`)    
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


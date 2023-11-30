import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
// import "./dancerstyles.css"

const ListDancersToAdd = ({onClose, practice}) => {
  
  const [dancers, setDancers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/dancers")
    .then(res => {
        if (res.ok) {
            res.json()
            .then((users) => {
                setDancers(users)
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

    const handleClick  = ((dancer) => {
        console.log("this is dancer",dancer, practice)
        fetch(`/practices/add/${dancer["id"]}/${practice["id"]}`)
        .then(res => {
            if (res.ok) {
                alert(`${dancer.first} ${dancer.last} added to practice schedule at ${practice.venue} on ${practice.date}`)        
                onClose()
            }else{
                res.json()
                .then((errors) => {
                    console.log("Returned error", errors); 
                })
            }     
        })
   })  

   const dancerlist = 
     <Container fluid='md' className="container-size">
        <h4 className="heading">Dancer Roster</h4>
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


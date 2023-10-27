import {React} from 'react'
import UserNotAuthorized from '../../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./all-parents.css"

const AllParents = ({onCloseButton, isAdmin}) => {
  
  const [parents, setParents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/parents")
    .then(res => {
        if (res.ok) {
            res.json()
            .then((users) => {
                console.log(users)
                setParents(users)
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

   const parentList = 
     <Container fluid='md' className="container-size ">
      <h3 className="font-size">Parent Roster</h3>
       <Table responsive striped bordered hover variant="dark" className="table-size">
            <thead >
              <tr >
                <th >Name</th>
                <th>Email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => {
                 return (
                    <tr key={parent.id}>
                        <td className="name">{parent.first} {parent.last}</td>
                        <td className="email">{parent.email}</td> 
                        <td className="phone">{parent.phone}</td>
                  </tr>
                )
              })}
            </tbody>
      </Table>
    </Container> 
        
  return( 
     <div>
       { parentList }    
   
     {
        ! isAdmin ?
          <UserNotAuthorized error={error} onCloseButton={onCloseButton} />
          : null
     }
     </div> 
  )  
  
}
export default AllParents
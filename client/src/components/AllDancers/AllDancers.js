import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./dancerstyles.css"

const AllDancers = ({onCloseButton}) => {
  
  const [dancers, setDancers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/dancers")
    .then(res => {
        if (res.ok) {
            res.json()
            .then((users) => {
                console.log("line26:",users)
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

   const dancerlist = 
     <Container fluid='md' className="event-container">
      <h1>Dancer Roster</h1>
       <Table responsive striped boarded variant="dark" className="noWrap">
            <thead >
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Age</th>
                <th>DOB</th>
                <th>phone</th>
                <th>Parent</th>
              </tr>
            </thead>
            <tbody>
              {dancers.map((dancer) => {
                console.log('line 62',dancer)
                 return (
                    <tr key={dancer.id}>
                      <td>{dancer.first} {dancer.last}</td>
                      <td>{dancer.email}</td> 
                      <td>{dancer.gender}</td>
                      <td>{dancer.age}</td>
                      <td>{dancer.dob}</td>
                      <td>{dancer.phone}</td>
                      <td>{dancer['Parent']['first']} {dancer['Parent']['last']}</td>
                  </tr>
                )
              })}
            </tbody>
      </Table>
    </Container>
        
  return( 
     <div>
       { dancerlist }    
   
     {
        error ?
          <UserNotAuthorized error={error} onCloseButton={onCloseButton} />
          : null
     }
     </div> 
)  
  
}

export default AllDancers


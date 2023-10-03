import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const AllDancers = ({onCloseButton}) => {
  
  const [dancers, setDancers] = useState([])
  const [error, setError] = useState(null)

 
  // let dancerList
  // function that turns dancerList into list items with dancers
  // THEN
  // on successful useEffect, run that function
  
const fetchDancers = async() => {
    const response = await fetch("/dancers").then(r=>r.json())
    setDancers(response)
    console.log("Response", response)
    console.log("Dancer state", dancers)
}

  useEffect(() => {
    fetchDancers()
        // fetch("/dancers")
        // .then(res => {
        //     if (res.ok) {
        //         res.json()
        //         .then((users) => {
        //             setDancers(users)
        //             console.log(dancers)
        //         })
        //     }else{
        //         res.json()
        //         .then((error) => {
        //             console.log("Returned error", error); 
        //             setError(error) 
        //         })  
        //     }        
        // })
    }, []);

    const dancerList = dancers.map((item)=>(
        <li style={{color:"white"}} key={item.id}>{item.first}</li>
        
        ))

        console.log("Mah dancers", dancerList )
  return (
    <div>
    { 
      dancers ? 
        <Container fluid='md'>
            <div>
                <ul>   
                 {dancerList}
               </ul>

            </div>
            <Table responsive striped bordered className="noWrap">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Username</th>
                    <th>Bio</th>
                    </tr>
                </thead>
                <tbody>
                {dancers.map((dancer) => (
                    <tr key={dancer.id}>
                        <td>{dancer.first}</td>
                        <td>{dancer.last}</td> 
                        <td>{dancer.email}</td>
                        <td>{dancer.phone}</td>
                        <td>{dancer.dob}</td>
                        <td>{dancer.age}</td>
                        <td>{dancer.gender}</td>
                        <td>{dancer.username}</td>
                        <td>{dancer.bio}</td>
                    </tr>
                  ))}
                </tbody>
            </Table>
        </Container>
        : null
    } 

    {
        error ?
            <UserNotAuthorized error={error} onCloseButton={onCloseButton} />
            : null
    }

    </div> 
  )
  
}

export default AllDancers


import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';

const AllDancers = ({onCloseButton}) => {
  
  const [dancers, setDancers] = useState(null)
  const [error, setError] = useState(null)
 
  useEffect(() => {
        fetch("/dancers")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((users) => {
                    console.log("These are the users",users); 
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

  return (
    <div>
    { 
      dancers ? 
        <Container fluid='md'>
            <div>
                {dancers.map((item)=>(
                  <ul>   
                  <li style={{color:"white"}} key={item.id}>{item.first}</li>
                  </ul>

                ))}

            </div>
            {/* <Table responsive striped bordered className="noWrap">
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
            </Table> */}
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


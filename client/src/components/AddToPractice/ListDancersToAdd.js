import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
// import "./dancerstyles.css"

const ListDancersToAdd = ({onCloseButton, setDancerObj, setAddDancer, addDancer}) => {
  
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
                    <tr key={dancer.id} onClick={() => {setDancerObj(dancer); setAddDancer(!addDancer)}}>
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
   
     {
        error ?
          <UserNotAuthorized error={error} onCloseButton={onCloseButton} />
          : null
     }
     </div> 
)  
  
}

export default ListDancersToAdd


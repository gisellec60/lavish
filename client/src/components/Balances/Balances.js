import {React} from 'react'
// import UserNotAuthorized from '../../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import "./balances.css"

const Balances = () => {
  
  const [parents, setParents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("/balances")
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

    const  parentList = 
        <Container fluid='md' className="container-size ">
            <h3 className="font-size">Current Balances</h3>
            <Table responsive striped bordered hover variant="dark" className="table-size">
              <thead >
                <tr >
                  <th >Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => {
                    return (
                        <tr key={parent.id}>
                            <td className="name">{parent.first} {parent.last}</td>
                            <td className="email">{parent.email}</td> 
                            <td className="phone">{parent.phone}</td>
                            <td className="balance">${parent.balance}</td>
                    </tr>
                    )
                })}
              </tbody>
        </Table>
    </Container> 
        
    return( 
       <div>
          { parentList }    
       </div> 
    )  

}
export default Balances
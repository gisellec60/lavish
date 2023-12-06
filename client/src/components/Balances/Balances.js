import {React} from 'react'
// import UserNotAuthorized from '../../ErrorMessages/UserNotAuthorized';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import EmailIcon from '@mui/icons-material/Email';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import IconButton from '@mui/material/IconButton';
import "./balances.css"

const Balances = ({onClose}) => {
  
  const [parents, setParents] = useState([])
  const [error, setError] = useState(null)
  const [emailData, setEmailData] = useState({
    to: '',
    subject: 'Balance Information',
    body: '',
  });


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

    const handleSendEmail = ((parent) => {
        console.log("this is parent", parent)
        emailData.to = "gisellec60@gmail.com"
        emailData.body = `Dear ${parent.first} ${parent.last} \n
        \n Just a quick reminder you have a balance of $${parent.balance} on your account.`

        console.log("this is email", emailData)

        fetch('send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(emailData)
        })
        
        .then(res => {
            if (res.ok) {
              alert(`Email sent to ${parent.first} ${parent.last} successfully!`);
              onClose()
            } else {
              alert('Failed to send email. Check email is correct');
            }
        })    
      
    })   

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
                  <th>Send Email</th>
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
                            <td className="balance">
                            <IconButton aria-label="delete" onClick={() => {handleSendEmail(parent)}} >
                              <EmailIcon style={{ color: 'goldenrod' }}  />
                            </IconButton>
                            </td>
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
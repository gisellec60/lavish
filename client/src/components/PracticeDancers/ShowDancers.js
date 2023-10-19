import React from 'react'
import { useState, useEffect} from "react"
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import "./practicedancer.css"

const ShowDancers = ({practiceObj, empty, setEmpty}) => {

    const [dancerList, setDancerList] = useState([])

    const handleEmptyDancers = ((dancers) =>{
      if (dancers.length == 0)
          setEmpty(!empty)
    })

    useEffect(() => {
        fetch(`/practices/${practiceObj.id}?action=dancers`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then((dancers) => {
                console.log("these are dancers", dancers)   
                setDancerList(dancers)
                handleEmptyDancers(dancers)
                }) 
            }else{
                res.json().then((error)=> {
                console.log("Error Returned",error);    
                })      
            }
        })
    }, []);    

   const listDancers = 
    <Container fluid='md' className="container">
     {
       empty ? 
            <h3 className="dancerheading"> {practiceObj.venue} - {practiceObj.date} : No Dancers Scheduled</h3>
          : <h3 className="dancerheading">{practiceObj.venue} - {practiceObj.date}  </h3>
     }

      <Table responsive striped bordered hover variant="dark" className="table-size">
           <thead >
             <tr >
               <th >Name</th>
               <th>Email</th>
               <th>Phone</th>
             </tr>
           </thead>
           <tbody>
             {dancerList.map((dancer) => {
                return (
                   <tr key={dancer.id}>
                       <td >{dancer.first} {dancer.last}</td>
                       <td>{dancer.email}</td> 
                       <td>{dancer.phone}</td>
                 </tr>
               )
             })}
           </tbody>
     </Table>
   </Container> 
 
  return (
    <div>
      {listDancers}
    </div>
  )
}

export default ShowDancers

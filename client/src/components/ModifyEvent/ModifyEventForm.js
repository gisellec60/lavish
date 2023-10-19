import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ModifyEventForm = ({eventObj,setShowModifyEventForm,showModifyEventForm}) => {
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()
    // handle form state 
  console.log("this is event form" ,eventObj.date, eventObj['date'])

  const initialValues = {
    date: eventObj['date'],
    event_time:eventObj['event_time'],
    arrival_time: eventObj['arrival_time'],
    venue: eventObj["venue"],
    address:eventObj["address"]
    }

     
    const onSubmit = values => { 
        fetch(`/events/modify/${eventObj["id"]}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Event Modified succesful")
               setShowModifyEventForm(!showModifyEventForm)
            }else{
                res.json()
                .then((errors) => {
                    console.log("Returned error", errors); 
                    setErrors(errors) 
                })
            }     
        })
    }    
      
    return (
     <Container >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                            <label className="labelfonts" style={{color: "goldenrod"}}>Edit Information</label>    
                            <label htmlFor ='first' style={{color: "white"}}>Date</label>
                            <Field type = 'text' id='date' name='date' />
                            <ErrorMessage name = 'date' />

                            <label htmlFor ='event_time' style={{color: "white"}}>Event Time</label>
                            <Field type = 'text' id='event_time' name='event_time' />
                            <ErrorMessage name = 'event_time' />

                            <label htmlFor ='arrival_time' style={{color: "white"}}>Arrival Time</label>
                            <Field type = 'arrival_time' id='arrival_time' name='arrival_time' />
                            <ErrorMessage name = 'arrival_time'/>

                            <label htmlFor ='venue' style={{color: "white"}}>Venue</label>
                            <Field type = 'text' id='venue' name='venue'/>
                            <ErrorMessage name = 'venue' />
  
                             <label htmlFor ='address' style={{color: "white"}}>address</label>
                            <Field type = 'text' id='address' name='address'/>
                            <ErrorMessage name = 'address' />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>  
  )
}

export default ModifyEventForm

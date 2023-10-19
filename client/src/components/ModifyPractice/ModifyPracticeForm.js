import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized'

const ModifyPracticeForm= ({onClose, practiceObj,setShowModifyPracticeForm, showModifyPracticeForm}) => {
   
    const [errors, setErrors] = useState(null)

    console.log("this is error", errors)

    const closeErrorButton = (() => {
        setErrors(null)
        onClose()
    })

    // handle form state 
  console.log("this is practice form" ,errors)

  const initialValues = {
    date: practiceObj['date'],
    practice_time:practiceObj['practice_time'],
    arrival_time: practiceObj['arrival_time'],
    venue: practiceObj["venue"],
    address:practiceObj["address"]
    }

     
    const onSubmit = values => { 
        fetch(`/practices/modify/${practiceObj["id"]}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Practice Modified succesful")
               setShowModifyPracticeForm(!showModifyPracticeForm)
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
    <div>   
     <Container >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                            <label className="labelfonts" style={{color: "goldenrod"}}>Edit Practice Information</label>    
                            <label htmlFor ='first' style={{color: "white"}}>Date</label>
                            <Field type = 'text' id='date' name='date' />
                            <ErrorMessage name = 'date' />

                            <label htmlFor ='practice_time' style={{color: "white"}}>Practice Time</label>
                            <Field type = 'text' id='practice_time' name='practice_time' />
                            <ErrorMessage name = 'practice_time' />

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
        {
            errors ? <UserNotAuthorized errors = {errors} onCloseButton={closeErrorButton} />
           : null
        }
      </div>
  )
}

export default ModifyPracticeForm

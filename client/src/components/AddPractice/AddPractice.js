import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {TextError} from "../TextError"
import {useNavigate } from "react-router-dom"
import ShowErrorMessages from '../ShowErrorMessages/ShowErrorMessages';
import { useState} from "react";

// handle form state 
const initialValues = {
    date: "2023-10-12",
    practice_time :"6-8pm"  ,
    arrival_time: "5:30pm" ,
    venue : "SoundView Center",
    address :"2312 Walbash Rd Durham, NC 27607"
}

// Validation using Yup library 
const validationSchema = Yup.object({
 
    date: Yup.date().required("Date is required YYY-MM-DD"),
    practice_time: Yup.string().required('range: 9am-5pm'),
    arrival_time: Yup.string().required("Arrival time required: 8am"),
    venue: Yup.string().required("Venue is required"),
    address: Yup.string().required("Address required"),
    })

const AddPractice = () => {

    const [error, setError] = useState(null)
    const [addPractice, setAddPractice] = update(null)

    const navigate = useNavigate()

    const closeErrorButton = ((error) => {
        setError(null)
    })

    // handle form submission onSubmit and formik.handleSubmit 
    const onSubmit = values => {  
        fetch("/practices/add", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Event Added succesfully")
               res.json().then((newPractice) => {
                  console.log(newPractice);
                  setAddPractice(newPractice)
                })
     
            }else{
                res.json().then((error)=> {
                    console.log("Error Returned",error);    
                    setError(error)
                    })
                }        
    
        })
    } 

    return (
    <div>
         <Container fluid='md' className="location">
            <Row>
                <Col></Col> 
                <Col xs={12} md={4}>     
                   <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        {
                          addPractice ?
                            <Form>
                                
                                <label htmlFor ='date' style={{color: "white"}}>Date</label>
                                <Field type = 'text' id='date' name='date'/>
                                <ErrorMessage name = 'date' component={TextError} />

                                <label htmlFor ='practice_time' style={{color: "white"}}>Event Time</label>
                                <Field type = 'text' id='practice_time' name='practice_time'/>
                                <ErrorMessage name = 'practice_time'  component={TextError}/>

                                <label htmlFor ='arrival_time' style={{color: "white"}}>Arrival Time</label>
                                <Field type = 'text' id='arrival_time' name='arrival_time'/>
                                <ErrorMessage name = 'arrival_time'  component={TextError}/>

                                <label htmlFor ='venu' style={{color: "white"}}>Venue</label>
                                <Field type = 'text' id='venue' name='venue'/>
                                <ErrorMessage name = 'venue'  component={TextError}/>

                                <label htmlFor ='address'  style={{color: "white"}}>Address</label>
                                <Field as = 'textarea' id='address' name='address' />
                                <ErrorMessage name = 'bio'  component={TextError}/>

                                <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                               
                            </Form>
                        : null
                        }                           
                    </Formik>
                </Col>
              <Col></Col>
            </Row>
        </Container>  
        <div>   
        {
            error ? <ShowErrorMessages error = {error} onCloseButton={closeErrorButton}/>
            : null
        }
        </div> 
   
    </div>
  )
}

export default AddPractice

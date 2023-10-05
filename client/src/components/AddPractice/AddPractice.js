import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import * as Yup  from 'yup'
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Stack from '@mui/material/Stack';
import {TextError} from "../TextError"
import {useNavigate } from "react-router-dom"
import ShowErrorMessages from '../ShowErrorMessages/ShowErrorMessages';
import { useState} from "react";

// handle form state 
const initialValues = {
    date: "",
    practice_time :""  ,
    arrival_time: "" ,
    venue : "",
    address :""
}

// Validation using Yup library 
const validationSchema = Yup.object({
 
    date: Yup.date().required("Date is required YYY-MM-DD"),
    practice_time: Yup.string().required('format: 09:00-17:00'),
    arrival_time: Yup.string().required("Arrival time required: 8am"),
    venue: Yup.string().required("Venue is required"),
    address: Yup.string().required("Address required"),
    })

const AddPractice = () => {

    const [error, setError] = useState(null)
    const [addPractice, setAddPractice] = useState("True")

    const navigate = useNavigate()

    const closeErrorButton = ((error) => {
        setError(null)
    })

    // handle form submission onSubmit and formik.handleSubmit 
    const onSubmit = (values,onSubmitProps) => {  
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
                  onSubmitProps.setSubmitting(false)
                  onSubmitProps.resetForm()
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
                <Col xs={12} sm={8} md={4}>    
                <h1 style={{color:"goldenrod"}}>Add Practice Form</h1> 
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

                                <label htmlFor ='practice_time' style={{color: "white"}}>Practice Time</label>
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
                                
                                <Stack spacing={2} direction="row">    
                                   <Button variant="contained" type="submit">Submit</Button>
                                   <Button variant="contained" onClick={() => {setAddPractice(null);navigate("/portal")}} >Finish</Button>
                                </Stack>
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

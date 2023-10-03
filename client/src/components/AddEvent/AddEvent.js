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

// handle form state 
const initialValues = {
    date: "2024-02-07",
    event_time :"9am-5pm"  ,
    arrival_time: "8am" ,
    venue : "Dorton Arena",
    address :" 4285 Trinity Rd, Raleigh, NC 27607"
}

// Validation using Yup library 
const validationSchema = Yup.object({
 
    date: Yup.date().required("Date is required YYY-MM-DD"),
    event_time: Yup.string().required('range: 9am-5pm'),
    arrival_time: Yup.string().required("Arrival time required: 8am"),
    venue: Yup.string().required("Venue is required"),
    address: Yup.string().required("Address required"),
    })

const AddEvent = () => {

    return (
    <div>
         <Container>
            <Row>
                <Col></Col> 
                <Col xs={12} md={8}>     
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        <Form>

                            <label htmlFor ='date' style={{color: "white"}}>Date</label>
                            <Field type = 'text' id='date' name='date'/>
                            <ErrorMessage name = 'date' component={TextError} />

                            <label htmlFor ='event_time' style={{color: "white"}}>Event Time</label>
                            <Field type = 'text' id='event_time' name='event_time'/>
                            <ErrorMessage name = 'event_time'  component={TextError}/>

                            <label htmlFor ='arrival_time' style={{color: "white"}}>Arrival Time</label>
                            <Field type = 'text' id='arrival_time' name='arrival_time'/>
                            <ErrorMessage name = 'arrival_time'  component={TextError}/>

                            <label htmlFor ='venu' style={{color: "white"}}>Venu</label>
                            <Field type = 'text' id='venue' name='venue'/>
                            <ErrorMessage name = 'venue'  component={TextError}/>

                             <label htmlFor ='address'  style={{color: "white"}}>Addre4ss</label>
                            <Field as = 'textarea' id='address' name='address' />
                            <ErrorMessage name = 'bio'  component={TextError}/>
                            <label htmlFor ='address' style={{color: "white"}}>Address</label>


                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </Container>     
    </div>
  )
}

export default AddEvent

import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./modifyParent.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ModifyForm = ({parent}) => {
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    // handle form state 
  
  const initialValues = {
    first: parent['first'],
    last: parent['last'],
    email: parent['email'],
    phone: parent['phone'],
    address: parent['address'],
    password: parent['password']
    }

    const onSubmit = values => { 
        fetch(`/parents/modify/${parent["id"]}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("parent Modified succesful")
            }else
                console.log("Error returned", res)
                return res   
         })
        .then(res => res.json())
        .then((newData) => {
            console.log(newData);
            navigate("/portal")
        })
    } 
  return (
     <Container className = "container">
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <h4 className="labelfonts" style={{color: "goldenrod"}}>Edit Information</h4>    
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form className="form-location">
                            <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                            <Field type = 'text' id='first' name='first' />
                            <ErrorMessage name = 'first' />

                            <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                            <Field type = 'text' id='last' name='last' />
                            <ErrorMessage name = 'last' />

                            <label htmlFor ='email' style={{color: "white"}}>Email</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email'/>

                            <label htmlFor ='phone' style={{color: "white"}}>Phone</label>
                            <Field type = 'text' id='phone' name='phone'/>
                            <ErrorMessage name = 'phone' />
  
                            <label htmlFor ='image' style={{color: "white"}}>Address</label>
                            <Field type = 'text' id='address' name='address'/>
                            <ErrorMessage name = 'adress' />

                            <label htmlFor ='password' style={{color: "white"}}>Password</label>
                            <Field type = 'password' id='password' name='password'  />
                            <ErrorMessage name = 'password'/>

                            <Button className = "loc" variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>  
  )
}

export default ModifyForm

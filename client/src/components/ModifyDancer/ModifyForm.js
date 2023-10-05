import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ModifyForm = ({dancer}) => {
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    // handle form state 
  
  const initialValues = {
    first: dancer['first'],
    last: dancer['last'],
    email: dancer['email'],
    phone: dancer['phone'],
    image: dancer['image'],
    bio: dancer['bio'],

    password: dancer['password']
    }

    const onSubmit = values => { 
        fetch(`/dancers/modify/${dancer["id"]}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Dancer Modified succesful")
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
     <Container >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                        <label className="labelfonts" style={{color: "goldenrod"}}>Edit Information</label>    
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
  
                             <label htmlFor ='image' style={{color: "white"}}>Image</label>
                            <Field type = 'text' id='image' name='image'/>
                            <ErrorMessage name = 'image' />

                            <label htmlFor ='bio' className="bio" style={{color: "white"}}>Bio</label>
                            <Field as = 'textarea' id='bio' name='bio' />
                            <ErrorMessage name = 'bio' />

                            <label htmlFor ='password' style={{color: "white"}}>Password</label>
                            <Field type = 'password' id='password' name='password' />
                            <ErrorMessage name = 'password'/>

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>  
  )
}

export default ModifyForm

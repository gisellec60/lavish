import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import LoginError from '../ErrorMessages/LoginError'
import { useState } from "react"
import * as Yup  from 'yup'
import {TextError} from "../TextError"

const initialValues = {
    email: 'giselle@gmail.com',
    password: 'giselle@gmail.compassword'
}

const validationSchema = Yup.object( {
    email:Yup.string().email('invaled email format').required('E-mail is Required'),
    password: Yup.string().required("Must enter a password")
})

export const Login = ({onLogin,handleIsAdmin,handleIsParent }) => {

    const [error, setError] = useState(null)

    const closeErrorButton = ((error) => {
        setError(null)
    })   
    
    const navigate = useNavigate()

    const onSubmit = values => {  
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Login successful")
               res.json().then((user) => {
                  console.log("ths is user",user)
                  handleIsAdmin(user)
                  handleIsParent(user)
                  onLogin(user)
               })
               navigate("/portal")
            }else { 
               res.json().then((error) => { 
                  console.log("Error returned", error)
                  setError(error)
                })
            }   
        })
    } 

  return (
    <div>
        <Container className="location" >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        <Form>
                            <h1 className="heading">Login</h1> 
                            <label htmlFor ='email' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email' component={TextError} />

                            <label htmlFor ='password' style={{color: "white"}}>Password</label>
                            <Field type = 'password' id='password' name='password' />
                            <ErrorMessage name = 'password' component={TextError}/>

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>        
        {
            error ? <LoginError error = {error} onCloseButton={closeErrorButton} />
            : null
        }
    </div>
  )
}




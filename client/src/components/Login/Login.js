import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "./styles.css"

const initialValues = {
    username: 'chanee@gmail.com',
    password: 'mypasswordisher'
}

export const Login = ({onLogin}) => {
    
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
               res.json().then((user) => onLogin(user))
               navigate("/portal")
            }else { 
               console.log("Error returned", res)
               navigate("/login")  
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
                            <h2 className="heading">Login</h2>  
                              
                            <label htmlFor ='username' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'username' id='username' name='username' />
                            <ErrorMessage name = 'username' />

                            <label htmlFor ='password' style={{color: "white"}}>Password</label>
                            <Field type = 'password' id='password' name='password' />
                            <ErrorMessage name = 'password' />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>        

    </div>
  )
}




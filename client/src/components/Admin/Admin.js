import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import "./adminstyles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import {TextError} from "../TextError"
import ShowErrorMessages from '../ShowErrorMessages/ShowErrorMessages';
import { useState} from "react";
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: 'Giselle Smith',
    email: 'giselle@gmail.com',
    password: "thisismypassword"
}

const passwordValue = {
    password: "adminpassword"
}

// Validation for admin signup 
const validationSchema = Yup.object({
    name: Yup.string().required('First Name is Required'),
    email:Yup.string().email('invaled email format').required('E-mail is Required'),
    password: Yup.string().required("Must enter a password"),
})

// Validation for admin signup 
const passwordSchema = Yup.object({
    password: Yup.string().required("Must enter a password"),
})

export const Admin = ({onSignUp}) => {

    const [error, setError] = useState(null)
    const [password, setPassword] = useState(null)
    
    const navigate = useNavigate

    const closeErrorButton = ((error) => {
        setError(null)
    })

    // handle form submission for admin signup 
    const onSubmit = values => {  
           
        fetch("/admin",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
            
        })
        .then((res) => {
            if (res.ok) {
               alert("Admin succesful")
               res.json()
               .then((admin) => {
                  console.log(admin)
                  onSignUp(admin)})
            }else{
                res.json().then((error)=> {
                console.log("Error Returned",error);    
                setError(error)
                })
            }  
        })
    }          
    
    //check password
    const checkPassword = values => {  
        fetch("/check_admin_password",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
            
        })
        .then((res) => {
            if (res.ok) {
               alert("Password succesful")
               res.json()
               .then((admin) => {
                console.log(admin);
                setPassword("yes")
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
      <>
      <Container className="location-admin">
            <Row>
                <Col></Col> 
                <Col xs={12} md={8}>   
                   {
                        password  ?
                            <Formik 
                                initialValues = {initialValues}
                                validationSchema = {validationSchema}
                                onSubmit = {onSubmit} >
                                    <Form>
                                        <h2 className="heading">Admin Page</h2>
                                        <label className="labelfonts" style={{color: "goldenrod"}}>Admin Information</label>    
                                        <label htmlFor ='name' style={{color: "white"}}>Full Name</label>
                                        <Field type = 'text' id='name' name='name' />
                                        <ErrorMessage name = 'name' component={TextError}/>

                                        <label htmlFor ='email' style={{color: "white"}}>Email</label>
                                        <Field type = 'email' id='email' name='email' />
                                        <ErrorMessage name = 'email'component={TextError}/>

                                        <label htmlFor ='password' style={{color: "white"}}> Password</label>
                                        <Field type = 'password' id='password' name='password' />
                                        <ErrorMessage name = 'password' component={TextError}/>

                                        <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                                    </Form>
                                </Formik>  
                                    :
                                <Formik    
                                    initialValues = {passwordValue}
                                    validationSchema = {passwordSchema}
                                    onSubmit = {checkPassword} >   
                                    <Form>
                                        <label htmlFor ='password' style={{color: "white"}} className="location-admin"> Password</label>
                                        <Field type = 'password' id='password' name='password' />
                                        <ErrorMessage name = 'password' component={TextError}/>
                                            
                                        <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                                    </Form>
                                </Formik>
                    }    
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
     </>  
   )
}
// const initialValues = {
//     name: '',
//     email: '',
//     password: "thisismypassworddontyoucopyit"
// }
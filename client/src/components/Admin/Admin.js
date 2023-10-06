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

const adminValue = {
    name: '',
    email: '',
    password: "",
    picked: '',
}

const passwordValue = {
    password: ""
}

const validationSchema = Yup.object({
    name: Yup.string().required('First Name is Required'),
    email:Yup.string().email('invaled email format').required('E-mail is Required'),
    password: Yup.string().required("Must enter a password"),
    picked: Yup.string().required("Select One")
})

const passwordSchema = Yup.object({
    password: Yup.string().required("Must enter a password"),
})

export const Admin = ({onSignUp}) => {

    const [error, setError] = useState(null)
    const [password, setPassword] = useState(null)
    
    const closeErrorButton = (() => {
        setError(null)
    })

    const addAdmin = values => {  
        console.log("form data",values)   
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
                                initialValues = {adminValue}
                                validationSchema = {validationSchema}
                                onSubmit = {addAdmin} >
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
                                        
                                        <div role="group" className="my-radio-group">
                                            <h3 style={{color: 'white'}} className="border-parent"> Parent? </h3>

                                            <label htmlFor ='true' style={{color: "white"}} className="true"> True 
                                            <Field type = 'radio' id='true' name='picked' value="true" />
                                            </label>

                                            <label htmlFor ='false' style={{color: "white"}} className="false"> False 
                                            <Field type = 'radio' id='false' name='picked' value="false" />
                                            </label>

                                            <ErrorMessage name = 'isparent' component={TextError}/>
                                        </div>        
                                        <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                                    </Form>
                                </Formik>  
                                    :
                                <Formik    
                                    initialValues = {passwordValue}
                                    validationSchema = {passwordSchema}
                                    onSubmit = {checkPassword} >   
                                    <Form>
                                        <h3 style={{color: "white"}}>Admin Password</h3>
                                        <label htmlFor ='password' className="location-admin"> </label>
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

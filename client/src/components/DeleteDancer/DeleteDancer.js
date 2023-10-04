import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "./styles.css"
import { useState } from "react"
import UserExistError from '../ErrorMessages/UserExistError'

const initialValues = {
    first: 'Deja',
    last: 'Thompson',
    username: 'de4ja@gmail.com'
}

export const DeleteDancer = () => {

    const [error, setError] = useState(null)

    const closeErrorButton = ((error) => {
        setError(null)
    })

    const navigate = useNavigate()

    const onSubmit = values => {  
        fetch(`/dancers/delete/${values["username"]}`,{
            method: "Delete"
        })
        .then(res => {
            if (res.ok){ 
                alert("Dancer was deleted succesfully")
                navigate("/portal")  
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
        <Container className="location" >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                            <h2 className="heading">Delete Dancer</h2>     
                            <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                            <Field type = 'text' id='first' name='first' />
                            <ErrorMessage name = 'first' />

                            <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                            <Field type = 'text' id='last' name='last' />
                            <ErrorMessage name = 'last' />

                            <label htmlFor ='username' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='username' name='username' />
                            <ErrorMessage name = 'username' />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container> 
        <div> 
        {
            error ? <UserExistError error = {error} onCloseButton={closeErrorButton} />
            : null
        }
    </div>
    </>       
    )
}



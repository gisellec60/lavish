import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";

const initialValues = {
    first: 'Deja',
    last: 'Thompson',
    email: 'deja@gmail.com'
}

export const DeleteDancer = () => {

    const navigate = useNavigate()

    const onSubmit = values => {  
        console.log('Form data', values)   
        fetch("/dancers/delete/id",{
            method: "Delete"
        })
        .then(res => {
            if (res.ok) 
            alert("Dancer was deleted succesfully")
            else
            console.log("Error returned", res)
            return res   
        })
        navigate("/portal")    
    } 
  
    return (
        <Container >
           <Row>
               <Col xs={12} md={8}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                            <label className="labelfonts" style={{color: "goldenrod"}}>Dancer Information</label>    
                            <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                            <Field type = 'text' id='first' name='first' />
                            <ErrorMessage name = 'first' />

                            <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                            <Field type = 'text' id='last' name='last' />
                            <ErrorMessage name = 'last' />

                            <label htmlFor ='email' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email' />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>        
    )
}



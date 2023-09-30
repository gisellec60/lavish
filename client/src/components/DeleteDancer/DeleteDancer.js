import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "./styles.css"

const initialValues = {
    first: 'Deja',
    last: 'Thompson',
    username: 'de4ja@gmail.com'
}

export const DeleteDancer = () => {

    const navigate = useNavigate()

    const onSubmit = values => {  
        fetch(`/dancers/delete/${values["username"]}`,{
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
                            <Field type = 'username' id='username' name='username' />
                            <ErrorMessage name = 'username' />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
                    </Formik>
                </Col>  
            </Row>  
        </Container>        
    )
}



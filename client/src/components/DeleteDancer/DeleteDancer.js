import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import UserExistError from '../ErrorMessages/UserExistError'

const initialValues = {
    email: ''
}

export const DeleteDancer = ({setUser}) => {

    const [error, setError] = useState(null)

    const closeErrorButton = (() => {
        setError(null)
    })

    const navigate = useNavigate()

    const onSubmit = values => {  
        fetch(`/dancers/delete/${values["email"]}`,{
            method: "Delete"
        })
        .then(res => {
            if (res.ok){ 
                alert("Dancer was deleted succesfully")
                res.json().then((res)=> {
                    console.log("Response", res)  
                    if (res != null){
                        setUser(null)
                        navigate("/")  
                    }    
                })     
            }else{
                res.json().then((error)=> {
                    console.log("Error Returned",error)    
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

                            <label htmlFor ='email' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email' />

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



import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./getParent.css"
import * as Yup  from 'yup'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import UserExistError from '../../ErrorMessages/UserExistError'

   // handle form state 
   const initialValues = {
    email: ''
    }

    // Validation using Yup library 
    const validationSchema = Yup.object({
        email:Yup.string().email('invaled email format').required('E-mail is Required')
    })
    

const GetParent = ({setParent,showParent,setShowParent}) => {

    const [error, setError] = useState(null)
    
    const closeErrorButton = ((error) => {
        setError(null)
    })

     const handleListing = (() => {
        setShowParent(!showParent)
     })

    const onSubmit = values => { 
        fetch(`/parent/${values["email"]}?action=none`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then((parent) => {
                  setParent(parent)
                  console.log("this parent", parent) 
                  handleListing()
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
     <Container>
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>    
                    <h2 className="heading">Show Parent</h2>  
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
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

export default GetParent

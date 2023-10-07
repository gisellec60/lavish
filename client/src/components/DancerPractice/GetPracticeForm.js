import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import UserExistError from '../ErrorMessages/UserExistError'

   const initialValues = {
    email: ''
    }

    const validationSchema = Yup.object({
        email:Yup.string().email('invaled email format').required('E-mail is Required')
    })
    

const GetPracticeForm = ({setDancer,setPractices, showDancerListing,setShowDancerListing}) => {

    const [error, setError] = useState(null)
    
    const closeErrorButton = (() => {
        setError(null)
    })

    const handleGetDancer = ((email) => {
        fetch(`/dancers/${email}?action=none`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then((dancer) => {
                  console.log("this dancer", dancer)   
                  setDancer(dancer)
                }) 
            }else{
                res.json().then((error)=> {
                  console.log("Error Returned",error);    
                  setError(error)
                })      
            }
        })
        setShowDancerListing(!showDancerListing)
     })

    const onSubmit = values => { 
        const email = values["email"]
        fetch(`/dancers/${values["email"]}?action=practices`)
        .then(res => {
            if (res.ok) {
                res.json()
                .then((practices) => {
                  console.log("this practices", practices)   
                  setPractices(practices)
                  handleGetDancer(email)
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
     <Container className="location">
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        <Form>
                        <h2 className="heading">Dancer</h2>  
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

export default GetPracticeForm
import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import UserExistError from '../ErrorMessages/UserExistError'

   // handle form state 
   const initialValues = {
    first: 'Becky',
    last: 'Roach',
    username: 'ylambert@hotmail.com',
   }  

const ModifyDancer = ({onModifyDancer}) => {

    const [error, setError] = useState(null)

    const closeErrorButton = ((error) => {
        setError(null)
    })

    const onSubmit = values => { 
        fetch(`/dancers/${values["email"]}?action=none`)
        .then(res => {
            if (res.ok){ 
                res.json()
                .then((dancer) => (
                   onModifyDancer(dancer)
                )) 
            }else{
                res.json().then((error)=> {
                    console.log("Error Returned",error);    
                    // onError(error) 
                    setError(error)
                })
            }
        }) 
    }

    return (
      <>  
        <Container >
           <Row>
               <Col className="placement" md={{ span: 6, offset: 3 }}>     
                    <Formik 
                        initialValues = {initialValues}
                        onSubmit = {onSubmit} >
                        <Form>
                            <h2 className="heading">Modify Dancer</h2>     
                            <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                            <Field type = 'text' id='first' name='first' />
                            <ErrorMessage name = 'first' />

                            <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                            <Field type = 'text' id='last' name='last' />
                            <ErrorMessage name = 'last' />

                            <label htmlFor ='username' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='username' name='username' />
                            <ErrorMessage name = 'username' />
                            
                            <Button variant="primary" size="lg" type="submit"> Submit</Button>
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

export default ModifyDancer

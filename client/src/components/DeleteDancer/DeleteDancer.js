import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import UserExistError from '../ErrorMessages/UserExistError'
import * as Yup  from 'yup'
import {TextError} from "../TextError"

const initialValues = {
    email: ''
}

const validationSchema = Yup.object( {
    email:Yup.string().email('invaled email format').required('E-mail is Required'),
})


export const DeleteDancer = ({setUser, setIsParent, setIsAdmin}) => {

    const [error, setError] = useState(null)

    const closeErrorButton = (() => {
        setError(null)
    })

    const handleIsParent = (() =>{
        setIsParent(null)
    })
 
    const handleIsAdmin = (() =>{
         setIsAdmin(null)
   })
 

    const navigate = useNavigate()

    const onSubmit = values => {  
        fetch(`/dancers/delete/${values["email"]}`,{
            method: "Delete"
        })
        .then(res => {
            if (res.ok){ 
                res.text().then((msg)=> {
                    alert("Dancer was deleted succesfully")
                    console.log("what is msg:", msg)
                    if (msg){
                        console.log("do you get here?",msg)
                        handleIsAdmin()
                        handleIsParent()
                        setUser(null)
                    }    
                    navigate("/")  
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
                        validationSchema={validationSchema}
                        onSubmit = {onSubmit} >
                        <Form>
                        <h2 className="heading">Delete Dancer</h2>  
                            <label htmlFor ='email' style={{color: "white"}}>Username or E-mail</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email' component={TextError} />

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



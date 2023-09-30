import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import "./styles.css"
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ShowModifyDancer = () => {
    
   const onSubmit = values => { 
        fetch(`/dancers/delete/${values["username"]}`)
            .then(res => {
                if (res.ok) {
                    res.json().then((user) => {console.log(user); return (user)})
                }else{
                    console.log("Error returned", res)
                    return res 
                }      
            })
    }
    
    // handle form state 
    const initialValues = {
        first: '',
        last: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        dob: '',
        bio: '',
        image: '',
        password: '',
    }

    // Validation using Yup library 
    const validationSchema = Yup.object({
    first: Yup.string().required('First Name is Required'),
    last: Yup.string().required('Last Name is Required'),
    email:Yup.string().email('invaled email format').required('E-mail is Required'),
    phone: Yup.string().required('Phone number is Required'),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth required YYY-MM-DD"),
    bio: Yup.string().min(50,"Must be at least 50 chars long").required('Must enter a bio of 50 chars or more.'),
    age: Yup.number().min(10,"must be at least 10yrs" ).max(20,"Age must be less than 21yrs").integer().positive().required("Enter Age"),
    image: Yup.string().url().nullable(),
    password: Yup.string().required("Must enter a password"),
    })

  return (
    <Container>
    <Row>
        <Col></Col> 
        <Col xs={12} md={8}>     
            <Formik 
                initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit} >
                <Form>
                    <label className="labelfonts" style={{color: "goldenrod"}}>Dancer Information</label>    
                    <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                    <Field type = 'text' id='first' name='first' />
                    <ErrorMessage name = 'first' />

                    <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                    <Field type = 'text' id='last' name='last' />
                    <ErrorMessage name = 'last' />

                    <label htmlFor ='email' style={{color: "white"}}>Email</label>
                    <Field type = 'email' id='email' name='email' />
                    <ErrorMessage name = 'email'/>

                    <label htmlFor ='phone' style={{color: "white"}}>Phone</label>
                    <Field type = 'text' id='phone' name='phone'/>
                    <ErrorMessage name = 'phone' />

                    <label htmlFor ='gender' style={{color: "white"}}>Gender</label>
                    <Field type = 'text' id='gender' name='gender'/>
                    <ErrorMessage name = 'gender' />

                    <label htmlFor ='dob' style={{color: "white"}}>Date of Birth</label>
                    <Field type = 'text' id='dob' name='dob'/>
                    <ErrorMessage name = 'dob' />

                    <label htmlFor ='age' style={{color: "white"}}>Age</label>
                    <Field type = 'text' id='age' name='age'/>
                    <ErrorMessage name = 'age' />

                    <label htmlFor ='image' style={{color: "white"}}>Image</label>
                    <Field type = 'text' id='image' name='image'/>
                    <ErrorMessage name = 'image' />

                    <label htmlFor ='bio' className="bio" style={{color: "white"}}>Bio</label>
                    <Field as = 'textarea' id='bio' name='bio' />
                    <ErrorMessage name = 'bio' />
                    {' '}
                    <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                </Form>
            </Formik>
        </Col>
        <Col></Col>     
</Row>
</Container>

)
  
}

export default ShowModifyDancer

import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import "./styles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import {TextError} from "../TextError"
import {useNavigate } from "react-router-dom"
import ShowErrorMessages from '../ShowErrorMessages/ShowErrorMessages';
import { useState} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//  const initialValues = {
//     first: '',
//     last: '',
//     email: '',
//     phone: '',
//     gender: '',
//     dob: '',
//     age: '',
//     dob: '',
//     image: '',
//     bio: '',
//     password: '',
//     pemail:''
// }

const initialValues = {
    first: 'Deja',
    last: 'Thompson',
    email: 'deja@gmail.com',
    phone: '919-270-2142',
    gender: 'female',
    dob: '2023-01-01',
    age: '17',
    dob: '2023-01-01',
    image: '',
    bio: 'I love dancing. I have been dance since I was 8. So glad to be a part of this team',
    password: 'pass',
    pemail:'hross@example.net'
}

// Validation using Yup library 
const validationSchema = Yup.object({
first: Yup.string().required('First Name is Required'),
last: Yup.string().required('Last Name is Required'),
email:Yup.string().email('invaled email format').required('E-mail is Required'),
phone: Yup.string().required('Phone number is Required'),
gender: Yup.string().required("Gender is required"),
dob: Yup.date().required("Date of birth required YYY-MM-DD"),
age: Yup.number().min(10,"must be at least 10yrs" ).max(20,"Age must be less than 21yrs").integer().positive().required("Enter Age"),
image: Yup.string().url().nullable(),
bio: Yup.string().min(50,"Must be at least 50 chars long").required('Must enter a bio of 50 chars or more.'),
password: Yup.string().required("Must enter a password"),
pemail:Yup.string().email('invaled email format').required('E-mail is Required'),
})

export const AddDancer = () => {

    const [error, setError] = useState(null)
    const [addDancer, setAddDancer] = useState("True")

    const navigate = useNavigate()

    const closeErrorButton = (() => {
        setError(null)
    })
    
    const onSubmit = (values, onSubmitProps) => {  
        fetch("/dancers/add", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) {
               alert("Dancer Added succesful")
               res.json().then((newData) => {
                  console.log(newData);
                  onSubmitProps.setSubmitting(false)
                  onSubmitProps.resetForm()
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
                <Col></Col> 
                <Col xs={12} md={8}>     
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        {
                           addDancer ?
                            
                                <Form >
                                    <label className="labelfonts" style={{color: "goldenrod"}}>Dancer Information</label>    
                                    <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                                    <Field type = 'text' id='first' name='first' />
                                    <ErrorMessage name = 'first' component={TextError} />

                                    <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                                    <Field type = 'text' id='last' name='last' />
                                    <ErrorMessage name = 'last' component={TextError} />

                                    <label htmlFor ='email' style={{color: "white"}}>Email</label>
                                    <Field type = 'email' id='email' name='email' />
                                    <ErrorMessage name = 'email' component={TextError}/>


                                    <label htmlFor ='phone' style={{color: "white"}}>Phone</label>
                                    <Field type = 'text' id='phone' name='phone'/>
                                    <ErrorMessage name = 'phone' component={TextError} />

                                    <label htmlFor ='gender' style={{color: "white"}}>Gender</label>
                                    <Field type = 'text' id='gender' name='gender'/>
                                    <ErrorMessage name = 'gender' component={TextError} />

                                    <label htmlFor ='dob' style={{color: "white"}}>Date of Birth</label>
                                    <Field type = 'text' id='dob' name='dob'/>
                                    <ErrorMessage name = 'dob' component={TextError} />

                                    <label htmlFor ='age' style={{color: "white"}}>Age</label>
                                    <Field type = 'text' id='age' name='age'/>
                                    <ErrorMessage name = 'age'  component={TextError}/>

                                    <label htmlFor ='image' style={{color: "white"}}>Image</label>
                                    <Field type = 'text' id='image' name='image'/>
                                    <ErrorMessage name = 'image' component={TextError} />

                                    <label htmlFor ='bio' className="bio" style={{color: "white"}}>Bio</label>
                                    <Field as = 'textarea' id='bio' name='bio' />
                                    <ErrorMessage name = 'bio'  component={TextError}/>

                                    <label htmlFor ='password' style={{color: "white"}}>Password</label>
                                    <Field type = 'password' id='password' name='password' />
                                    <ErrorMessage name = 'password' component={TextError}/>

                                    <label htmlFor ='pemail' style={{color: "white"}}>Parent Email or Username</label>
                                    <Field type = 'pemail' id='pemail' name='pemail' />
                                    <ErrorMessage name = 'pemail' component={TextError}/>
                                   
                                    <Stack spacing={3} direction="row">    
                                        <Button variant="contained" type="submit">Submit</Button>
                                        <Button variant="contained" onClick={() => {setAddDancer(null);navigate("/portal")}} >Finish</Button>
                                    </Stack>
                           </Form>
                               : null
                        }     
                    </Formik>
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

// const initialValues = {
//     first: 'Deja',
//     last: 'Thompson',
//     email: 'deja@gmail.com',
//     phone: '919-270-2142',
//     gender: 'female',
//     dob: '2023-01-01',
//     age: '17',
//     dob: '2023-01-01',
//     image: '',
//     bio: 'I love dancing. I have been dance since I was 8. So glad to be a part of this team',
//     password: 'pass',
//     pemail:'millerjohn@example.net'
// }
import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup  from 'yup'
import "./signupstyles.css"
import Container from 'react-bootstrap/Container'
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import {TextError} from "../TextError"
import ShowErrorMessages from '../ShowErrorMessages/ShowErrorMessages';
import { useState} from "react";

const initialValues = {
    first: 'Phoenix',
    last: 'Brito',
    email: 'phena@gmail.com',
    phone: '919-123-1234',
    gender: 'female',
    age: 16,
    dob: '2007-02-01',
    bio: 'I started off in cheer but found that my passion was in majorette dancing.',
    image: '',
    password: 'pass',
    p_first: 'Chanee',
    p_last: 'Carson',
    p_address: '805 Grandview Lane, Durham NC 27703',
    p_email: 'chanee@gmail.com',
    p_phone: '123-345-7890',
    p_password: 'pass',
    e_name: 'Vaughn Brito', 
    e_phone: '567-789-1234',
    e_email: 'von@gmail.com'
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
p_first: Yup.string().required('First Name is Required'),
p_last: Yup.string().required('Last Name is Required'),
p_address: Yup.string().required('Address is Required'),
p_email:Yup.string().email('invaled email format').required('E-mail is Required'),
p_phone: Yup.string().required('Phone number is Required'),
p_password: Yup.string().required("Must enter a password"),
e_name: Yup.string().required('First Name is Required'),
e_email:Yup.string().email('invaled email format').required('E-mail is Required'),
e_phone: Yup.string().required('Phone number is Required')
})

export const Signup = ({onSignUp, handleIsParent }) => {
    const [error, setError] = useState(null)

    const closeErrorButton = ((error) => {
        setError(null)
    })

    // handle form submission onSubmit and formik.handleSubmit 
    const onSubmit = values => {  
        fetch("/signup",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(values)
            
        })
        .then((res) => {
            if (res.ok) {
               alert("Signup succesful")
               res.json()
               .then((newParent) => {
                console.log(newParent);
                handleIsParent(newParent)
                onSignUp(newParent)
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
      <Container >
            <Row className='background'>
                <Col className="location-signup"></Col> 
                <Col xs={12} md={8}>     
                    <Formik 
                        initialValues = {initialValues}
                        validationSchema = {validationSchema}
                        onSubmit = {onSubmit} >
                        <Form className="location-signup">
                            <h2 className="heading">SignUp Page</h2>
                            <label className="label-parent" style={{color: "goldenrod"}}>Dancer Information</label>    
                            <label htmlFor ='first' style={{color: "white"}}>First Name</label>
                            <Field type = 'text' id='first' name='first' />
                            <ErrorMessage name = 'first' component={TextError}/>

                            <label htmlFor ='last' style={{color: "white"}}>Last Name</label>
                            <Field type = 'text' id='last' name='last' />
                            <ErrorMessage name = 'last' component={TextError}/>

                            <label htmlFor ='email' style={{color: "white"}}>Email</label>
                            <Field type = 'email' id='email' name='email' />
                            <ErrorMessage name = 'email'component={TextError}/>

                            <label htmlFor ='phone' style={{color: "white"}}>Phone</label>
                            <Field type = 'text' id='phone' name='phone'/>
                            <ErrorMessage name = 'phone' component={TextError}/>

                            <label htmlFor ='gender' style={{color: "white"}}>Gender</label>
                            <Field type = 'text' id='gender' name='gender'/>
                            <ErrorMessage name = 'gender' component={TextError}/>

                            <label htmlFor ='dob' style={{color: "white"}}>Date of Birth</label>
                            <Field type = 'text' id='dob' name='dob'/>
                            <ErrorMessage name = 'dob' component={TextError} />

                            <label htmlFor ='age' style={{color: "white"}}>Age</label>
                            <Field type = 'text' id='age' name='age'/>
                            <ErrorMessage name = 'age' component={TextError}/>

                            <label htmlFor ='image' style={{color: "white"}}>Image</label>
                            <Field type = 'text' id='image' name='image'/>
                            <ErrorMessage name = 'image' component={TextError}/>

                            <label htmlFor ='bio' className="bio" style={{color: "white"}}>Bio</label>
                            <Field as = 'textarea' id='bio' name='bio' />
                            <ErrorMessage name = 'bio' component={TextError}/>

                            <label htmlFor ='password' style={{color: "white"}}>Password</label>
                            <Field type = 'password' id='password' name='password' />
                            <ErrorMessage name = 'password' component={TextError}/>

                            <h1></h1>
                            <label className="label-parent"style={{color: "goldenrod"}}>Parent Information</label>
                            <label htmlFor ='p_first' style={{color: "white"}}>first</label>
                            <Field type = 'text' id='p_first' name='p_first' />
                            <ErrorMessage name = 'p_first' component={TextError}/>

                            <label htmlFor ='p_last' style={{color: "white"}}>last</label>
                            <Field type = 'text' id='p_last' name='p_last' />
                            <ErrorMessage name = 'p_last' component={TextError}/>

                            <label htmlFor ='p_address' style={{color: "white"}}>Address</label>
                            <Field type = 'text' id='p_address' name='p_address' />     
                            <ErrorMessage name = 'p_address' component={TextError}/>

                            <label htmlFor ='p_email' style={{color: "white"}}>Email</label>
                            <Field type = 'email' id='p_email' name='p_email' />
                            <ErrorMessage name = 'p_email' component={TextError}/>

                            <label htmlFor ='p_phone' style={{color: "white"}}>Phone</label>
                            <Field type = 'text' id='p_phone' name='p_phone'/>
                            <ErrorMessage name = 'p_phone' component={TextError}/>

                            <label htmlFor ='p_password' style={{color: "white"}}>Parent Password</label>
                            <Field type = 'password' id='p_password' name='p_password' />
                            <ErrorMessage name = 'p_password' component={TextError}/>

                            <h1></h1>
                            <label className="label-parent" style={{color: "goldenrod"}}>Emergency Contact</label>
                            
                            <label htmlFor ='e_name' style={{color: "white"}}>Name</label>
                            <Field type = 'text' id='e_name' name='e_name' />
                            <ErrorMessage name = 'e_name' component={TextError}/>

                            <label htmlFor ='e_phone' style={{color: "white"}}>Phone</label>
                            <Field type = 'text' id='e_phone' name='e_phone'/>
                            <ErrorMessage name = 'e_phone' component={TextError}/>

                            <label htmlFor ='e_email' style={{color: "white"}}>Email</label>
                            <Field type = 'email' id='e_email' name='e_email' />
                            <ErrorMessage name = 'e_email' component={TextError} />

                            <Button variant="primary" size="lg" type="submit"> Submit</Button>{' '}
                        </Form>
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
//     first: 'Phoenix',
//     last: 'Brito',
//     email: 'phena@gmail.com',
//     phone: '919-123-1234',
//     gender: 'female',
//     age: 16,
//     dob: '2007-02-01',
//     bio: 'I started off in cheer but found that my passion was in majorette dancing.',
//     image: '',
//     password: 'mypasswordisme',
//     p_first: 'Chanee',
//     p_last: 'Carson',
//     p_address: '805 Grandview Lane, Durham NC 27703',
//     p_email: 'chanee@gmail.com',
//     p_phone: '123-345-7890',
//     p_password: 'mypasswordisher',
//     e_name: 'Vaughn Brito', 
//     e_phone: '567-789-1234',
//     e_email: 'von@gmail.com'
// }
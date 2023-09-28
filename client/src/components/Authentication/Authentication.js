import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup  from 'yup'

// handle form state 
const initialValues = {
    first: '',
    last: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    bio: '',
    image: '',
    password: '',
    p_first: '',
    p_last: '',
    p_address: '',
    p_email: '',
    p_phone: '',
    p_password: '',
    e_name: '', 
    e_phone: '',
    e_email: ''
}

// handle form submission onSubmit and formik.handleSubmit 
const onSubmit = values => {
    console.log('Form data', values)   
  }

// Validation using Yup library 
const validationSchema = Yup.object({
first: Yup.string().required('First Name is Required'),
last: Yup.string().required('Last Name is Required'),
email:Yup.string().email('invaled email format').required('E-mail is Required'),
phone: Yup.string().required('Phone number is Required'),
gender: Yup.string().required("Gender is required"),
dob: Yup.date().required("Date of birth required YYY-MM-DD"),
bio: Yup.string().min(50,"Must be at least 50 chars long").nullable(),
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

export const Authentication = () => {
  return (
     //1. Import Formik and wrap entire form with Formick 
     <Formik 
        initialValues = {initialValues}
        validationSchema = {validationSchema}
        onSubmit = {onSubmit} >
        {/* 2. import and replace the form tag with Form */}
        <Form>
        <div className='form-control'>
            <label htmlFor ='first'>first</label>
            {/* 3. import and replace input field with Field */}
            <Field type = 'text' id='first' name='first' />
            {/* 4. import ErrorMessage and replace error message code  */}
            <ErrorMessage name = 'first' />
        </div>

        <div className='form-control'>
            <label htmlFor ='last'>last</label>
            <Field type = 'text' id='last' name='last' />
            <ErrorMessage name = 'last' />
        </div>

        <div className='form-control'>
            <label htmlFor ='email'>Email</label>
            <Field type = 'email' id='email' name='email' />
            <ErrorMessage name = 'email'/>
        </div>

        <div className='form-control'>
            <label htmlFor ='phone'>Phone</label>
            <Field type = 'text' id='phone' name='phone'/>
            <ErrorMessage name = 'phone' />
        </div>

        <div className='form-control'>
            <label htmlFor ='gender'>Gender</label>
            <Field type = 'text' id='gender' name='gender'/>
            <ErrorMessage name = 'gender' />
        </div>

        <div className='form-control'>
            <label htmlFor ='dob'>Date of Birth</label>
            <Field type = 'text' id='dob' name='dob'/>
            <ErrorMessage name = 'dob' />
        </div>

        <div className='form-control'>
            <label htmlFor ='bio'>Bio</label>
            <Field type = 'text' id='bio' name='bio'/>
            <ErrorMessage name = 'bio' />
        </div>

        <div className='form-control'>
            <label htmlFor ='image'>Image</label>
            <Field type = 'text' id='image' name='image'/>
            <ErrorMessage name = 'image' />
        </div>

        <div className='form-control'>
            <label htmlFor ='p_first'>first</label>
            <Field type = 'text' id='p_first' name='p_first' />
            <ErrorMessage name = 'p_first' />
        </div>

         <div className='form-control'>
            <label htmlFor ='p_last'>last</label>
            <Field type = 'text' id='p_last' name='p_last' />
            <ErrorMessage name = 'p_last' />
        </div>

        <div className='form-control'>
            <label htmlFor ='p_address'>Address</label>
            <Field type = 'text' id='p_address' name='p_address' />
            <ErrorMessage name = 'p_address'/>
        </div>

        <div className='form-control'>
            <label htmlFor ='p_email'>Email</label>
            <Field type = 'email' id='p_email' name='p_email' />
            <ErrorMessage name = 'p_email'/>
        </div>

        <div className='form-control'>
            <label htmlFor ='p_phone'>Phone</label>
            <Field type = 'text' id='p_phone' name='p_phone'/>
            <ErrorMessage name = 'p_phone' />
        </div>

        <div className='form-control'>
            <label htmlFor ='name'>Name</label>
            <Field type = 'text' id='name' name='name' />
            <ErrorMessage name = 'name' />
        </div>

        <div className='form-control'>
            <label htmlFor ='e_phone'>Phone</label>
            <Field type = 'text' id='e_phone' name='e_phone'/>
            <ErrorMessage name = 'e_phone' />
        </div>

        <div className='form-control'>
            <label htmlFor ='e_email'>Email</label>
            <Field type = 'email' id='e_email' name='e_email' />
            <ErrorMessage name = 'e_email'/>
        </div>

        <button type = 'submit'>Submit</button>
        </Form>
    </Formik>
)

}


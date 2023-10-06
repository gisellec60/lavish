import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {TextError} from "../TextError"

function RadioButtons({label, name, options, ...rest}) {

  return (
    <div className = 'form-control'>
      <label>{label}</label>
      <Field> name={name} {...rest}
       {
         ({field}) => {
             console.log('Field', field)
            return options.map(option => {
                return (
                    < React.Fragment key={option.key}>
                        <input type = 'radio'
                         id={option.value} {...field} 
                         value={option.value} 
                         checked={field.value === option.valude}
                         />
                        <label htmfor={option.value}>{option.key}</label> 
                    </React.Fragment>
                )
            })
         }
       }
      
      </Field>
      <ErrorMessage name={name} component={TextError} /> 
    </div>
  )
}

export default RadioButtons

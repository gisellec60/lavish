import React from 'react'
import {useState, useEffect} from "react"
import * as React from 'react';

const useGetUser = (username) => {
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])
   
  useEffect (() => {
    fetch(`/dancers/${values["username"]}?action="none"`)
      .then(res => {
          if (res.ok) {
              res.json().then((user) => {console.log(user); set(user)})
          }else{
              console.log("Error returned", res)
              setErrors(res) 
          }      
      })
  },[])

  return (
    <div>
      { 
      user ? <p>{user}</p>
        : <p>{errors}</p>
      }  
    </div>
  )
}

export default useGetUser

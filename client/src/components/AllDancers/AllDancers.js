import {React} from 'react'
import UserNotAuthorized from '../ErrorMessages/UserNotAuthorized';
import ShowDancersListing from "../ShowDancerListing/ShowDancersListing"
import { useState, useEffect } from "react";

const AllDancers = ({onCloseButton}) => {
  
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)
 
  useEffect(() => {
        fetch("/dancers")
        .then(res => {
            if (res.ok) {
                res.json()
                .then((users) => {
                    console.log("These are the users",users); 
                    setUsers([users])
                })
            }else{
                res.json()
                .then((error) => {
                    console.log("Returned error", error); 
                    setError(error) 
                })  
            }        
        })
    }, []);

  return (
    <div>
    { 
        users ? <ShowDancersListing users={users} />
            : null
    } 
    {
        error ?
            <UserNotAuthorized error={error} onCloseButton={onCloseButton} />
            : null
    }

    </div> 
  )
  
}

export default AllDancers


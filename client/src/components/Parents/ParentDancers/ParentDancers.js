import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import ParentDancerListing from "./ParentDancerListing"
import GetDancers from "./GetDancers"

 
const ParentDancers = () => {

const [showDancers, setShowDancers] = useState (false)
const [dancers, setDancers] = useState ([])
 
 return (
    <>
    {
      showDancers ? <ParentDancerListing dancers={dancers} /> :
        <GetDancers showDancers={showDancers} setShowDancers={setShowDancers} setDancers={setDancers} />
    }
    </>    
 )

}

export default ParentDancers

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import ParentDancerListing from "./ParentDancerListing"
import GetDancers from "./GetDancers"

 
const ParentDancers = () => {

const [showDancers, setShowDancers] = useState (false)
const [dancers, setDancers] = useState ([])
const [parent, setParent] = useState ([])
 
 return (
    <>
    {
      showDancers ? <ParentDancerListing dancers={dancers} parent={parent}/> :
        <GetDancers showDancers={showDancers} setShowDancers={setShowDancers} setDancers={setDancers} setParent={setParent} />
    }
    </>    
 )

}

export default ParentDancers

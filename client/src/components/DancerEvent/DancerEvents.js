import React from 'react'
import GetForm from "../GetForm/GetForm"
import ShowDancerEventListing from "../ShowDancerListing/ShowDancerListing"
import {useState} from "react"

const DancerEvents = () => {
  
  const [dancer, setDancer] = useState({})
  const [showDancerEventListing, setShowDancerEventListing] = useState (false)
  
  return (
    <div>
      {
        showDancerEventListing ? <ShowDancerEventListing dancer={dancer} setDancer={setDancer}   />  :
        <GetForm setDancer={setDancer} showDancerEventListing={showDancerEventListing} setShowDancerEventListing={setShowDancerEventListing}  />
      }
    </div>
  )
}

export default DancerEvents
import React from 'react'
import GetForm from "../GetForm/GetForm"
import ShowDancerListing from "../ShowDancerListing/ShowDancerListing"
import { useState} from "react"

const ListDancer = () => {
  
  const [dancer, setDancer] = useState({})
  const [showDancerListing, setShowDancerListing] = useState (false)
  
  return (
    <div>
      {
        showDancerListing ? <ShowDancerListing dancer={dancer} setDancer={setDancer}   />  :
        <GetForm setDancer={setDancer} showDancerListing={showDancerListing} setShowDancerListing={setShowDancerListing}  />
      }
    </div>
  )
}

export default ListDancer

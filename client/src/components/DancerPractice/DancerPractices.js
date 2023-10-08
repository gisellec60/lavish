import React from 'react'
import GetPracticeForm from "./GetPracticeForm"
import ShowDancerPracticeListing from "../DancerPractice/ShowDancerPracticeListing"
import {useState} from "react"

const DancerPractice = () => {
  
  const [dancer, setDancer] = useState([])
  const [practices, setPractices] = useState ([])
  const [empty, setEmpty] = useState(false)
  const [showDancerListing, setShowDancerListing] = useState (false)
  
  return (
    <div>
      {
        showDancerListing ? <ShowDancerPracticeListing dancer={dancer} setDancer={setDancer} practices={practices} setPractices={setPractices}  empty={empty} />  :
        <GetPracticeForm setDancer={setDancer} setPractices={setPractices} showDancerListing={showDancerListing} setShowDancerListing={setShowDancerListing}  empty={empty} setEmpty={setEmpty} />
      }
    </div>
  )
}

export default DancerPractice
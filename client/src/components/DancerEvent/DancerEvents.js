import React from 'react'
import GetEventsForm from "./GetEventsForm"
import ShowDancerEventsListing from "../DancerEvent/ShowDancerEventsListing"
import {useState} from "react"

const DancerEvents = () => {
  
  const [dancer, setDancer] = useState([])
  const [events, setEvents] = useState ([])
  const [showDancerListing, setShowDancerListing] = useState (false)
  
  return (
    <div>
      {
        showDancerListing ? <ShowDancerEventsListing dancer={dancer} setDancer={setDancer} events={events} setEvents={setEvents} />  :
        <GetEventsForm setDancer={setDancer} setEvents={setEvents} showDancerListing={showDancerListing} setShowDancerListing={setShowDancerListing}  />
      }
    </div>
  )
}

export default DancerEvents
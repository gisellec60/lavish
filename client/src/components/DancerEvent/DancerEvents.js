import React from 'react'
import GetEventsForm from "./GetEventsForm"
import ShowDancerEventsListing from "../DancerEvent/ShowDancerEventsListing"
import {useState} from "react"

const DancerEvents = () => {
  
  const [dancer, setDancer] = useState([])
  const [events, setEvents] = useState ([])
  const [empty, setEmpty] = useState(false)
  const [showDancerListing, setShowDancerListing] = useState (false)
  
  return (
    <div>
      {
        showDancerListing ? <ShowDancerEventsListing dancer={dancer} setDancer={setDancer} events={events} setEvents={setEvents} empty={empty} />  :
        <GetEventsForm setDancer={setDancer} setEvents={setEvents} showDancerListing={showDancerListing} setShowDancerListing={setShowDancerListing} empty={empty} setEmpty={setEmpty} />
      }
    </div>
  )
}

export default DancerEvents
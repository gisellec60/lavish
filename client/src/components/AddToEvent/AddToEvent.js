import React from 'react'
import { useState } from "react";
import ListEventToAdd from './ListEventsToAdd';
import ListDancersToAdd from './ListDancersToAdd';

const AddToEvent = ({onClose}) => {

    const [showDancerList, setShowDancerList] = useState(false)
    const [eventObj, setEventObj] = useState(null)

    return (
     <>    
        <div>
         { showDancerList ? <ListDancersToAdd onClose={onClose} event = {eventObj}/> :
              <ListEventToAdd setShowDancerList={setShowDancerList} showDancersList={showDancerList} 
              setEventObj={setEventObj} eventObj = {eventObj}  /> } 
        </div>
    </>
  )
}

export default AddToEvent
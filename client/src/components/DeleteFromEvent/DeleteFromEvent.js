import React from 'react'
import { useState } from "react";
import ListEventToDel from './ListEventsToDel';
import ListDancersToDel from './ListDancersToDel';

const DeleteFromEvent = ({onClose}) => {

    const [showDancerList, setShowDancerList] = useState(false)
    const [eventObj, setEventObj] = useState(null)

    return (
     <>    
        <div>
         { showDancerList ? <ListDancersToDel onClose={onClose} event = {eventObj}/> :
              <ListEventToDel setShowDancerList={setShowDancerList} showDancersList={showDancerList} 
              setEventObj={setEventObj} eventObj = {eventObj}  /> } 
        </div>
    </>
  )
}

export default DeleteFromEvent
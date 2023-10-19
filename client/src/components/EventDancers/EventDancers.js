import React from 'react'
import { useState } from "react";
import ShowDancers from '../EventDancers/ShowDancers';
import ShowEvents from '../EventDancers/ShowEvents';

function EventDancers() {

  const [showDancers, setShowDancers] = useState(false)
  const [eventObj, setEventObj] = useState(null)

  return (
    <div>
        {   showDancers ? <ShowDancers eventObj={eventObj} setShowDancers={setShowDancers} 
                 showDancers={showDancers}  /> :
            <ShowEvents setShowDancers={setShowDancers} setEventObj={setEventObj}/>
        }
 
    </div>
  )
}

export default EventDancers

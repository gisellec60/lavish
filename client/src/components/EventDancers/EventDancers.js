import React from 'react'
import { useState } from "react";
import ShowDancers from '../EventDancers/ShowDancers';
import ShowEvents from '../EventDancers/ShowEvents';

function EventDancers() {

  const [showDancers, setShowDancers] = useState(false)
  const [eventObj, setEventObj] = useState(null)
  const [empty, setEmpty] = useState(false)

  return (
    <div>
        {   showDancers ? <ShowDancers eventObj={eventObj} setShowDancers={setShowDancers} 
                 showDancers={showDancers} empty={empty} setEmpty={setEmpty} /> :
            <ShowEvents setShowDancers={setShowDancers} setEventObj={setEventObj}/>
        }
 
    </div>
  )
}

export default EventDancers

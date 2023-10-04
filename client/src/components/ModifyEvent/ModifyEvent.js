import React from 'react'
import { useState } from "react";
import ModifyEventForm from '../ModifyEvent/ModifyEventForm';
import ModifyShowEvents from '../ModifyEvent/ModifyShowEvents';

const ModifyEvent = () => {

    const [showModifyEventForm, setShowModifyEventForm] = useState(false)
    const [eventObj, setEventObj] = useState(null)
  

    return (
     <>    
        <div>
         { showModifyEventForm ? <ModifyEventForm eventObj={eventObj} setShowModifyEventForm={setShowModifyEventForm} 
                                   showModifyEventForm={showModifyEventForm}  /> :
         <ModifyShowEvents setShowModifyEventForm={setShowModifyEventForm}
                           showModifyEventForm={showModifyEventForm} setEventObj={setEventObj}/> } 
        </div>
    </>
  )
}

export default ModifyEvent

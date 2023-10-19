import React from 'react'
import { useState } from "react";
import ShowDancers from '../PracticeDancers/ShowDancers';
import ShowPractice from '../PracticeDancers/ShowPractice';

function PracticeDancers() {

  const [empty, setEmpty] = useState(false)
  const [showDancers, setShowDancers] = useState(false)
  const [practiceObj, setPracticeObj] = useState(null)

  return (
    <div>
        {   showDancers ? <ShowDancers practiceObj={practiceObj} setShowDancers={setShowDancers} 
                 showDancers={showDancers} empty={empty} setEmpty={setEmpty}/> :
            <ShowPractice setShowDancers={setShowDancers} setPracticeObj={setPracticeObj}/>
        }
 
    </div>
  )
}

export default PracticeDancers
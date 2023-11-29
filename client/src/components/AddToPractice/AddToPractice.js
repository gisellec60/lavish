import React from 'react'
import { useState } from "react";
import ListPracticeToAdd from './ListPracticeToAdd';
import ListDancersToAdd from './ListDancerToAdd';

const ModifyPractice = ({onClose}) => {

    const [showDancerList, setShowDancerList] = useState(false)
    const [practiceObj, setPracticeObj] = useState(null)
    const [dancerObj, setDancerObj] = useState(null)
  
    return (
     <>    
        <div>
         { showDancerList ? <ListDancersToAdd onClose={onClose} dancerObj={dancerObj} setDancerObj={setDancerObj} 
                             practiceObj = {practiceObj} /> :
         <ListPracticeToAdd setShowDancerList={setShowDancerList} showDancersList={showDancerList} 
              setPracticeObj={setPracticeObj} practiceObj = {setPracticeObj} /> } 
        </div>
    </>
  )
}

export default ModifyPractice
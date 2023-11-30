import React from 'react'
import { useState } from "react";
import ListPracticeToAdd from './ListPracticeToAdd';
import ListDancersToAdd from './ListDancersToAdd';

const AddToPractice = ({onClose}) => {

    const [showDancerList, setShowDancerList] = useState(false)
    const [practiceObj, setPracticeObj] = useState(null)
    const [dancerObj, setDancerObj] = useState(null)
  
    return (
     <>    
        <div>
         { showDancerList ? <ListDancersToAdd onClose={onClose} practice = {practiceObj}/> :
              <ListPracticeToAdd setShowDancerList={setShowDancerList} showDancersList={showDancerList} 
              setPracticeObj={setPracticeObj} practiceObj = {practiceObj}  /> } 
        </div>
    </>
  )
}

export default AddToPractice
import React from 'react'
import { useState } from "react";
import ListPracticeToAdd from './ListPracticeToAdd';
import ListDancersToAdd from './ListDancersToAdd';
import AddDancerToPractice from './AddDancerToPractice'

const AddToPractice = ({onClose}) => {

    const [showDancerList, setShowDancerList] = useState(false)
    const [addDancer, setAddDancer] = useState(false)
    const [practiceObj, setPracticeObj] = useState(null)
    const [dancerObj, setDancerObj] = useState(null)
  
    return (
     <>    
        <div>
         { showDancerList ? <ListDancersToAdd dancerObj={dancerObj} setDancerObj={setDancerObj}
              addDancer = {addDancer} setAddDancer={setAddDancer}/> :
              <ListPracticeToAdd setShowDancerList={setShowDancerList} showDancersList={showDancerList} 
              setPracticeObj={setPracticeObj} practiceObj = {practiceObj} /> } 
         { addDancer ? <AddDancerToPractice onClose={onClose} dancerObj={dancerObj} practiceObj = {practiceObj}/>
           : null }      
        </div>
    </>
  )
}

export default AddToPractice
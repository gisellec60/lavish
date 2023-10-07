import React from 'react'
import { useState } from "react";
import ModifyPracticeForm from '../ModifyPractice/ModifyPracticeForm';
import ModifyShowPractice from '../ModifyPractice/ModifyShowPractice';

const ModifyPractice = ({onClose}) => {

    const [showModifyPracticeForm, setShowModifyPracticeForm] = useState(false)
    const [practiceObj, setPracticeObj] = useState(null)
  
    return (
     <>    
        <div>
         { showModifyPracticeForm ? <ModifyPracticeForm onClose={onClose} practiceObj={practiceObj} setShowModifyPracticeForm={setShowModifyPracticeForm} 
                                   showModifyPracticeForm={showModifyPracticeForm}  /> :
         <ModifyShowPractice setShowModifyPracticeForm={setShowModifyPracticeForm}
                           showModifyPracticeForm={showModifyPracticeForm} setPracticeObj={setPracticeObj}/> } 
        </div>
    </>
  )
}

export default ModifyPractice
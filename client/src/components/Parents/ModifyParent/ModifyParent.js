import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./modifyParent.css"
import { useState } from "react"
import ModifyParentForm from "./ModifyParentForm"
import GetParent from "../SearchParent/GetParent"

 
const ModifyParent = () => {

const [showParent, setShowParent] = useState (false)
const [parent, setParent] = useState ([])
 
 return (
    <>
    {
      showParent ? <ModifyParentForm parent={parent} /> :
        <GetParent setParent={setParent} showParent={showParent} setShowParent={setShowParent} />
    }
    </>    
 )

}

export default ModifyParent

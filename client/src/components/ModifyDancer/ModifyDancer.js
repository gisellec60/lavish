import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import { useState } from "react"
import ModifyForm from "./ModifyForm"
import GetDancer from "./GetDancer"

 
const ModifyDancer = () => {

const [showDancer, setShowDancer] = useState (false)
const [dancer, setDancer] = useState ([])
 
 return (
    <>
    {
      showDancer ? <ModifyForm dancer={dancer} /> :
        <GetDancer setDancer={setDancer} showDancer={showDancer} setShowDancer={setShowDancer} />
    }
    </>    
 )

}

export default ModifyDancer

import React from 'react'
import GetParent from "../SearchParent/GetParent"
import ShowParent from "../SearchParent/ShowParent"
import { useState} from "react"

const SearchParent = () => {
  
  const [parent, setParent] = useState({})
  const [showParent, setShowParent] = useState (false)
  
  console.log("this is show parent", showParent)
  console.log("this is par4ent", parent)
  return (
    <div>
      {
        showParent ? <ShowParent parent={parent} setParent={setParent}   />  :
        <GetParent setParent={setParent} showParent={showParent} setShowParent={setShowParent}  />
      }
    </div>
  )
}

export default SearchParent

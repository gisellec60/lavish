import React from 'react'
import { useEffect } from "react";

function AddDancerToPractice({dancerObj, practiceObj, onClose}) {

    useEffect(() => {
        fetch(`/practices/add/${dancerObj["id"]}/${practiceObj["id"]}`)
        .then(res => {
            if (res.ok) {
                alert(`${dancerObj.first} ${dancerObj.last} added to ${practiceObj.venue}`)        
                onClose()
            }else{
                res.json()
                .then((errors) => {
                    console.log("Returned error", errors); 
                })
            }     
        })
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default AddDancerToPractice

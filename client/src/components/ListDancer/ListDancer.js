import React from 'react'
import useGetForm from "../GetForm/useGetForm"
import GetFrom from "../GetForm/GetForm"

const ListDancer = ({onListDancer}) => {
  const {getDancer} = useGetForm()  
  
  return (
    <div>
      <GetFrom onListDancer={onListDancer} />
    </div>
  )
}

export default ListDancer

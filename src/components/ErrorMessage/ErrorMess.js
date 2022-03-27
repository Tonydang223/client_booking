import React from 'react'
import './Err.css'
const ErrorMess = (props) => {
    const {mgs} =  props
  return (
    <div className="err-mgs">
     {mgs?mgs:''}
    </div>
  )
}

export default ErrorMess
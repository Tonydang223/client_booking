import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ErrorMess from '../components/ErrorMessage/ErrorMess'
import apiHandler from '../services/api/auth'

const ForgotPass = () => {
  const [email,setEmail] = useState('')
  const [errs,setErrs] = useState('')
  const onSubmit =async (e)=>{
      e.preventDefault()
      if(email === null || email===""||email===undefined){
          setErrs('This field can not be empty!')
      }else{
          const data = {email}
          console.log(data)
          try {
            const res = await apiHandler.forgotPass(data)
            toast.success(res?.message,{autoClose:4000,position:'top-right'})
            console.log(res)
          } catch (error) {
            if(error){
              toast.error(error.response.data.message,{autoClose:4000,position:'top-right'})
            }
          }
          setErrs('')
          setEmail('')
      }
  }
return (
  <section>
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-sm-6 outside">
          <div className="box-inside shadow p-4 mb-5 bg-white rounded">
            <div className="content">
              <h2>Password Reset</h2>
              <p className='text-muted'>
                You can enter your registered email that you signed up before, so you can get new mail to update your account's password.
              </p>
            </div>
            <form onSubmit={onSubmit}>
            <div className="inputText">
              <label className="form-label">Email</label>
              <input
                type="email"
                className = {`form-control ${errs.email?'redBorder':'originBorder'}`}
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              {errs ? <ErrorMess mgs={errs} /> : null}
            </div>
            <div className="buto">
              <button type="submit" className="btn btn-primary w">
                Send
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ForgotPass
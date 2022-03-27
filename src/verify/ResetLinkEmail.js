import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import apiHandler from './../services/api/auth';
import 'react-toastify/dist/ReactToastify.css'
import ErrorMess from '../components/ErrorMessage/ErrorMess';
import '../member/style.css'
const ResetLinkEmail = () => {
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
              const res = await apiHandler.resetLink({email})
              console.log(res)
              toast.success(res?.message,{position:'top-right',autoClose:4000})
              setErrs('')
            } catch (error) {
              console.log('not oke')
              console.log(error.response)
              if(error){
                toast.error(error?.response?.data.message,{position:'top-right',autoClose:4000})
              }
            }
        }
    }
  return (
    <section>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-6 outside">
            <div className="box-inside shadow p-4 mb-5 bg-white rounded">
              <div className="content">
                <h2>Reset Link</h2>
                <p className='text-muted'>
                  You can enter your registered email that you signed up before, so you can get new mail to verify your account.
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
                  Reset
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

export default ResetLinkEmail
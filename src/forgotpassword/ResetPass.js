import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ErrorMess from '../components/ErrorMessage/ErrorMess'
import validate from './../helper/validations';
import '../member/style.css'
import apiHandler from '../services/api/auth';
import { toast } from 'react-toastify';
const ResetPass = () => {
    const {token} = useParams()
    console.log(token)
    const initialValue ={
      password:'',
      confPass:'',
    }
    console.log(token)
    const [resetPass,setResetPass] = useState(initialValue)
    const [errs,setErrs] = useState({})
    console.log(resetPass)
    const onChange = (e)=>{
      setResetPass({...resetPass,[e.target.name]:e.target.value})
    }
    const onSubmit = async(e)=>{
      e.preventDefault();
      let objErr = {}

      if(!validate.isEmpty(resetPass.pass)){
        objErr.password = "Password can not be empty"
      }else if(!validate.isLimitLenght(resetPass.pass,6,15)){
        objErr.password = "Password can not be than 15 characters and smaller than 6 characters"
      }else if(!validate.isMatchPass(resetPass.password)){
        objErr.password = "Password can not be space"
      }

      if(!validate.isEmpty(resetPass.confPass)){
        objErr.confPass = "Confirm Password can not be empty"
      }else if(resetPass.confPass !== resetPass.password){
        objErr.confPass = "Confirm Password must be match with password"
      }
      
      if(Object.keys(objErr).length>0){
        setErrs(objErr)
      }
      else{
        try {
          const data = {password:resetPass.password,token}
          const res = await apiHandler.resetPass(data)
          console.log(res)
          toast.success(res?.message,{position:'top-right',autoClose:4000})
          setErrs({})
          setResetPass(initialValue)
        }catch (error) {
          console.log(error.response.data)
          if(error){
            toast.error(error.response.data.message,{position:'top-right',autoClose:4000})
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
              <h2>Change Password</h2>
              <p className='text-muted'>
                You can change password here
              </p>
            </div>
            <form onSubmit={onSubmit}>
            <div className="inputText">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className = {`form-control ${errs.password?'redBorder':'originBorder'}`}
                placeholder="Password"
                name="password"
                value={resetPass.password}
                onChange={onChange}
              />
              {errs.password ? <ErrorMess mgs={errs.password} /> : null}
              <label className="form-label">Confirm Password</label>
              <input
                type="text"
                value={resetPass.confPass}
                className = {`form-control ${errs.confPass?'redBorder':'originBorder'}`}
                placeholder="Confirm Password"
                name="confPass"
                onChange={onChange}
              />
              {errs.confPass ? <ErrorMess mgs={errs.confPass} /> : null}
            </div>
            <div className="buto">
              <button type="submit" className="btn btn-primary w">
                Submit
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

export default ResetPass
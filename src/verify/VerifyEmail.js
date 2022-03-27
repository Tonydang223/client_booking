import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import apiHandler from './../services/api/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons'
import './style.css'
const VerifyEmail = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    console.log(token)
    const [statusActive,setStatusActive] = useState({
        verify:false,
        MgsSuccess:'',
        MgsFail:'',
        loading:false
    })
    console.log(statusActive)
    const callVerify =async()=>{
        try {
              const tokenEmail = {token}
              const res = await apiHandler.verify(tokenEmail)
              console.log(res)
              setStatusActive({...setStatusActive,MgsSuccess:res?.message,verify:true,loading:false})
              console.log('ok')
        } catch (error) {
            console.log(error.response)
            console.log('not')
            if(error){
                setStatusActive({...setStatusActive,MgsFail:error.response.data.message,verify:false})
                navigate('/auth/resetLink')
            }

        }
    }
    useEffect(()=>{
        setStatusActive({...statusActive,loading:true})
        if(token){
            callVerify()
        }
        return ()=>callVerify()
    },[token])
  return (
    <section>
    <div className='container'>
    <div class="row align-items-center">
        <div class="col-6 mx-auto">
       <div className='card text-center text-white justify-content-md-center box-c'>
          <div className={`card-header ${statusActive.MgsFail?`headr-c`:`headg-c`}`}>
            Email Sender Info Box
          </div>
            <div className={`card-body ${statusActive.MgsFail?'red-c':'gre-c'}`}>
                <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    color='#fff'
                    className='enlop-email'
                />
                <h5 className='card-title'>Email Verification</h5>
                {statusActive.MgsFail!==''?(<p className="card-text">{statusActive.MgsFail}</p>):null}
                {statusActive.MgsSuccess!==''?(<p className="card-text">{statusActive.MgsSuccess}</p>):null}
                <div className='line-bar'></div>
            </div>
       </div>
    </div>
    </div>
    </div>
    </section>
  )
}

export default VerifyEmail
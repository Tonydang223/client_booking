import React from 'react'
import { Link } from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
const Homepage = () => {
  const responseGoogle = async(res)=>{
    console.log(res)
    const {tokenId} = res
    console.log(tokenId)
    try {
      const response = await axios.post('http://localhost:5000/auth/googleLogin',{tokenId},{
        'Content-Type': 'application/json',
            })
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <div>Homepage
    <Link to={"/forgotPass"} >ForgotP</Link>
    <Link to={"/user/updateInfo"} >Update User</Link>

    <GoogleLogin
    clientId="48501400357-duevl4sk6ih8hi0n90at0i4vpm3da7nk.apps.googleusercontent.com"
    buttonText="Login with Google Account"
    onSuccess={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
    </div>
  )
}

export default Homepage
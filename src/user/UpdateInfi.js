import axios from 'axios'
import React,{useEffect, useRef, useState} from 'react'
import useAuth from './../hooks/useAuth';

const UpdateInfi = () => {
   const [show,setShow] = useState(false)
   const [avatar,setAvatar] = useState(null)
   const [status,setStatus]  = useState('none')
   const inputFileRef = useRef()
   const [avatarh,setAvatarh] = useState(null)
   console.log(avatar)
    const onChange = (e)=>{

        let reader = new FileReader()
        reader.onload=(e)=>{
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
   
    }
    const onChangeh = (e)=>{
       setAvatarh(e.target.files)
    }
    console.log(avatarh)
    const closeImgBox = (value)=>{
        setAvatar(null)
        setShow(false)
        setStatus('cancel')
    }
    const uploadAvatar = async()=>{
        try {

            const res = await axios.post('http://localhost:5000/user/uploadImg',avatar,{headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json',
                'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWI0ZGRmN2Q4ZDdhNDczMmQ5YzEzZiIsImlhdCI6MTY0NzUwMDEzOCwiZXhwIjoxNjQ3NTg2NTM4fQ.E53hbFP_QUvDE0vQmwP8iJM9A-12K98Me3iJRzTtpV8'
                    }})
            console.log(res)
        } catch (error) {
            console.log(error.response)
        }
    }
    const uploadAvatarh = async()=>{
        try {
            let formData = new FormData()
            formData.append("hotel_name","jiopp")
            formData.append("address","23 jioo")
            Object.keys(avatarh).map((i,item)=>{
                formData.append('imgs[]',avatarh[item])
            })
            const res = await axios.post('http://localhost:5000/api/createHotel',formData,{headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWI0ZGRmN2Q4ZDdhNDczMmQ5YzEzZiIsImlhdCI6MTY0NzUwMDEzOCwiZXhwIjoxNjQ3NTg2NTM4fQ.E53hbFP_QUvDE0vQmwP8iJM9A-12K98Me3iJRzTtpV8'
            }})
            console.log(res)
        } catch (error) {
            console.log(error.response)
        }
    }
  return (
    <div>
        <input ref={inputFileRef} type="file" name='avatar' onChange={onChange}/>

        <div style={{display:avatar?"block":"none"}}>
        <button onClick={()=>closeImgBox(1)}>Close</button>
            <img src={avatar?avatar:"#"} style={{height:"300px",width:"300px"}}/>
        <button onClick={uploadAvatar}>Upload</button>
        </div>
       <form onSubmit={uploadAvatarh} encType='multipart/form-data'>
       <input ref={inputFileRef} type="file" name='avatar' onChange={onChangeh} multiple/>
       <button type='submit'>Upload2</button>
       </form>
    </div>
  )
}

export default UpdateInfi
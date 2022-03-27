import axios from "axios";
import { useSelector } from 'react-redux';


const apiClient = axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use((req)=>{

  const token = localStorage.getItem('accessToken')
  req.headers.Authorization = token? token:''
   return req
})
apiClient.interceptors.response.use((res)=>{
   return res.data
},(err)=>{
  return Promise.reject(err);
})

export default apiClient
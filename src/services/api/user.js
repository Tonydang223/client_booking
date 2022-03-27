import React from 'react'
import { URL_USER } from '../../utils/constant';
import apiClient from './config';

const apiUser = {
   getInfo:async()=>{
    const url = `${URL_USER}/getInfoUser`;
    const res = await apiClient.get(url);
    return res;
   }
}
export default apiUser
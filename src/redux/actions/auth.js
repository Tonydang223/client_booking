import React from 'react'
import { TYPES } from './../types/index';

export const authAction = (data) => {
    return {
        type:TYPES.USER_LOGGED,
        payload:{
            isRole:data?.role === 1 ? 1 :0,
            user:data
        }
    }
}

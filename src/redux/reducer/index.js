

import React from 'react'
import {applyMiddleware,combineReducers} from 'redux'
import authReducer from './authReducer';
import tokenReducer from './tokenReducer';
const allReducers = combineReducers({
    user:authReducer,
    token:tokenReducer
})

export default allReducers
import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../redux/context';

const useAuth = () => {
  const {state} = useContext(AppContext)
  return state
}

export default useAuth
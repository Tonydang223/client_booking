import React from 'react'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'

const MyPage = () => {
  const user = useAuth()
  console.log(user)
  return (
    <div>Profile {user?.user?.name}</div>
  )
}

export default MyPage
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({expectedRoles, children}) => {
  const {rol } = useSelector(state => state.auth)
  const isAllowed = expectedRoles.includes(rol)
  if (isAllowed) {
    return children
  }
  return (<Navigate to='/' replace/>)

}

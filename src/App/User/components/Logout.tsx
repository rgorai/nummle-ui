import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../../../services/authService'
import { useAuthInfo } from '../../../state/authContext'

const Logout = () => {
  const { setAuthInfo } = useAuthInfo()

  useEffect(() => {
    setAuthInfo(logout())
  }, [setAuthInfo])

  return <Navigate replace to="/" />
}

export default Logout

import { PropsWithChildren, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authenticateUser, logout } from '../services/authService'
import { useAuthInfo } from '../state/authContext'

// TODO: rework authentication with cookies and without JWT for production

type Props = {
  ensureNotAuthenticated: boolean | null
}

const AuthWrapper = (props: Props & PropsWithChildren) => {
  const { authInfo, setAuthInfo } = useAuthInfo()
  const { pathname, search, state } = useLocation()

  // check if user is authenticated
  useEffect(() => {
    authenticateUser(
      ...(authInfo.authenticated
        ? [authInfo.userId, authInfo.username]
        : [false])
    )
      .then(({ data }) => {
        setAuthInfo(data)
        // console.log('THIS', data)
        // if (data.authenticated) console.log('token', data.access_token)
      })
      .catch(() => {
        setAuthInfo(logout())
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return props.ensureNotAuthenticated === authInfo.authenticated ? (
    props.ensureNotAuthenticated ? (
      <Navigate replace to={(state as any)?.from ?? '/feed'} />
    ) : (
      <Navigate replace to="/login" state={{ from: pathname + search }} />
    )
  ) : (
    <Outlet />
  )
}

export default AuthWrapper

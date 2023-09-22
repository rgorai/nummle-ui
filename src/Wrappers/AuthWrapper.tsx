import { PropsWithChildren, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { authenticateUser, logout } from '../services/authService'
import { useAuthInfo } from '../state/authContext'

// TODO: rework authentication with cookies and without JWT for production

// TODO: auth wrapper does not re authenticate on pages that don't
// need authentication, so it does not update logged in state to ui

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
        ? [authInfo.user_id, authInfo.username]
        : [false])
    )
      .then(({ data }) => setAuthInfo(data))
      .catch(() => setAuthInfo(logout()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return props.ensureNotAuthenticated === authInfo.authenticated ? (
    props.ensureNotAuthenticated ? (
      <Navigate replace to={state?.from ?? '/feed'} />
    ) : (
      <Navigate replace to="/login" state={{ from: pathname + search }} />
    )
  ) : (
    <Outlet />
  )
}

export default AuthWrapper

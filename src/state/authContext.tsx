import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { setObjValueFromKeychain } from '../utils/objects'

const DEFAULT_STATE: AuthResponse = JSON.parse(
  localStorage.getItem('authInfo') ?? 'null'
) ?? { authenticated: false }

const authContext = createContext<any>(DEFAULT_STATE)

// type UpdateUserData = (
//   keychain: keyof UserProfilePrivate | [keyof UserProfilePrivate, ...string[]],
//   newValue: any
// ) => void

export const AuthProvider = (props: PropsWithChildren) => {
  const [authInfo, setAuthInfo] = useState(DEFAULT_STATE)

  // const updateUserData: UpdateUserData = (_keychain, newValue) =>
  //   setAuthInfo((prev) =>
  //     setObjValueFromKeychain(prev, ['userData', ..._keychain], newValue)
  //   )

  return (
    <authContext.Provider
      value={{
        authInfo,
        setAuthInfo,
        // updateUserData
      }}
      {...props}
    />
  )
}

export const useAuthInfo = (): {
  authInfo: AuthResponse
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthResponse>>
  // updateUserData: UpdateUserData
} => useContext(authContext)

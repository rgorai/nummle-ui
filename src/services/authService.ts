import axios from 'axios'

export const signup = async (profileData: UserData) => {
  const { username, password } = profileData
  return await axios
    .post('/api/auth/signup', profileData)
    .then(() => login({ username, password }))
}

export const login = async (loginData: LoginSpecs) => {
  return await axios
    .post<AuthResponse>('/api/auth/login', loginData)
    .then(({ data }) => {
      if (data.authenticated && data.access_token && data.user_id) {
        localStorage.setItem('authInfo', JSON.stringify(data))
        return data
      } else throw 'Invalid auth response'
    })
}

export const logout = (): AuthResponse => {
  localStorage.removeItem('authInfo')
  return { authenticated: false }
}

export const getAuthInfo = (): AuthResponse =>
  JSON.parse(
    localStorage.getItem('authInfo') ?? JSON.stringify({ authenticated: false })
  )

export const authHeader = () => {
  const { access_token, user_id }: any = getAuthInfo()
  if (access_token) return { access_token, user_id }
}

type AuthProps = [userId: false] | [userId: string, username: string]

export const authenticateUser = (...[userId, username]: AuthProps) =>
  axios.get<AuthResponse>(`/api/auth/isAuthenticated/${userId}/${username}`, {
    headers: authHeader(),
  })

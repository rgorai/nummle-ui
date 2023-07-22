type Authenticated = {
  authenticated: true
  user_id: string
  username: string
  access_token: string
}

type Unauthenticated = {
  authenticated: false
}

type AuthResponse = Authenticated | Unauthenticated

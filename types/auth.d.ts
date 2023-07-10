type Authenticated = {
  authenticated: true
  userId: string
  username: string
  access_token: string
}

type Unauthenticated = {
  authenticated: false
}

type AuthResponse = Authenticated | Unauthenticated

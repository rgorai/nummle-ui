/**
 * @author rgorai
 * @description stored details for an authenticated user
 * @param authenticated true value to indicate that user is authenticated
 * @param user_id the user's id
 * @param username the user's username
 * @param access_token the JWT access token issued to the user
 */
type Authenticated = {
  authenticated: true
  user_id: string
  username: string
  access_token: string
}

/**
 * @author rgorai
 * @description stored details for an uauthenticated user
 * @param authenticated false value to indicate that user is not authenticated
 */
type Unauthenticated = {
  authenticated: false
}

/**
 * @author rgorai
 * @description the response sent by the API regarding a user's authentication status
 */
type AuthResponse = Authenticated | Unauthenticated

/**
 * @author rgorai
 * @description stored details of a user
 * @param _id database id of the user
 * @param fullName user's capitalized and space-separated full name
 * @param birthdate datestring of the user's DOB
 * @param gender user's gender, or null if not provided
 * @param nationalities list of nationalities the user identifies with
 * @param email the user's email address
 * @param username the user's public username
 * @param password the user's hashed password
 * @param bio the user's supplied biographical/about data
 * @param savedAddresses list of address strings the user has saved
 * @param savedRestaurants list of restaurant IDs the user has saved to their account
 * @param numOrders the number of orders this user has ever successfully placed
 * @param numFollowers the number of followers this user currently has
 * @param numFollowing the number of users this person currently follows
 */
type UserData = {
  _id: string
  fullName: string
  birthdate: string
  gender: string | null
  nationalities: string[]
  email: string
  username: string
  password: string
  bio: string
  savedAddresses: string[]
  savedRestaurants: string[]
  numOrders: number
  numFollowers: number
  numFollowing: number
}

type UserProfilePrivate = Omit<UserData, 'password'>

type UserProfilePublic = Omit<
  UserData,
  'email' | 'password' | 'savedAddresses' | 'savedRestaurants'
>

type UserRegistrationInfo = Pick<
  UserData,
  | 'fullName'
  | 'birthdate'
  | 'gender'
  | 'nationalities'
  | 'email'
  | 'username'
  | 'password'
>

type LoginSpecs = {
  username: string
  password: string
}

type ClientLocation = {
  latitude: number
  longitude: number
  address: string
}

type Follow = {
  userId: string
  username: string
  fullName: string
  createdAt: string
}

type Followers = {
  userId: string
  followers: Follow[]
}

type Followings = {
  userId: string
  followings: Follow[]
}

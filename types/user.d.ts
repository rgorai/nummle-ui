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
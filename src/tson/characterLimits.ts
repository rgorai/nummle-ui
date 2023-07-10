const characterLimits: {
  user: { [key in keyof UserProfilePrivate]?: number }
} = {
  user: {
    username: 20,
    bio: 300,
  },
}

export default characterLimits

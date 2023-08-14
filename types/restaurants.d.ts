type RestaurantPage = {
  id: string
  name: string
  ogImage: OgImage
  websiteUrl: string | undefined
  freeFormAddress: string
  phoneNumber: string
  menu: RestaurantMenu
}

type MenuItem = {
  id: string
  name: string
  price: number
  description?: string
  imagePath?: string
}

type MenuCategories = {
  categoryName: string
  items: MenuItem[]
}

type RestaurantMenu = MenuCategories[]

type MenuItemReactions = {
  reactionRank: number
  users: {
    id: string
    username: string
    profileImage: string | null
  }[]
}[]

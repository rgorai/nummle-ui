type RestaurantDetails = {
  id: string
  name: string
  ogImage: OgImage
  websiteUrl: string | undefined
  freeFormAddress: string
  phoneNumber?: string
  menu: RestaurantMenu
}

type RestaurantPage = RestaurantDetails & {
  menuReactions: MenuReactions | null
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

type MenuItemReactions = Record<
  number,
  {
    id: string
    username: string
    profileImage: string | null
  }[]
>

type MenuReactions = Record<string, MenuItemReactions>

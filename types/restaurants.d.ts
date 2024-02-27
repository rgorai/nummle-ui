/**
 * @author rgorai
 * @description the restaurant details provided by the TomTom API - will change once we integrate our own restaurant API
 * @param id TomTom id for the restaurant
 * @param name name of the restaurant
 * @param ogImage the path to the image for this restaurant, if any
 * @param websiteUrl the URL to the website for this restaurant
 * @param freeFormAddress the complete, one-line address string of this restaurant
 * @param phoneNumber the restaurant's phone number
 * @param menu the menu for this restaurant - see {@link RestaurantMenu}
 */
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

/**
 * @author rgorai
 * @description the details of an individual menu item
 * @param id the item's resturant-wide id
 * @param name the name of the menu item
 * @param price the price of the item, rounded to 2 decimal places
 * @param description an optional description for the item
 * @param imagePath an optional path to an image for the item
 */
type MenuListItem = {
  id: string
  name: string
  price: number
  ingredients?: string[]
  allergens: string[]
  description?: string
  imagePath?: string
}

/**
 * @author rgorai
 * @description each menu category has a name for the category, and a list of {@link MenuListItem}s
 */
type MenuCategories = {
  categoryName: string
  items: MenuListItem[]
}

/**
 * @author rgorai
 * @description the schema for a restaurant's menu; it is a list of {@link MenuCategories}
 */
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

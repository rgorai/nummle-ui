/**
 * @author rgorai
 * @description a post to a user's feed
 * @param _id the id of the post
 * @param orderId the id of the order associated with this post
 * @param posterId the id of the user who placed this order
 * @param posterUsername the username of the user who placed this order
 * @param restaurantId the id of the restaurant associated with this order
 * @param restaurantName the name of the restaurant associated with this order
 * @param restaurantImage the image of the restaurant associated with this order
 * @param items the items ordered in this order
 * @param postedDate the date this post was posted
 * @param updatedDate: the date this post was last updated
 */
type FeedPost = {
  _id: string
  orderId: string
  posterId: string
  posterUsername: string
  restaurantId: string
  restaurantName: string
  restaurantImage: OgImage
  items: (Omit<Item, 'reaction'> & { reaction: ReactionOption })[]
  postedDate: string
  updatedDate: string
}

/**
 * @author rgorai
 * @description the details of a dish given by the trending dishes service
 * @param restaurantId the id of the restaurant this dish belongs to
 * @param restauranName the name of the restaurant this dish belongs to
 * @param itemId the id of this item
 * @param itemName the name of this item
 * @param count the number of people who have ordered this exact dish in the past 60 days
 */
type TrendingDish = {
  restaurantId: string
  restauranName: string
  itemId: string
  itemName: string
  count: number
}

/**
 * @author rgorai
 * @description a collection of the different types of trending dishes
 * @param allOrdersSorted the descending-sorted list of trending dishes among all users of the app
 * @param followingsOrdersSorted the descending-sorted list of trending dishes among all users of the app that the current user follows
 */
type TrendingDishes = {
  allOrdersSorted: TrendingDish[]
  followingsOrdersSorted: TrendingDish[]
}

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

type BroadcastFeedPost = Omit<
  FeedPost,
  '_id' | 'postedDate' | 'updatedDate' | 'items'
> & {
  itemId: string
  reactedItemInfo: FeedPost['items'][number]
}

type UserFeed = {
  userId: string
  feedItems: string[]
}

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

type TrendingItem = {
  restaurantId: string
  itemId: string
  itemInfo: Item
}

type TrendingDish = {
  restaurantId: string
  restauranName: string
  itemId: string
  itemName: string
  count: number
}

type TrendingDishes = {
  allOrdersSorted: TrendingDish[]
  followingsOrdersSorted: TrendingDish[]
}

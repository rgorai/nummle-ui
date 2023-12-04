import axios from 'axios'
import { authHeader } from './authService'

export const submitReaction = (
  orderId: string,
  itemId: string,
  newReactionRank: number
) =>
  axios.post<{
    itemId: string
    userId: string
    orderId: string
    newReactionRank: number
  }>(
    '/api/orders/reaction',
    { orderId, itemId, newReactionRank },
    { headers: authHeader() }
  )

export const getUserFeed = () =>
  axios.get<FeedPost[]>('/api/feeds/user-feed', { headers: authHeader() })

export const getTrendingDishes = (lat: number, lon: number, day: number) =>
  axios.get<TrendingDishes>(
    `/api/feeds/trending-nearby-dow/${lat}/${lon}/${day}`,
    { headers: authHeader() }
  )

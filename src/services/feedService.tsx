import axios from 'axios'
import { authHeader } from './authService'

export const submitReaction = (
  orderId: string,
  itemId: string,
  newReactionRank: number
) =>
  axios.post(
    '/api/orders/reaction',
    { orderId, itemId, newReactionRank },
    { headers: authHeader() }
  )

export const getUserFeed = () =>
  axios.get<FeedPost[]>('/api/feeds/user-feed', { headers: authHeader() })

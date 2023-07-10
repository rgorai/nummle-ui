import axios from 'axios'
import { authHeader } from './authService'

export const submitReaction = (
  orderId: string,
  itemId: string,
  newReaction: string
) =>
  axios.post(
    '/api/orders/reaction',
    { orderId, itemId, newReaction },
    { headers: authHeader() }
  )

export const getUserFeed = () =>
  axios.get<FeedPost[]>('/api/users/feed', { headers: authHeader() })

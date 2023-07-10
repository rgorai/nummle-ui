import axios from 'axios'
import { authHeader } from './authService'

export const getCurrUserProfile = () =>
  axios.get<UserProfilePrivate>('/api/auth/profile', { headers: authHeader() })

export const updateUserProfile = (userData: UserProfilePrivate) =>
  axios.put('/api/auth/profile', userData, { headers: authHeader() })

export const getPublicUserProfile = (username: string) =>
  axios.get<UserProfilePublic>(`/api/users/profile/${username}`)

export const getCurrUserOrderHistory = () =>
  axios.get<Order[]>('/api/orders/history', { headers: authHeader() })

export const getPublicOrderHistory = (userId: string) =>
  axios.get<OrderPublic[]>(`/api/orders/public/${userId}`)

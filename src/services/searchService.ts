import axios from 'axios'
import { authHeader } from './authService'

export const searchRestaurants = (address: string) =>
  axios.get(`/api/restaurants/${encodeURIComponent(address)}`)

export const getRestaurantDetails = (restaurantId: string) =>
  axios.get<TomTomApiObject>(`/api/restaurants/details/${restaurantId}`)

export const getMenuItemReactions = (restaurantId: string) =>
  axios.get<MenuReactions>(`/api/restaurants/menuReactions/${restaurantId}`, {
    headers: authHeader(),
  })

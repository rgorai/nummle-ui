import axios from 'axios'

export const searchRestaurants = (address: string) =>
  axios.get(`/api/restaurants/${encodeURIComponent(address)}`)

export const getRestaurantDetails = (restaurantId: string) =>
  axios.get(`/api/restaurants/details/${restaurantId}`)

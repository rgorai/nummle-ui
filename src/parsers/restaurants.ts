import { dummyMenu } from '../tson/menuDummyData'

export const parseTomTomRestaurant = (
  details: TomTomApiObject
): RestaurantPage => ({
  id: details.id,
  name: details.poi.name,
  ogImage: details.restaurantOgData?.ogImage,
  websiteUrl: details.poi.url,
  freeFormAddress: details.address.freeformAddress,
  phoneNumber: details.poi.phone,
  // TODO: REPLACE DUMMY ITEMS DATA
  menu: dummyMenu,
})

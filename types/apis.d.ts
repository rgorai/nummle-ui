type OgImageObject = { url: string }

type OgImage = OgImageObject[] | OgImageObject | undefined

type TomTomApiObject = {
  id: string
  poi: {
    name: string
    url: string | undefined
    phone: string
  }
  address: {
    freeformAddress: string
  }
  restaurantOgData: { ogImage: OgImage } | null
} & { [key: string]: any }

type ApiOrder = {
  _id: string
  userId: string
  username: string
  userProfileImage: string | null
  restaurant: {
    id: string
    name: string
    ogImage: OgImage
    address: string
    coordinates: {
      lat: number
      lon: number
    }
  }
  deliveryAddress: string | null
  createdAt: Date
  updatedAt: Date
  items: Item[]
  cost: {
    subtotal: number
    tax: number
    serviceFee: number
    tip: number
    total: number
  }
  status: 'Placed' | 'Confirmed' | 'In Progress' | 'Complete' | 'Cancelled'
}

type ApiOrderPublic = Omit<ApiOrder, 'cost' | 'status'>

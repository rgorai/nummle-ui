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

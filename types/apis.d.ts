type OgImageObject = { url: string }

type OgImage = OgImageObject[] | OgImageObject | undefined

type TomTomApiObject = {
  id: string
  poi: {
    name: string
    url: string | undefined
  }
  restaurantOgData: { ogImage: OgImage }
} & { [key: string]: any }

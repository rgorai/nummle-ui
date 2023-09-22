import { NO_IMAGE_FOUND } from '../../../utils/env'
import NummleImage from '../../Main/components/NummleImage'

type Props = {
  className?: string
  restaurantName: string
  ogImage: OgImage
}

// TODO: move blacklist processing to server-side
const IMAGE_BLACKLIST: string[] = [
  // Stack's Pancake House & Cafe
  'https://stacksofhoboken.com/wp-content/uploads/2020/06/stacksofhoboken.png',
]

const RestaurantImage = ({ className, ogImage, restaurantName }: Props) => {
  const imageSrc = ogImage
    ? Array.isArray(ogImage)
      ? ogImage[0].url
      : ogImage.url
    : NO_IMAGE_FOUND

  return (
    <NummleImage
      className={className}
      src={IMAGE_BLACKLIST.includes(imageSrc) ? NO_IMAGE_FOUND : imageSrc}
      alt={restaurantName}
    />
  )
}

export default RestaurantImage

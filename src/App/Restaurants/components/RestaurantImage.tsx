import { useState } from 'react'
import cx from 'classnames'
import { NO_IMAGE_FOUND } from '../../../utils/env'
import styles from '../styles/restaurantImage.module.scss'

type Props = {
  className?: string
  restaurantName: string
  ogImage: OgImage
}

// TODO: move blacklist processing to server-side
const IMAGE_BLACKLIST = [
  // Stack's Pancake House & Cafe
  'https://stacksofhoboken.com/wp-content/uploads/2020/06/stacksofhoboken.png',
]

const RestaurantImage = ({ className, ogImage, restaurantName }: Props) => {
  const [imageSrc, setImageSrc] = useState(
    ogImage
      ? Array.isArray(ogImage)
        ? ogImage[0].url
        : ogImage.url
      : NO_IMAGE_FOUND
  )

  return (
    <img
      className={cx(styles.image, className)}
      src={IMAGE_BLACKLIST.includes(imageSrc) ? NO_IMAGE_FOUND : imageSrc}
      alt={restaurantName}
      onError={() => setImageSrc(NO_IMAGE_FOUND)}
    />
  )
}

export default RestaurantImage

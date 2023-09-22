import { useState } from 'react'
import cx from 'classnames'
import { NO_IMAGE_FOUND, NO_PROFILE_IMAGE } from '../../../utils/env'
import styles from '../styles/nummleImage.module.scss'

type Props = {
  src: string | null | undefined
  alt: string
  className?: string
  isProfileImage?: true
}

const NummleImage = (props: Props) => {
  const emptyImage = props.isProfileImage ? NO_PROFILE_IMAGE : NO_IMAGE_FOUND
  const [imageSrc, setImageSrc] = useState(props.src ?? emptyImage)

  return (
    <img
      className={cx(styles.image, props.className)}
      src={imageSrc}
      alt={props.alt}
      onError={() => setImageSrc(emptyImage)}
    />
  )
}

export default NummleImage

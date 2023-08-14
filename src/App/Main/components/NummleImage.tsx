import { useState } from 'react'
import cx from 'classnames'
import { NO_IMAGE_FOUND } from '../../../utils/env'
import styles from '../styles/nummleImage.module.scss'

type Props = {
  src: string | null | undefined
  alt: string
  className?: string
}

const NummleImage = (props: Props) => {
  const [imageSrc, setImageSrc] = useState(props.src ?? NO_IMAGE_FOUND)

  return (
    <img
      className={cx(styles.image, props.className)}
      src={imageSrc}
      alt={props.alt}
      onError={() => setImageSrc(NO_IMAGE_FOUND)}
    />
  )
}

export default NummleImage

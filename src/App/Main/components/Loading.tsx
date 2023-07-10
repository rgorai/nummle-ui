import Spinner from 'react-bootstrap/esm/Spinner'
import cx from 'classnames'
import styles from '../styles/loading.module.scss'

type Props = {
  size?: number
  color?: string
  button?: true
  modal?: true
}

const Loading = ({ size, color, button, modal }: Props) => {
  return button ? (
    <Spinner as="span" size="sm" role="status" />
  ) : (
    <div className={cx(styles.loadContainer, { [styles.modal]: modal })}>
      <span
        className={styles.spinner}
        style={{
          ...(size
            ? {
                width: `${size / 2}rem`,
                height: `${size / 2}rem`,
                borderWidth: `${size}px`,
              }
            : {}),
          ...(color ? { borderColor: color } : {}),
        }}
      />
    </div>
  )
}

export default Loading

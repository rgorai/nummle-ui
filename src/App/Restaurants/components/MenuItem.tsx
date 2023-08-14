import NummleImage from '../../Main/components/NummleImage'
import styles from '../styles/menuItem.module.scss'

type Props = {
  info: MenuItem
  reactions: MenuItemReactions
}

const MenuItem = (props: MenuItem) => {
  return (
    <div className={styles.container}>
      <div className={styles.price}>{`$${props.price}`}</div>

      <NummleImage
        className={styles.image}
        src={props.imagePath}
        alt={props.name}
      />

      <div className={styles.infoContainer}>
        <div className={styles.details}>
          <div className={styles.name}>{props.name}</div>
          {props.description && (
            <div className="text-muted">{props.description}</div>
          )}
        </div>

        <div className={styles.reactions}></div>
      </div>
    </div>
  )
}

export default MenuItem

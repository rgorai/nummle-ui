import cx from 'classnames'
import NummleImage from '../../Main/components/NummleImage'
import ReactionBox from '../../User/components/ReactionBox'
import styles from '../styles/menuItem.module.scss'

type Props = {
  info: MenuItem
  reactions: MenuItemReactions | null
}

const MenuItem = ({ info, reactions }: Props) => (
  <div className={styles.container}>
    <div className={styles.price}>{`$${info.price}`}</div>

    <NummleImage
      className={styles.image}
      src={info.imagePath}
      alt={info.name}
    />

    <div className={styles.infoContainer}>
      <div className={styles.details}>
        <div className={styles.name}>{info.name}</div>
        {info.description && (
          <div className={cx(styles.description, 'text-muted')}>
            {info.description}
          </div>
        )}
      </div>

      {reactions && (
        <div className={styles.reactions}>
          {Object.entries(reactions).map(([itemId, users]) => (
            <div className={styles.reactionBox}>
              <ReactionBox
                className={styles.reaction}
                showCurrOnly
                reactionRank={Number(itemId)}
                tense="present"
              />

              <span className={styles.numUsers}>{users.length}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)

export default MenuItem

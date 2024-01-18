import cx from 'classnames'
import NummleImage from '../../Main/components/NummleImage'
import ReactionBox from '../../User/components/ReactionBox'
import styles from '../styles/menuItem.module.scss'

type Props = {
  info: MenuListItem
  reactions: MenuItemReactions | null
}

const MenuListItem = ({ info, reactions }: Props) => (
  <div id={info.id} className={styles.container}>
    <div className={styles.price}>{`$${info.price}`}</div>

    <NummleImage
      className={styles.image}
      src={info.imagePath}
      alt={info.name}
    />

    <div className={styles.infoContainer}>
      <div className={styles.details}>
        <div className={styles.name}>{info.name}</div>
        {info.ingredients && (
          <div className={cx(styles.description, 'text-muted')}> 
            Made with {info.ingredients}
          </div>
        )}
        {info.allergens && (
          <div className={cx(styles.description, 'text-muted')}> 
            Allergens: {info.allergens}
          </div>
        )}
        {info.description && (
          <div className={cx(styles.description, 'text-muted')}>
            {info.description}
          </div>
        )}
      </div>

      {/* {(() => {
        console.log('THIS', reactions)
        return null
      })()} */}

      {reactions && (
        <div className={styles.reactions}>
          {Object.entries(reactions).map(([itemId, users]) => (
            <div className={styles.reactionBox} key={itemId}>
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

export default MenuListItem

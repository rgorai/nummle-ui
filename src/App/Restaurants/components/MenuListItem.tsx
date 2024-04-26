import cx from 'classnames'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'
import Tooltip from 'react-bootstrap/esm/Tooltip'
import NummleImage from '../../Main/components/NummleImage'
import ReactionBox from '../../User/components/ReactionBox'
import styles from '../styles/menuItem.module.scss'
import { useAppSelector } from '../../../state/hooks'
import { selectSessionData } from '../../../state/sessionDataSlice'
import { useAuthInfo } from '../../../state/authContext'

type Props = {
  info: MenuListItem
  reactions: MenuItemReactions | null
}

const MenuListItem = ({ info, reactions }: Props) => {
  const { authInfo } = useAuthInfo()
  const { loadedProfiles } = useAppSelector(selectSessionData)

  const currProfile = authInfo.authenticated
    ? loadedProfiles[authInfo.username]
    : undefined

  const containsAllergens = currProfile?.allergens.some((allergen) =>
    info.allergens?.includes(allergen)
  )

  return (
    <div
      id={info.id}
      className={cx(styles.container, {
        [styles.containsAllergens]: containsAllergens,
      })}
    >
      <div className={styles.price}>{`$${info.price}`}</div>

      <NummleImage
        className={styles.image}
        src={info.imagePath}
        alt={info.name}
      />

      <div className={styles.infoContainer}>
        <div className={styles.details}>
          <div className={styles.name}>
            {info.name}

            {containsAllergens && (
              <OverlayTrigger
                placement="top"
                offset={[0, 8]}
                overlay={
                  <Tooltip className={styles.allergenTooltip}>
                    {`This item contains the following allergens: ${info.allergens?.join(', ')}`}
                  </Tooltip>
                }
              >
                <ExclamationTriangleIcon />
              </OverlayTrigger>
            )}
          </div>

          {info.description && (
            <div className={cx(styles.description, 'text-muted')}>
              {info.description}
            </div>
          )}

          {/* {info.ingredients && (
          <div className={cx(styles.description, 'text-muted')}>
            {`Ingredients: ${info.ingredients.join(', ')}`}
          </div>
        )}

        {info.allergens && (
          <div className={cx(styles.description, 'text-muted')}>
            {`Allergens: ${info.allergens.join(', ')}`}
          </div>
        )} */}
        </div>

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
}

export default MenuListItem

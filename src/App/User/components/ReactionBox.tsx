import cx from 'classnames'
import ToggleButtonGroup from 'react-bootstrap/esm/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/esm/ToggleButton'
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger'
import Tooltip from 'react-bootstrap/esm/Tooltip'
import styles from '../styles/reactionBox.module.scss'
import { PUBLIC_URL } from '../../../utils/env'
import reactions from '../../../tson/reactions'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  updateReaction,
} from '../../../state/sessionDataSlice'
import { submitReaction } from '../../../services/feedService'

type Props =
  | {
      userId: string
      orderId: string
      itemId: string
    }
  | {
      showCurrOnly: true
      reaction: string | null
    }

const isCurrOnly = (props: any): props is { showCurrOnly: true } =>
  props.showCurrOnly !== undefined

const ReactionImage = (reaction: string | null, showCurrOnly: boolean) => (
  <OverlayTrigger
    placement="top"
    offset={[0, 8]}
    overlay={<Tooltip>{reaction ?? 'No reaction yet!'}</Tooltip>}
  >
    <img
      className={cx(styles.icon, { [styles.showCurrOnly]: showCurrOnly })}
      {...(reaction
        ? {
            src: `${PUBLIC_URL}/images/reactions/${reaction.toLowerCase()}.png`,
            alt: reaction,
          }
        : {
            src: `${PUBLIC_URL}/images/icons/thought-balloon.png`,
            alt: 'No reaction yet!',
          })}
    />
  </OverlayTrigger>
)

const ReactionBox = (props: Props) => {
  const { orderHistories } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()

  const reaction = isCurrOnly(props)
    ? props.reaction
    : orderHistories[props.userId].find((e) => e._id === props.orderId)?.items[
        props.itemId
      ].reaction

  const onReactionChange = (newReaction: string) => {
    if (reaction !== newReaction && !isCurrOnly(props))
      submitReaction(props.orderId, props.itemId, newReaction)
        .then(() => {
          dispatch(
            updateReaction([
              props.userId,
              props.orderId,
              props.itemId,
              newReaction,
            ])
          )
        })
        .catch(({ response }) =>
          console.error('submit reaction error', response)
        )
  }

  return (
    <div className={styles.reactionsWrapper}>
      {isCurrOnly(props) ? (
        <div>{ReactionImage(props.reaction, true)}</div>
      ) : (
        <>
          <ToggleButtonGroup
            className={cx(styles.reactionsContainer, {
              [styles.noReaction]: reaction === null,
            })}
            name="reactions"
            type="radio"
            value={reaction}
            onChange={onReactionChange}
          >
            {reactions.map((e) => (
              <ToggleButton
                id={`${props.orderId}-${props.itemId}-${e}`}
                className={cx(styles.iconContainer, {
                  [styles.active]: reaction === e,
                })}
                value={e}
                key={e}
              >
                {ReactionImage(e, false)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {!reaction && (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip className={styles.noReactionTooltip}>
                  {"You haven't reacted yet!"}
                </Tooltip>
              }
              offset={[0, 3]}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={cx(styles.alertIcon, 'bi bi-exclamation-circle')}
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
            </OverlayTrigger>
          )}
        </>
      )}
    </div>
  )
}

export default ReactionBox

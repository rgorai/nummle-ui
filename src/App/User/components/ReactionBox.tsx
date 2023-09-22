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

type Props = {
  tense: 'present' | 'past'
  className?: string
} & (
  | {
      userId: string
      orderId: string
      itemId: string
    }
  | {
      showCurrOnly: true
      reactionRank: number | null
    }
)

const isCurrOnly = (props: any): props is { showCurrOnly: true } =>
  props.showCurrOnly !== undefined

const ReactionBox = (props: Props) => {
  const { orderHistories } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()

  const ReactionImage = (
    reactionRank: number | null,
    showCurrOnly: boolean
  ) => (
    <OverlayTrigger
      placement="top"
      offset={[0, 8]}
      overlay={
        <Tooltip>
          {reactionRank !== null
            ? reactions[reactionRank][props.tense]
            : 'No reaction yet!'}
        </Tooltip>
      }
    >
      <img
        className={cx(styles.icon, { [styles.showCurrOnly]: showCurrOnly })}
        {...(reactionRank !== null
          ? {
              src: `${PUBLIC_URL}/images/reactions/${reactions[
                reactionRank
              ].present.toLowerCase()}.png`,
              alt: reactions[reactionRank].present,
            }
          : {
              src: `${PUBLIC_URL}/images/icons/thought-balloon.png`,
              alt: 'No reaction yet!',
            })}
      />
    </OverlayTrigger>
  )

  const reaction: ReactionOption | null = isCurrOnly(props)
    ? props.reactionRank
      ? reactions[props.reactionRank]
      : null
    : orderHistories[props.userId].find((e) => e._id === props.orderId)?.items[
        props.itemId
      ].reaction ?? null

  const onReactionChange = (newReactionRank: number) => {
    if (reaction?.rank !== newReactionRank && !isCurrOnly(props))
      submitReaction(props.orderId, props.itemId, newReactionRank)
        .then(({ data }) => {
          dispatch(
            updateReaction([
              data.userId,
              data.orderId,
              data.itemId,
              reactions[data.newReactionRank],
            ])
          )
        })
        .catch(({ response }) => {
          console.error('submit reaction error', response)
        })
  }

  return (
    <div className={cx(props.className, styles.reactionsWrapper)}>
      {isCurrOnly(props) ? (
        <div className={styles.currOnlyContainer}>
          {ReactionImage(props.reactionRank, true)}
        </div>
      ) : (
        <>
          <ToggleButtonGroup
            className={cx(styles.reactionsContainer, {
              [styles.noReaction]: reaction === null,
            })}
            name="reactions"
            type="radio"
            value={reaction?.rank}
            onChange={onReactionChange}
          >
            {reactions.map((e) => (
              <ToggleButton
                id={`${props.orderId}-${props.itemId}-${e.rank}`}
                className={cx(styles.iconContainer, {
                  [styles.active]: reaction?.rank === e.rank,
                })}
                value={e.rank}
                key={e.rank}
              >
                {ReactionImage(e.rank, false)}
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
              offset={[0, 8]}
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

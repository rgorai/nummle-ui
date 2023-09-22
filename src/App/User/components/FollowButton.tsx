import Button from 'react-bootstrap/esm/Button'
import { useCallback, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import Alert from 'react-bootstrap/esm/Alert'
import { useAuthInfo } from '../../../state/authContext'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  updateFollow,
} from '../../../state/sessionDataSlice'
import styles from '../styles/followButton.module.scss'
import { followUnfollowUser } from '../../../services/followsService'

type Props = {
  followUserId: string
  followUsername: string
}

const FollowButton = ({ followUserId, followUsername }: Props) => {
  const { authInfo } = useAuthInfo()
  const { userFollowings } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const isCurrUser = authInfo.authenticated && authInfo.user_id === followUserId
  const currUserFollowingList = authInfo.authenticated
    ? userFollowings[authInfo.user_id]
    : null
  const displayFollowing = !!currUserFollowingList?.find(
    (e) => e.userId === followUserId
  )

  const followUser = useCallback(
    (operation: 'follow' | 'unfollow', otherUserId: string) => {
      setFollowLoading(true)
      followUnfollowUser(operation, otherUserId)
        .then(({ data }) => {
          console.log(operation, 'request', data)
          dispatch(updateFollow([operation, ...data]))
        })
        .catch(({ response }) => {
          console.error('error', response)
          setError(true)
        })
        .then(() => setFollowLoading(false))
    },
    [dispatch]
  )

  const submitFollowUser = () => {
    if (authInfo.authenticated)
      followUser(displayFollowing ? 'unfollow' : 'follow', followUserId)
  }

  return isCurrUser ? null : (
    <>
      {error && (
        <Alert
          className="alert-snackbar"
          variant="danger"
          onClose={() => setError(false)}
          dismissible
        >
          There was an error {displayFollowing ? 'unfollowing' : 'following'}{' '}
          <strong>{followUsername}</strong>.
        </Alert>
      )}
      <Button
        className={styles.button}
        onClick={submitFollowUser}
        variant={displayFollowing ? 'secondary' : 'primary'}
        disabled={!currUserFollowingList || followLoading}
      >
        {currUserFollowingList ? (
          displayFollowing ? (
            'Following'
          ) : (
            'Follow'
          )
        ) : (
          <Spinner as="span" size="sm" />
        )}
      </Button>
    </>
  )
}

export default FollowButton

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

  const isCurrUser = authInfo.authenticated && authInfo.userId === followUserId
  const currUserFollowingList = authInfo.authenticated
    ? userFollowings[authInfo.userId]
    : null
  const displayFollowing = !!currUserFollowingList?.find(
    (e) => e.userId === followUserId
  )

  const followUser = useCallback(
    (operation: 'follow' | 'unfollow', userId: string, otherUserId: string) => {
      followUnfollowUser(operation, otherUserId)
        .then(({ data }) => {
          dispatch(updateFollow([operation, ...data]))
          console.log('follow request', data)
        })
        .catch(({ response }) => {
          setError(true)
          console.error('error', response)
        })
    },
    [dispatch]
  )

  const submitFollowUser = () => {
    if (authInfo.authenticated)
      followUser(
        displayFollowing ? 'unfollow' : 'follow',
        authInfo.userId,
        followUserId
      )
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
        disabled={!currUserFollowingList}
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

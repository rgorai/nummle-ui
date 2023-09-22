import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'
import { useCallback, useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import styles from '../styles/followsModal.module.scss'

import { capitalizeFirstLetter } from '../../../utils/strings'
import Loading from '../../Main/components/Loading'
import { useAuthInfo } from '../../../state/authContext'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  addFollowsData,
  selectSessionData,
} from '../../../state/sessionDataSlice'
import { getUserFollows } from '../../../services/followsService'
import UserListItem from './UserListItem'

type Props = {
  userId: string
  type: 'followers' | 'followings'
  amount: number
}

// TODO: if performance is slow, consider changing
// follows load to commence on button click, and maybe
// even staggering number of follows loaded at a time

const FollowsModal = (props: Props) => {
  const { authInfo } = useAuthInfo()
  const { userFollowers, userFollowings } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)

  const currFollows: Follow[] | undefined =
    props.type === 'followers'
      ? userFollowers[props.userId]
      : userFollowings[props.userId]

  const getFollows = useCallback(
    (userId: string, type: 'followers' | 'followings') => {
      getUserFollows(userId, type)
        .then(({ data }) => {
          dispatch(addFollowsData([type, userId, data]))
        })
        .catch(({ response }) => {
          console.error(type, 'error', response)
        })
    },
    [dispatch]
  )

  useEffect(() => {
    if (
      !currFollows &&
      !(
        authInfo.authenticated &&
        authInfo.user_id === props.userId &&
        props.type === 'followings'
      )
    )
      getFollows(props.userId, props.type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authInfo.authenticated,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (authInfo as Authenticated).user_id,
    currFollows,
    getFollows,
    props.type,
    props.userId,
  ])

  useEffect(() => setShowModal(false), [props.userId])

  return (
    <div>
      <Button variant="secondary-light" onClick={() => setShowModal(true)}>
        <strong>{props.amount}</strong> {props.type}
      </Button>

      <Modal
        className={styles.modalContainer}
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{capitalizeFirstLetter(props.type)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.listContainer}>
            <ListGroup variant="flush">
              {currFollows?.map((e) => (
                <UserListItem
                  userId={e.userId}
                  username={e.username}
                  fullName={e.fullName}
                  key={e.userId}
                />
              )) ?? <Loading modal />}
            </ListGroup>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FollowsModal

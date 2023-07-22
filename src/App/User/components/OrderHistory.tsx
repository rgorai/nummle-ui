import { useCallback, useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/esm/ListGroup'
import PageLoader from '../../../Wrappers/PageLoader'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  addOrderHistory,
} from '../../../state/sessionDataSlice'
import {
  getCurrUserOrderHistory,
  getPublicOrderHistory,
} from '../../../services/userService'
import styles from '../styles/orderHistory.module.scss'
import { useAuthInfo } from '../../../state/authContext'
import OrderListItem from './OrderListItem'

// TODO: ADD PROP FOR PUBLIC/PRIVATE

type Props = {
  userId: string
}

const OrderHistory = ({ userId }: Props) => {
  const { authInfo } = useAuthInfo()
  const { orderHistories } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)

  const currOrder = orderHistories[userId] ?? null
  const isCurrUser = authInfo.authenticated && authInfo.user_id === userId

  const getOrderHistory = useCallback(
    (currUser: boolean) => {
      ;(currUser ? getCurrUserOrderHistory() : getPublicOrderHistory(userId))
        .then(({ data }) => {
          dispatch(addOrderHistory([userId, data]))
          console.log('order history', data)
        })
        .catch(({ response }) => {
          setPageError(response)
          console.error('get order history error', response)
        })
        .then(() => setLoading(false))
    },
    [dispatch, userId]
  )

  useEffect(() => {
    if (!currOrder) getOrderHistory(isCurrUser)
  }, [currOrder, getOrderHistory, isCurrUser])

  return (
    <PageLoader loading={loading} error={pageError} pageData={currOrder}>
      {(pageData) => (
        <div className={styles.historyContainer}>
          <ListGroup variant="flush">
            {pageData.map((e) => (
              <OrderListItem
                userId={userId}
                showCost={isCurrUser as any}
                orderDetails={e}
                key={e._id}
              />
            ))}
          </ListGroup>
        </div>
      )}
    </PageLoader>
  )
}

export default OrderHistory

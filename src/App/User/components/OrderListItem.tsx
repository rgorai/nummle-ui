import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import Button from 'react-bootstrap/esm/Button'
import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import RestaurantImage from '../../Restaurants/components/RestaurantImage'
import styles from '../styles/orderListItem.module.scss'
import { useAuthInfo } from '../../../state/authContext'
import ReactionBox from './ReactionBox'

type Props<T extends boolean> = { userId: string } & (T extends true
  ? {
      showCost: T
      orderDetails: Order
    }
  : {
      showCost?: T
      orderDetails: OrderPublic
    })

const OrderListItem = ({
  userId,
  showCost,
  orderDetails,
}: Props<true> | Props<false>) => {
  const { authInfo } = useAuthInfo()
  const isCurrUser = authInfo.authenticated && authInfo.user_id === userId
  return (
    <ListGroupItem>
      <div className={styles.orderItemContainer}>
        <div className={styles.imageContainer}>
          <RestaurantImage
            className={styles.orderImage}
            restaurantName={orderDetails.restaurant.name}
            ogImage={orderDetails.restaurant.ogImage}
          />
        </div>

        <div className={styles.infoContainer}>
          <h3>{orderDetails.restaurant.name}</h3>

          {showCost && (
            <div className="text-muted">
              {`${Object.entries(orderDetails.items).reduce(
                (p, [_, c]) => p + c.quantity,
                0
              )} items for $${orderDetails.cost.total.toFixed(2)} • ${new Date(
                orderDetails.createdAt
              ).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}`}
            </div>
          )}

          <Container className={styles.itemListContainer}>
            {Object.entries(orderDetails.items)
              .sort((a, b) => b[1].price - a[1].price)
              .map(([k, v]) => (
                <Row key={k}>
                  <Col md={2} lg={1}>
                    <div className={styles.quantity}>{v.quantity}</div>
                  </Col>
                  <Col className={styles.name} md={4} lg={5}>
                    {v.name}
                  </Col>
                  <Col className={styles.reactionsContainer} lg={5}>
                    {isCurrUser ? (
                      <ReactionBox
                        userId={userId}
                        orderId={orderDetails._id}
                        itemId={k}
                        tense="present"
                      />
                    ) : (
                      <ReactionBox
                        showCurrOnly={!isCurrUser}
                        reactionRank={v.reaction?.rank ?? null}
                        tense="past"
                      />
                    )}
                  </Col>
                </Row>
              ))}
          </Container>
        </div>

        <Stack className={styles.buttonContainer} gap={2}>
          <Button size="lg">{isCurrUser ? 'Reorder' : 'Clone Order'}</Button>
          <Link
            className="btn btn-lg btn-outline-secondary-dark"
            to={`/restaurants/${orderDetails.restaurant.id}`}
            // size="lg"
            // variant="outline-secondary-dark"
          >
            Visit Store
          </Link>
        </Stack>
      </div>
    </ListGroupItem>
  )
}

export default OrderListItem

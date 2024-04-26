import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/trendingPane.module.scss'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  setTrendingDishes,
} from '../../../state/sessionDataSlice'
import { getTrendingDishes } from '../../../services/feedService'

// TODO: GET CLIENT LOCATION ON LOGIN INSTEAD OF RESTAURANT SEARCH

const CURR_DAY = new Date().getDay()
const CURR_DAY_STR = new Date().toLocaleString('en-US', { weekday: 'long' })

const TrendingDishItem = ({ itemInfo }: { itemInfo: TrendingDish }) => {
  return (
    <Link
      className={styles.itemContainer}
      to={`/restaurants/${itemInfo.restaurantId}#${itemInfo.itemId}`}
    >
      <div>{itemInfo.itemName}</div>
      <em>{itemInfo.restauranName}</em>
    </Link>
  )
}

const TrendingPane = () => {
  const { trendingDishes, clientLocation } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!trendingDishes && clientLocation)
      getTrendingDishes(
        clientLocation.latitude,
        clientLocation.longitude,
        CURR_DAY
      )
        .then(({ data }) => dispatch(setTrendingDishes(data)))
        .catch(({ response }) =>
          console.error('get trending dishes error', response)
        )
  }, [clientLocation, dispatch, trendingDishes])

  const trendingTypes: { name: string; key: keyof TrendingDishes }[] = [
    { name: 'Friends', key: 'followingsOrdersSorted' },
    { name: 'Everyone', key: 'allOrdersSorted' },
  ]

  return (
    <div className={styles.container}>
      <h1>Trending on {CURR_DAY_STR}s</h1>

      {clientLocation ? (
        trendingTypes.map((e, i) => (
          <Fragment key={i}>
            <h2>{e.name}</h2>
            <div className={styles.itemsContainer}>
              {trendingDishes?.[e.key].map((dish, j) => (
                <TrendingDishItem itemInfo={dish} key={j} />
              ))}
            </div>
          </Fragment>
        ))
      ) : (
        <div className="mt-4" style={{ fontStyle: 'italic' }}>
          No location provided.
        </div>
      )}
    </div>
  )
}

export default TrendingPane

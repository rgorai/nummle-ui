import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRestaurantDetails } from '../../../services/searchService'
import { setDocumentTitle } from '../../../utils/misc'
import styles from '../styles/restaurantDetails.module.scss'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  addLoadedRestaurant,
  selectSessionData,
} from '../../../state/sessionDataSlice'
import RestaurantImage from './RestaurantImage'

// TODO: RETEST EVERYTHING AFTER IMPLEMENTING SEARCH FOR INDIVIDUAL RESTAURANT

const RestaurantDetails = () => {
  const { loadedRestaurants } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const { restaurantId } = useParams()

  const currRestaurant = restaurantId ? loadedRestaurants[restaurantId] : null

  // useEffect(() => {
  //   console.log('clientInfo', store.clientInfo)
  // }, [store.clientInfo])

  useEffect(() => {
    if (currRestaurant) setDocumentTitle(currRestaurant.poi.name, 'Details')
    console.log('currRestaurant', currRestaurant)
  }, [currRestaurant])

  useEffect(() => {
    if (restaurantId && !currRestaurant)
      getRestaurantDetails(restaurantId)
        .then(({ data }) => {
          console.log('details', data)
          dispatch(addLoadedRestaurant(data))
        })
        .catch(({ response }) => {
          console.error('get details error', response)
        })
  }, [currRestaurant, dispatch, restaurantId])

  return !currRestaurant ? (
    <div>Loading</div>
  ) : (
    <div className={styles.detailsContainer}>
      <RestaurantImage
        restaurantName={currRestaurant.poi.name}
        ogImage={currRestaurant.restaurantOgData?.ogImage}
      />

      <h1>{currRestaurant.poi.name}</h1>
    </div>
  )
}

export default RestaurantDetails

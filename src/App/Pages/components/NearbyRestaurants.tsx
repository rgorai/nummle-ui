import { useCallback, useEffect, useState } from 'react'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'
import { searchRestaurants } from '../../../services/searchService'
import styles from '../styles/explorePage.module.scss'
import RestaurantCard from '../../Restaurants/components/RestaurantCard'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  setClientLocation,
  setNearbyRestaurants,
} from '../../../state/sessionDataSlice'
import PageLoader from '../../../Wrappers/PageLoader'

const NearbyRestaurants = () => {
  const { clientLocation, nearbyRestaurants } =
    useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()

  const [address, setAddress] = useState(clientLocation?.address ?? '')
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)

  const searchDisabled = address.trim().length === 0
  // ||
  // address.trim().toLowerCase() ===
  //   clientLocation?.address.trim().toLowerCase()

  const getNearbyRestaurants = useCallback(() => {
    setLoading(true)
    searchRestaurants(address)
      .then(
        ({
          data: { latitude, longitude, results },
        }: {
          data: {
            latitude: number
            longitude: number
            results: TomTomApiObject[]
          }
        }) => {
          dispatch(setClientLocation({ latitude, longitude, address }))
          dispatch(setNearbyRestaurants(results))
        }
      )
      .catch(({ response }) => {
        setPageError(response)
        console.error('get restaurants error', response.data)
        // prompt user to try refreshing page
      })
      .then(() => setLoading(false))
  }, [address, dispatch])

  const onAddressSubmit = (ev: any) => {
    ev.preventDefault()
    if (!searchDisabled) getNearbyRestaurants()
  }

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.formContainer}>
        <Form
          id="nearby-search-form"
          className={styles.searchForm}
          onSubmit={onAddressSubmit}
        >
          {/* <FloatingLabel label="Address" controlId="search-input"> */}
          <Form.Control
            placeholder="Enter your address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          {/* </FloatingLabel> */}

          <Button
            type="submit"
            form="nearby-search-form"
            disabled={searchDisabled}
          >
            Search
          </Button>
        </Form>
      </div>

      <PageLoader
        loading={loading}
        error={pageError}
        pageData={nearbyRestaurants}
      >
        {(pageData) => (
          <div className={styles.resultsContainer}>
            <h1>Nearby Restaurants</h1>

            <div className={styles.cardListContainer}>
              {pageData.map((e, i) => (
                <div
                  className={styles.restaurantCardWrapper}
                  key={`${e.poi.name}-${i}`}
                >
                  <RestaurantCard restaurantDetails={e} />
                </div>
              ))}
            </div>
          </div>
        )}
      </PageLoader>
    </div>
  )
}

export default NearbyRestaurants

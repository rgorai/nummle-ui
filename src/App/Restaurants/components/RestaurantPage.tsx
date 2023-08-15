import { Fragment, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { useQueryState } from 'react-router-use-location-state'
import {
  getMenuItemReactions,
  getRestaurantDetails,
} from '../../../services/searchService'
import { setDocumentTitle } from '../../../utils/misc'
import styles from '../styles/restaurantPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  addLoadedRestaurant,
  selectSessionData,
} from '../../../state/sessionDataSlice'
import PageLoader from '../../../Wrappers/PageLoader'
import { parseTomTomRestaurant } from '../../../parsers/restaurants'
import { transformTomTomPhoneNumber } from '../../../utils/strings'
import RestaurantImage from './RestaurantImage'
import MenuItem from './MenuItem'

// TODO: RETEST EVERYTHING AFTER IMPLEMENTING SEARCH FOR INDIVIDUAL RESTAURANT

const RestaurantPage = () => {
  const { loadedRestaurants } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const { restaurantId } = useParams()
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)
  const [currMenuCategory, setCurrMenuCategory] = useQueryState<
    string | undefined
  >('currCat', '')

  const currRestaurant = restaurantId ? loadedRestaurants[restaurantId] : null

  const callApis = useCallback(
    async (_restaurantId: string) => {
      setLoading(true)

      try {
        const { data: details } = await getRestaurantDetails(_restaurantId)

        let reactions: MenuReactions | null
        try {
          const { data: reactionsData } = await getMenuItemReactions(
            _restaurantId
          )
          reactions = reactionsData
        } catch (err) {
          reactions = null
        }

        dispatch(
          addLoadedRestaurant({
            ...parseTomTomRestaurant(details),
            menuReactions: reactions,
          })
        )
      } catch (err: any) {
        console.error('get details error', err.response)
        setPageError(err.response)
      }

      setLoading(false)
    },
    [dispatch]
  )

  useEffect(() => {
    if (currRestaurant) setDocumentTitle(currRestaurant.name)
  }, [currRestaurant])

  useEffect(() => {
    if (restaurantId && !currRestaurant) callApis(restaurantId)
  }, [callApis, currRestaurant, restaurantId])

  return (
    <PageLoader loading={loading} error={pageError} pageData={currRestaurant}>
      {(pageData) => (
        <div className={styles.pageContainer}>
          <div className={styles.headerContainer}>
            <RestaurantImage
              className={styles.restaurantImage}
              restaurantName={pageData.name}
              ogImage={pageData.ogImage}
            />

            <div className={styles.detailsContainer}>
              <h1>{pageData.name}</h1>
              <div className="text-muted">{`${pageData.freeFormAddress}${
                pageData.phoneNumber
                  ? ` • ${transformTomTomPhoneNumber(pageData.phoneNumber)}`
                  : ''
              }`}</div>
            </div>
          </div>

          <div className={styles.menuContainer}>
            <div className={styles.sidebar}>
              {pageData.menu.map((e) => (
                <div
                  className={cx('text-muted', styles.sidebarLink)}
                  key={e.categoryName}
                >
                  {e.categoryName}
                </div>
              ))}
            </div>

            <div className={styles.items}>
              {pageData.menu.map((e) => (
                <div className={styles.categoryContainer} key={e.categoryName}>
                  <h2>{e.categoryName}</h2>
                  <div className={styles.itemsContainer}>
                    {e.items.map((item) => (
                      <MenuItem
                        info={item}
                        reactions={pageData.menuReactions?.[item.id] ?? null}
                        key={item.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLoader>
  )
}

export default RestaurantPage

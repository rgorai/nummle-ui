import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cx from 'classnames'
import { useQueryState } from 'react-router-use-location-state'
import {
  getMenuItemReactions,
  getRestaurantDetails,
} from '../../../services/searchService'
import styles from '../styles/restaurantPage.module.scss'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  addLoadedRestaurant,
  selectSessionData,
} from '../../../state/sessionDataSlice'
import PageLoader from '../../../Wrappers/PageLoader'
import { parseTomTomRestaurant } from '../../../parsers/restaurants'
import {
  setDocumentTitle,
  transformTomTomPhoneNumber,
} from '../../../utils/strings'
import RestaurantImage from './RestaurantImage'
import MenuListItem from './MenuListItem'

// TODO: RETEST EVERYTHING AFTER IMPLEMENTING SEARCH FOR INDIVIDUAL RESTAURANT

const RestaurantPage = () => {
  const { loadedRestaurants } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const { restaurantId } = useParams()
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)
  const [scrollTo, setScrollTo] = useQueryState<string | undefined>(
    'scrollTo',
    'hello'
  )
  const navigate = useNavigate()

  const currRestaurant = restaurantId ? loadedRestaurants[restaurantId] : null

  const callApis = useCallback(
    async (_restaurantId: string) => {
      setLoading(true)

      try {
        const { data: details } = await getRestaurantDetails(_restaurantId)

        let reactions: MenuReactions | null
        try {
          const { data: reactionsData } =
            await getMenuItemReactions(_restaurantId)
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
              <div className="text-muted">
                {`${pageData.freeFormAddress}${
                  pageData.phoneNumber
                    ? ` • ${transformTomTomPhoneNumber(pageData.phoneNumber)}`
                    : ''
                }`}
              </div>
            </div>
          </div>

          <div className={styles.menuContainer}>
            <nav className={styles.sidebar}>
              <ul>
                {pageData.menu.map((e) => (
                  <li
                    className={cx('text-muted', styles.sidebarLink)}
                    onClick={() => {
                      // navigate(`#${encodeURIComponent(e.categoryName)}`)
                      setScrollTo(encodeURIComponent(e.categoryName))
                      console.log('clicked', encodeURIComponent(e.categoryName))
                    }}
                    key={e.categoryName}
                  >
                    {e.categoryName}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.items}>
              {pageData.menu.map((e) => (
                <section
                  id={e.categoryName}
                  className={styles.categoryContainer}
                  key={e.categoryName}
                >
                  <h2>{e.categoryName}</h2>
                  <div className={styles.itemsContainer}>
                    {e.items.map((item) => (
                      <MenuListItem
                        info={item}
                        reactions={pageData.menuReactions?.[item.id] ?? null}
                        key={item.id}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLoader>
  )
}

export default RestaurantPage

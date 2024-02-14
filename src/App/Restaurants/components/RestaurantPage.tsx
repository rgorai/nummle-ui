import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cx from 'classnames'
import { useQueryState } from 'react-router-use-location-state'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
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
import NummleImage from '../../Main/components/NummleImage'
import RestaurantImage from './RestaurantImage'
import MenuListItem from './MenuListItem'

// TODO: RETEST EVERYTHING AFTER IMPLEMENTING SEARCH FOR INDIVIDUAL RESTAURANT

// TODO: add quantity UI/UX in menu item modal

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
  const [currSelectedMenuItem, setCurrSelectedMenuListItem] =
    useState<MenuListItem | null>(null)

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
        <>
          <Modal
            className={styles.modalContainer}
            show={!!currSelectedMenuItem}
            onHide={() => setCurrSelectedMenuListItem(null)}
            centered
          >
            {currSelectedMenuItem && (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{currSelectedMenuItem.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className={styles.listContainer}>
                    <NummleImage
                      className={styles.modalImage}
                      src={currSelectedMenuItem.imagePath}
                      alt={currSelectedMenuItem.name}
                    />

                    <div className={styles.modalBody}>
                      {currSelectedMenuItem.description && (
                        <div className="mt-2 mb-4">
                          {currSelectedMenuItem.description}
                        </div>
                      )}

                      <div className="mb-2">
                        <strong>{`Ingredients: `}</strong>
                        {currSelectedMenuItem.ingredients?.join(', ') ??
                          'Not provided'}
                      </div>

                      <div>
                        <strong>{`Allergens: `}</strong>
                        {currSelectedMenuItem.allergens?.join(', ') ??
                          'Not provided'}
                      </div>
                    </div>

                    <div className={styles.cartButtonContainer}>
                      <div>{`$${currSelectedMenuItem.price}`}</div>

                      <Button
                        onClick={() => {
                          alert(`Added ${currSelectedMenuItem.name} to cart`)
                          setCurrSelectedMenuListItem(null)
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </>
            )}
          </Modal>

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
                  {pageData.menu.map((category) => (
                    <li
                      className={cx('text-muted', styles.sidebarLink)}
                      onClick={() => {
                        // navigate(`#${encodeURIComponent(e.categoryName)}`)
                        setScrollTo(encodeURIComponent(category.categoryName))
                        console.log(
                          'clicked',
                          encodeURIComponent(category.categoryName)
                        )
                      }}
                      key={category.categoryName}
                    >
                      {category.categoryName}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className={styles.items}>
                {pageData.menu.map((category) => (
                  <section
                    id={category.categoryName}
                    className={styles.categoryContainer}
                    key={category.categoryName}
                  >
                    <h2>{category.categoryName}</h2>

                    <div className={styles.itemsContainer}>
                      {category.items.map((item) => (
                        <div
                          onClick={() => setCurrSelectedMenuListItem(item)}
                          key={item.id}
                        >
                          <MenuListItem
                            info={item}
                            reactions={
                              pageData.menuReactions?.[item.id] ?? null
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </PageLoader>
  )
}

export default RestaurantPage

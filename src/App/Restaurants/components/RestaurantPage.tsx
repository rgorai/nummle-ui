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
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'


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
  const [foodName, setFoodName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState("");
  const [cost, setCost] = useState(0);
  const [image, setImage] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // setFoodItem({})
    setFoodName("")
    setIngredients("")
    setAllergens("")
    setCost(0)
    setImage("")
  }, [])


  function setFood(data: MenuListItem){
    console.log(data)
    setFoodName(data.name)
    if(data.ingredients === undefined){
      setIngredients("N/A")
    }else{
      setIngredients(data.ingredients)
    }
    if(data.allergens === undefined){
      setAllergens("N/A")
    }else{
      setAllergens(data.allergens)
    }
    setCost(data.price)
    if(data.imagePath){
      setImage(data.imagePath)
    }
    setShowModal(true);
    
  }

  const navigate = useNavigate()

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
              {showModal && foodName && 
              <Modal
                className={styles.modalContainer}
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>{foodName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={styles.listContainer}>
                    {image && <img src={image} alt={foodName} width="200" height="200" className={styles.modalContainer} />}
                    <br/>
                    ${cost}
                    <br/>
                    Ingredients: {ingredients}
                    <br/>
                    Allergens: {allergens}
                    <br/>
                    <br/>
                    <Button onClick={()=>{
                      alert("Added to cart")
                      setShowModal(false)
                    }}>Add to Cart</Button>   
                  </div>
               
                </Modal.Body>
              </Modal>
              }

            <div className={styles.items}>
              {pageData.menu.map((e) => (
                <section
                  id={e.categoryName}
                  className={styles.categoryContainer}
                  key={e.categoryName}
                >
                  <h2>{e.categoryName}</h2>
                  <div className={styles.itemsContainer}>
                    {e.items.map((item, index) => (
                      <div onClick={()=>{setFood(e.items[index])}}>
                        <MenuListItem
                          info={item}
                          reactions={pageData.menuReactions?.[item.id] ?? null}
                          key={item.id}
                        />
                      </div>
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

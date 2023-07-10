import { Link } from 'react-router-dom'
import styles from '../styles/restaurantCard.module.scss'
import RestaurantImage from './RestaurantImage'

type Props = {
  restaurantDetails: any
  // setLoaded: (loaded: boolean) => void
}

const RestaurantCard = ({ restaurantDetails }: Props) => (
  <div className={styles.cardWrapper}>
    <Link
      className={styles.cardContainer}
      to={`/restaurants/${restaurantDetails.id}`}
    >
      <RestaurantImage
        className={styles.restaurantImage}
        restaurantName={restaurantDetails.poi.name}
        ogImage={restaurantDetails.restaurantOgData?.ogImage}
      />

      <div className={styles.infoContainer}>
        <div className={styles.restaurantName}>
          {restaurantDetails.poi.name}
        </div>
      </div>
    </Link>
  </div>
)

export default RestaurantCard

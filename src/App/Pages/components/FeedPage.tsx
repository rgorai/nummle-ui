import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/esm/Card'
import styles from '../styles/feedPage.module.scss'
import { getUserFeed } from '../../../services/feedService'
import PageLoader from '../../../Wrappers/PageLoader'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  selectSessionData,
  setFeedItems,
} from '../../../state/sessionDataSlice'
import RestaurantImage from '../../Restaurants/components/RestaurantImage'
import ReactionBox from '../../User/components/ReactionBox'
import TrendingPane from '../../Main/components/TrendingPane'

const FeedPage = () => {
  const { feedItems } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)

  useEffect(() => {
    if (feedItems.length === 0) {
      setLoading(true)
      getUserFeed()
        .then(({ data }) => {
          dispatch(setFeedItems(data))
        })
        .catch(({ response }) => {
          console.error('feed data error', response)
          setPageError(response)
        })
        .then(() => setLoading(false))
    }
  }, [dispatch, feedItems.length])

  return (
    <div className="pane-container">
      <PageLoader loading={loading} error={pageError} pageData={feedItems}>
        {(pageData) => (
          <div className={styles.feedContainer}>
            {pageData.map((post) => (
              // TODO: REFACTOR TO SEPARATE COMPONENT
              <Card className={styles.feedItemContainer} key={post._id}>
                <RestaurantImage
                  className={styles.restaurantImage}
                  ogImage={post.restaurantImage}
                  restaurantName={post.restaurantName}
                />
                <div className={styles.postHeading}>
                  <div>
                    <strong>{post.posterUsername}</strong> ordered at{' '}
                    <em>{post.restaurantName}</em>
                  </div>
                  <div className="mt-2 text-muted">
                    {new Date(post.updatedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className={styles.itemsContainer}>
                  {Object.entries(post.items).map(([k, v]) => (
                    <div className={styles.itemWrapper} key={k}>
                      <div>{v.name}</div>
                      <ReactionBox
                        tense="past"
                        reactionRank={v.reaction.rank}
                        showCurrOnly
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </PageLoader>

      <TrendingPane />
    </div>
  )
}

export default FeedPage

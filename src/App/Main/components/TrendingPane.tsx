import styles from '../styles/trendingPane.module.scss'

const TrendingPane = () => {
  const CURR_DAY = new Date().toLocaleString('en-US', { weekday: 'long' })

  return (
    <div className={styles.container}>
      <h1>Trending on {CURR_DAY}s</h1>

      <h2>Friends</h2>

      <h2>Everyone</h2>
    </div>
  )
}

export default TrendingPane

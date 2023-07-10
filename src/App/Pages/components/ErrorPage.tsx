import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import styles from '../styles/errorPage.module.scss'

const ErrorPage = (props: ServerError) => {
  const navigate = useNavigate()
  return (
    <div className={styles.pageContainer}>
      <span className={styles.goBack} onClick={() => navigate(-1)}>
        Go back
      </span>
      <div className={styles.errorContainer}>
        <div className={styles.errorStatus}>{props.status}</div>
        <div className={cx(styles.errorText, 'text-muted')}>
          {props.statusText}
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

import { APP_NAME } from '../../../utils/env'
import styles from '../styles/logo.module.scss'

const Logo = () => <div className={styles.logoContainer}>{APP_NAME}</div>

export default Logo

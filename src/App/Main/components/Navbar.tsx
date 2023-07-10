import { Link } from 'react-router-dom'
import styles from '../styles/navbar.module.scss'
import { useAuthInfo } from '../../../state/authContext'
import Logo from './Logo'

type Props = {
  appItems: AppContent
}

const Navbar = ({ appItems }: Props) => {
  const {
    authInfo: { authenticated },
  } = useAuthInfo()

  return (
    <nav className={styles.navWrapper}>
      <Link className={styles.logoWrapper} to="/">
        <Logo />
      </Link>

      <div className={styles.desktopNavContainer}>
        <ul>
          {appItems.map(
            (e) =>
              (authenticated === e.ensureAuthenticated ||
                e.ensureAuthenticated === null) &&
              e.displayOnNav && (
                <li className={styles.navLink} key={e.path}>
                  <Link to={e.path}>{e.label}</Link>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

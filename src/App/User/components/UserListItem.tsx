import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { NO_PROFILE_IMAGE } from '../../../utils/env'
import styles from '../styles/userListItem.module.scss'
import FollowButton from './FollowButton'

type Props = {
  userId: string
  username: string
  fullName: string
}

const UserListItem = ({ userId, username, fullName }: Props) => (
  <ListGroupItem>
    <div className={styles.itemContainer}>
      <Link className={styles.linkContainer} to={`/users/${username}`}>
        <img
          className={styles.profileImg}
          src={NO_PROFILE_IMAGE}
          alt={`${username} Profile Image`}
        />
        <div className={styles.nameContainer}>
          <div className={styles.username}>{username}</div>
          <div className={cx(styles.fullName, 'text-muted')}>{fullName}</div>
        </div>
      </Link>

      <div className={styles.followButtonWrapper}>
        <FollowButton followUserId={userId} followUsername={username} />
      </div>
    </div>
  </ListGroupItem>
)

export default UserListItem

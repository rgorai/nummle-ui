import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { AxiosResponse } from 'axios'
import cx from 'classnames'
import {
  getCurrUserProfile,
  getPublicUserProfile,
} from '../../../services/userService'
import styles from '../styles/profilePage.module.scss'
import { NO_PROFILE_IMAGE } from '../../../utils/env'
import PageLoader from '../../../Wrappers/PageLoader'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import {
  addLoadedProfile,
  selectSessionData,
} from '../../../state/sessionDataSlice'
import { useAuthInfo } from '../../../state/authContext'
import OrderHistory from '../../User/components/OrderHistory'
import FollowsModal from '../../User/components/FollowsModal'
import FollowButton from '../../User/components/FollowButton'
import { setDocumentTitle } from '../../../utils/strings'

type Props = {
  getCurrUser?: true
}

const ProfilePage = ({ getCurrUser }: Props) => {
  const { authInfo } = useAuthInfo()
  const { loadedProfiles } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)
  const { username } = useParams()

  const currProfile: UserProfilePrivate | UserProfilePublic | null =
    getCurrUser && authInfo.authenticated
      ? loadedProfiles[authInfo.username]
      : username
        ? loadedProfiles[username]
        : null

  const getProfileData = useCallback(
    (currUser: true | undefined) => {
      const setProfileData = (
        getProfileData: Promise<AxiosResponse<any, any>>
      ) =>
        getProfileData
          .then(({ data }) => {
            dispatch(addLoadedProfile(data))
            console.log('profile data', data)
          })
          .catch(({ response }) => {
            setPageError(response)
            console.error('get profile error', response)
          })
          .then(() => setLoading(false))

      setLoading(true)
      if (currUser && authInfo.authenticated)
        setProfileData(getCurrUserProfile())
      else if (username) setProfileData(getPublicUserProfile(username))
      else setLoading(false)
    },
    [authInfo.authenticated, dispatch, username]
  )

  useEffect(() => {
    if (!currProfile) getProfileData(getCurrUser)
  }, [currProfile, getCurrUser, getProfileData])

  useEffect(() => {
    if (currProfile && username) setDocumentTitle(username)
  }, [currProfile, username])

  return (
    <PageLoader loading={loading} error={pageError} pageData={currProfile}>
      {(pageData) => (
        <div className={styles.pageContainer}>
          <div className={styles.bioContainer}>
            <img
              className={styles.profileImg}
              src={NO_PROFILE_IMAGE}
              alt="User Profile Image"
            />
            <div className={styles.infoContainer}>
              <div className={styles.toolBar}>
                <div className={styles.usernameContainer}>
                  <h1 className={styles.username}>{pageData.username}</h1>
                  {/* TODO: add edit profile functionality */}
                  {getCurrUser && (
                    <Button variant="secondary">Edit Profile</Button>
                  )}
                  <FollowButton
                    followUserId={pageData._id}
                    followUsername={pageData.username}
                  />
                </div>

                <div className={styles.followsContainer}>
                  <div
                    className={cx(
                      styles.numOrders,
                      'btn btn-outline-secondary-dark'
                    )}
                  >
                    {pageData.numOrders === 0 ? (
                      'No'
                    ) : (
                      <strong>{pageData.numOrders}</strong>
                    )}
                    {` order${pageData.numOrders === 1 ? '' : 's'}`}
                  </div>
                  <FollowsModal
                    userId={pageData._id}
                    type="followers"
                    amount={pageData.numFollowers}
                  />
                  <FollowsModal
                    userId={pageData._id}
                    type="followings"
                    amount={pageData.numFollowing}
                  />
                </div>
              </div>

              <div className={styles.attributesContainer}>
                <div className={styles.userFullname}>{pageData.fullName}</div>
                <div className={styles.bio}>
                  this is a bio about me, myself, and I. hello. this is a bio
                  about me, myself, and I. hello. this is a bio about me,
                  myself, and I. hello. this is a bio about me, myself, and I.
                  hello. this is a bio about me, myself, and I. hello. this is a
                  bio about me, myself, and I. hello. this is a bio about me,
                  myself, and I. hello.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ordersContainer}>
            <h2>Order History</h2>
            <OrderHistory userId={pageData._id} />
          </div>
        </div>
      )}
    </PageLoader>
  )
}

export default ProfilePage

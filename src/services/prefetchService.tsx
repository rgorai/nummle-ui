import { useCallback, useEffect } from 'react'
import { addFollowsData, selectSessionData } from '../state/sessionDataSlice'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { useAuthInfo } from '../state/authContext'
import { getUserFollows } from './followsService'

export const PrefetchUserFollowing = () => {
  const { authInfo } = useAuthInfo()
  const { userFollowings } = useAppSelector(selectSessionData)
  const dispatch = useAppDispatch()

  const currUserFollowingList = authInfo.authenticated
    ? userFollowings[authInfo.userId]
    : null

  const getCurrUserFollowing = useCallback(
    (userId: string) => {
      getUserFollows(userId, 'following')
        .then(({ data }) => {
          dispatch(addFollowsData(['following', userId, data]))
          // console.log('curr user following', data)
        })
        .catch(({ response }) => {
          console.error('get curr user following error', response)
        })
    },
    [dispatch]
  )

  useEffect(() => {
    if (authInfo.authenticated && !currUserFollowingList)
      getCurrUserFollowing(authInfo.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authInfo.authenticated,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (authInfo as Authenticated).userId,
    currUserFollowingList,
    getCurrUserFollowing,
  ])

  return null
}

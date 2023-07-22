import axios from 'axios'
import { authHeader } from './authService'

export const getUserFollows = (
  userId: string,
  type: 'followers' | 'followings'
) => axios.get<Follow[]>(`/api/follows/${type}/${userId}`)

export const followUnfollowUser = (
  operation: 'follow' | 'unfollow',
  otherUserId: string
) =>
  axios.put<[Follow, Follow]>(
    `/api/follows`,
    { operation, otherUserId },
    { headers: authHeader() }
  )

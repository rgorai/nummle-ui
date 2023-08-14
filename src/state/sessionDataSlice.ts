import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

// TODO: maybe add some of these to redis cache instead
type SessionDataState = {
  clientLocation: ClientLocation | null
  nearbyRestaurants: TomTomApiObject[] | null
  loadedRestaurants: { [restaurantId: string]: RestaurantPage }
  loadedProfiles: { [username: string]: UserProfilePrivate | UserProfilePublic }
  orderHistories: { [userId: string]: (Order | OrderPublic)[] }
  userFollowers: { [userId: string]: Follow[] }
  userFollowings: { [userId: string]: Follow[] }
  feedItems: FeedPost[]
  trendingDishes: TrendingDishes | null
}

const defaultState: SessionDataState = {
  clientLocation: null,
  nearbyRestaurants: null,
  loadedRestaurants: {},
  loadedProfiles: {},
  orderHistories: {},
  userFollowers: {},
  userFollowings: {},
  feedItems: [],
  trendingDishes: null,
}

const initialState: SessionDataState = (
  Object.keys(defaultState) as (keyof SessionDataState)[]
).reduce(
  (p, c) => ({
    ...p,
    [c]: JSON.parse(String(sessionStorage.getItem(c))) ?? defaultState[c],
  }),
  {} as SessionDataState
)

const saveToSessionStorage = (key: string, newState: any) => {
  sessionStorage.removeItem(key)
  sessionStorage.setItem(key, JSON.stringify(newState))
}

export const sessionDataSlice = createSlice({
  name: 'sessionData',
  initialState,
  reducers: {
    setClientLocation: (
      state,
      { payload: clientLocation }: PayloadAction<ClientLocation>
    ) => {
      state.clientLocation = clientLocation
      saveToSessionStorage('clientLocation', clientLocation)
    },

    setNearbyRestaurants: (
      state,
      { payload: nearbyRestaurants }: PayloadAction<TomTomApiObject[]>
    ) => {
      state.nearbyRestaurants = nearbyRestaurants
      // state.loadedRestaurants = {
      //   ...state.loadedRestaurants,
      //   ...nearbyRestaurants.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
      // }
      saveToSessionStorage('nearbyRestaurants', nearbyRestaurants)
    },

    addLoadedRestaurant: (
      state,
      { payload: restaurantDetails }: PayloadAction<RestaurantPage>
    ) => {
      state.loadedRestaurants[restaurantDetails.id] = restaurantDetails
    },

    addLoadedProfile: (
      state,
      {
        payload: profileData,
      }: PayloadAction<UserProfilePrivate | UserProfilePublic>
    ) => {
      state.loadedProfiles[profileData.username] = profileData
    },

    addOrderHistory: (
      state,
      {
        payload: [userId, orderHistory],
      }: PayloadAction<[string, (Order | OrderPublic)[]]>
    ) => {
      state.orderHistories[userId] = orderHistory
    },

    updateReaction: (
      state,
      {
        payload: [userId, orderId, itemId, newReaction],
      }: PayloadAction<[string, string, string, ReactionOption]>
    ) => {
      const orderIndex = state.orderHistories[userId].findIndex(
        (e) => e._id === orderId
      )
      if (orderIndex !== -1) {
        state.orderHistories[userId][orderIndex].items[itemId].reaction =
          newReaction
      }
    },

    addFollowsData: (
      state,
      {
        payload: [type, userId, followsData],
      }: PayloadAction<['followers' | 'followings', string, Follow[]]>
    ) => {
      state[type === 'followers' ? 'userFollowers' : 'userFollowings'][userId] =
        followsData
    },

    updateFollow: (
      state,
      {
        payload: [operation, followerInfo, followingInfo],
      }: PayloadAction<['follow' | 'unfollow', Follow, Follow]>
    ) => {
      if (operation === 'follow') {
        state.userFollowers[followingInfo.userId]?.push(followerInfo)
        state.userFollowings[followerInfo.userId]?.push(followingInfo)

        if (state.loadedProfiles[followerInfo.username])
          state.loadedProfiles[followerInfo.username].numFollowing++
        if (state.loadedProfiles[followingInfo.username])
          state.loadedProfiles[followingInfo.username].numFollowers++
      }
      //
      else {
        if (state.userFollowers[followingInfo.userId])
          state.userFollowers[followingInfo.userId] = state.userFollowers[
            followingInfo.userId
          ].filter((e) => e.userId !== followerInfo.userId)
        if (state.userFollowings[followerInfo.userId])
          state.userFollowings[followerInfo.userId] = state.userFollowings[
            followerInfo.userId
          ].filter((e) => e.userId !== followingInfo.userId)

        if (state.loadedProfiles[followerInfo.username])
          state.loadedProfiles[followerInfo.username].numFollowing--
        if (state.loadedProfiles[followingInfo.username])
          state.loadedProfiles[followingInfo.username].numFollowers--
      }
    },

    setFeedItems: (state, { payload }: PayloadAction<FeedPost[]>) => {
      state.feedItems = payload
    },

    setTrendingDishes: (state, { payload }: PayloadAction<TrendingDishes>) => {
      state.trendingDishes = payload
    },
  },
})

export const {
  setClientLocation,
  setNearbyRestaurants,
  addLoadedRestaurant,
  addLoadedProfile,
  addOrderHistory,
  updateReaction,
  addFollowsData,
  updateFollow,
  setFeedItems,
  setTrendingDishes,
} = sessionDataSlice.actions

export const selectSessionData = (state: RootState) => state.sessionData

const sessionDataReducer = sessionDataSlice.reducer
export default sessionDataReducer

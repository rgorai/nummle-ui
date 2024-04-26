import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProfilePage from './App/Pages/components/ProfilePage'
import FeedPage from './App/Pages/components/FeedPage'
import SignupPage from './App/Pages/components/SignupPage'
import LoginPage from './App/Pages/components/LoginPage'
import Navbar from './App/Main/components/Navbar'
import ExplorePage from './App/Pages/components/ExplorePage'
import DocumentTitleWrapper from './Wrappers/DocumentTitleWrapper'
import AuthWrapper from './Wrappers/AuthWrapper'
import Logout from './App/User/components/Logout'
import RestaurantPage from './App/Restaurants/components/RestaurantPage'
import NearbyRestaurants from './App/Pages/components/NearbyRestaurants'
import { useAuthInfo } from './state/authContext'
import {
  PrefetchUserFollowing,
  PrefetchUserProfile,
} from './services/prefetchService'
import LandingPage from './App/Pages/components/LandingPage'

const APP_CONTENT: AppContent = [
  {
    label: 'Landing Page',
    path: '/',
    element: <LandingPage />,
    ensureAuthenticated: false,
  },
  {
    label: 'Feed',
    path: '/feed',
    element: <FeedPage />,
    ensureAuthenticated: true,
    displayOnNav: true,
  },
  {
    label: 'Nearby',
    path: '/around-me',
    element: <NearbyRestaurants />,
    ensureAuthenticated: true,
    displayOnNav: true,
  },
  {
    label: 'Explore',
    path: '/explore',
    element: <ExplorePage />,
    ensureAuthenticated: true,
    displayOnNav: true,
  },
  {
    label: 'Signup',
    path: '/signup',
    element: <SignupPage />,
    ensureAuthenticated: false,
    displayOnNav: true,
  },
  {
    label: 'Login',
    path: '/login',
    element: <LoginPage />,
    ensureAuthenticated: false,
    displayOnNav: true,
  },
  {
    label: 'My Profile',
    path: '/my-profile',
    element: <ProfilePage getCurrUser />,
    ensureAuthenticated: true,
    displayOnNav: true,
  },
  {
    label: 'User Profile',
    path: '/users/:username',
    element: <ProfilePage />,
    ensureAuthenticated: true,
    bypassDocumentTitle: true,
  },
  {
    label: 'Support',
    path: '/support',
    element: <>support page</>,
    ensureAuthenticated: null,
  },
  {
    label: 'Logout',
    path: '/logout',
    element: <Logout />,
    ensureAuthenticated: true,
    displayOnNav: true,
  },
  {
    label: 'Restaurant Details',
    path: '/restaurants/:restaurantId',
    element: <RestaurantPage />,
    ensureAuthenticated: null,
    bypassDocumentTitle: true,
  },
]

const App = () => {
  const { authInfo } = useAuthInfo()

  return (
    <div className="App">
      <PrefetchUserFollowing />
      <PrefetchUserProfile />

      <BrowserRouter>
        <Navbar appItems={APP_CONTENT} />

        <main>
          <Routes>
            {APP_CONTENT.map((e) => {
              const currRoute = <Route path={e.path} element={e.element} />
              return (
                <Route
                  element={
                    <DocumentTitleWrapper
                      pageTitle={e.label}
                      bypass={e.bypassDocumentTitle}
                    />
                  }
                  key={e.path}
                >
                  {e.ensureAuthenticated === null ? (
                    currRoute
                  ) : (
                    <Route
                      element={
                        <AuthWrapper
                          ensureNotAuthenticated={!e.ensureAuthenticated}
                        />
                      }
                    >
                      {currRoute}
                    </Route>
                  )}
                </Route>
              )
            })}

            {authInfo.authenticated && (
              <Route
                path={`/users/${authInfo.username}`}
                element={<Navigate replace to="/my-profile" />}
              />
            )}

            <Route path="*" element={<div>route error (set title)</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App

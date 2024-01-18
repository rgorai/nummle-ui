/**
 * @author rgorai
 * @description describes the information required to add functionalty to the app in App.tsx
 * @param label the user-facing label/name of this feature
 * @param path the designated react router route for this feature
 * @param element the JSX element to render for this feature
 * @param ensureAuthenticated whether this feature needs is accessible by authenticated user, unauthenticated user, or anyone
 * @param displayOnNav whether or not this feature should be displayed on the navigation bar
 * @param bypassDocumentTitle whether or not this feature should bypass the automatic document title based on label
 */
type AppContent = {
  label: string
  path: string
  element: JSX.Element
  ensureAuthenticated: boolean | null
  displayOnNav?: true
  bypassDocumentTitle?: true
}[]

/**
 * @author rgorai
 * @description details of a web error
 * @param status http status code
 * @param statusText text describing the status code
 * @param data any associated error data
 */
type ServerError = {
  status: string
  statusText: string
  data?: string
}

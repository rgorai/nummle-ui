import Loading from '../App/Main/components/Loading'
import ErrorPage from '../App/Pages/components/ErrorPage'

type Props<T> = {
  loading: boolean
  error: ServerError | null
  pageData: T
  children: (pageData: Exclude<T, null>) => JSX.Element
}

// TODO: ADD ERROR HANDLING TO THIS

// eslint-disable-next-line comma-spacing
const PageLoader = <T,>({ loading, error, pageData, children }: Props<T>) =>
  loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage {...error} />
  ) : pageData ? (
    <>{children(pageData as Exclude<T, null>)}</>
  ) : null

export default PageLoader

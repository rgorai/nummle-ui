import { Component, ErrorInfo, ReactNode } from 'react'
import ErrorPage from '../App/Pages/components/ErrorPage'

type Props = {
  children: ReactNode
  onCatch?: () => void
  FallbackComponent?: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caused by: ' + error, errorInfo)
  }

  public render() {
    const { onCatch, FallbackComponent } = this.props

    if (this.state.hasError) {
      if (onCatch) onCatch()
      if (FallbackComponent) return FallbackComponent
      return <ErrorPage status="500" statusText="Internal Server Error" />
    }

    return this.props.children
  }
}

export default ErrorBoundary

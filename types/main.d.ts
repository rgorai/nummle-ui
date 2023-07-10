import { ReactElement } from 'react'

declare global {
  type AppContent = {
    label: string
    path: string
    element: ReactElement
    ensureAuthenticated: boolean | null
    displayOnNav?: true
    overrideDocumentTitle?: true
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
}

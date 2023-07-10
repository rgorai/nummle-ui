import { PropsWithChildren, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { setDocumentTitle } from '../utils/misc'

type Props = {
  pageTitle: string
  bypass: true | undefined
}

const DocumentTitleWrapper = (props: Props & PropsWithChildren) => {
  useEffect(() => {
    if (!props.bypass) setDocumentTitle(props.pageTitle)
  }, [props])

  return <Outlet />
}

export default DocumentTitleWrapper

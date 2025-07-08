import { UnauthorizedPage } from '@/components/forbidden-page'
import React from 'react'


const ForbiddenPage = () => {
  return (
    <UnauthorizedPage
      type="403"
      message="You don't have the required permissions to access this resource"
    />
  )
}

export default ForbiddenPage
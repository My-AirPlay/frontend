import React from 'react'
import { StaticAppInfoProvider } from './StaticAppInfoContext'

const AllProviders = ({children}:{children:React.ReactNode}) => {
  return (
    <StaticAppInfoProvider>
        {children}
    </StaticAppInfoProvider>
  )
}

export default AllProviders
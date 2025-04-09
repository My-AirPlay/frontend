import { AppLogo } from '@/components/icons'
import React from 'react'

const ArtistAppLoadingState = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-background">
            <AppLogo className='animate-pulse' />
        </div>
    )
}

export default ArtistAppLoadingState
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAlbumUploadStore } from "../misc/store"
import Step1MusicInfo from "../misc/components/Step1AlbumInfo"
import { Step0AlbumUploadSteps, Step2AlbumTrackUpload, Step3AlbumCoverUpload } from "../misc/components"

export default function AlbumUploadFlow() {
  const { currentStep, albumType, setCurrentStep } = useAlbumUploadStore()
  const router = useRouter()
  

  useEffect(() => {
    console.log("Media type in AlbumUploadFlow:", albumType)
    if (!albumType || !(albumType === 'Album' || albumType === 'ExtendedPlaylist' || albumType === 'MixTape')) {
      router.replace('/artiste/upload')
    }
  }, [albumType, router])
  

  useEffect(() => {
    console.log("Current step in AlbumUploadFlow:", currentStep)
    if (currentStep === 'selection') {
      setCurrentStep('musicInfo')
      router.replace('/artiste/upload/album', { scroll: false })
    }
  }, [currentStep, router, setCurrentStep])
  

  
  // Get title based on media type
  const getTitle = () => {
    if (currentStep === 'complete') {
      return 'Upload Success'
    }
    
    if (!albumType) {
      return 'Upload Music'
    }
    
    return `${albumType} Upload`
  }
  

  const showSteps = currentStep !== 'selection' && currentStep !== 'complete'
  
  // Render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'musicInfo':
        return <Step1MusicInfo />
      case 'trackUpload':
        return <Step2AlbumTrackUpload />
      case 'coverArt':
        return <Step3AlbumCoverUpload />
    //   case 'distribution':
    //     return <DistributionForm />
    //   case 'preview':
    //     return <PreviewForm />
    //   case 'complete':
    //     return <UploadSuccess />
      default:
        return null
    }
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-center pt-4">{getTitle()}</h1>
      
      {showSteps && <Step0AlbumUploadSteps />}
      
      {renderCurrentStep()}
    </div>
  )
}


"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Step0MediaUploadSteps, Step1MediaInfo, Step2MediaTrackUpload, Step3MediaCoverUpload, Step4MediaDistributionDetails, Step5MediaPreview } from "../misc/components"
import { useMediaUploadStore } from "../misc/store"

export default function MediaUploadFlow() {
  const { currentStep, mediaType, setCurrentStep } = useMediaUploadStore()
  const router = useRouter()


  useEffect(() => {
    console.log("Media type in MediaUploadFlow:", mediaType)
    if (!mediaType || !(mediaType === 'Track' || mediaType === 'Video' || mediaType === 'PlayBack')) {
      router.replace('/artiste/upload')
    }
  }, [mediaType, router])


  useEffect(() => {
    console.log("Current step in MediaUploadFlow:", currentStep)
    if (currentStep !== 'selection') return
    if (currentStep === 'selection') {
      setCurrentStep('musicInfo')
      router.replace('/artiste/upload/media', { scroll: false })
    }
  }, [currentStep, router, setCurrentStep])



  const getTitle = () => {
    if (currentStep === 'complete') {
      return 'Upload Success'
    }
    if (!mediaType) {
      return 'Upload Music'
    }
    return `${mediaType} Upload`
  }

  const showSteps = currentStep !== 'selection' && currentStep !== 'complete'

  // Render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'musicInfo':
        return <Step1MediaInfo />
      case 'trackUpload':
        return <Step2MediaTrackUpload />
      case 'coverArt':
        return <Step3MediaCoverUpload />
      case 'distribution':
        return <Step4MediaDistributionDetails />
        case 'preview':
          return <Step5MediaPreview />
      //   case 'complete':
      //     return <UploadSuccess />
      default:
        return null
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pt-4">{getTitle()}</h1>

      {showSteps && <Step0MediaUploadSteps />}

      {renderCurrentStep()}
    </div>
  )
}


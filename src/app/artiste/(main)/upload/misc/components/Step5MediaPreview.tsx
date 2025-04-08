"use client"

import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomAlertDialog } from "@/components/ui"
import useBooleanStateControl from "@/hooks/useBooleanStateControl"

import { useMediaUploadStore } from "../store"
import { useUploadTrack } from "../api/upload"
import Image from "next/image"

export default function Step5MediaPreview() {
  const {
    state: isUploadStatusModalOpen,
    setTrue: openUploadStatusModal,
    setFalse: closeUploadStatusModal,
    setState: setUploadStatusModalOpen,
  } = useBooleanStateControl()
  const router = useRouter()

  const {
    mediaInfo,
    mediaFileId,
    coverArtId,
    setCurrentStep,
    mediaType,
    streamingPlatforms,
    clearStore,
    getMediaFile,
    getCoverArtFile,
    isDBInitialized,
  } = useMediaUploadStore()

  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null)
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null)

  // Load files from IndexedDB
  useEffect(() => {
    const loadFiles = async () => {
      if (isDBInitialized) {
        if (mediaFileId) {
          const file = await getMediaFile()
          if (file) {
            setMediaFile(file)
          }
        }

        if (coverArtId) {
          const file = await getCoverArtFile()
          if (file) {
            setCoverArtFile(file)
            setCoverArtPreview(URL.createObjectURL(file))
          }
        }
      }
    }

    loadFiles()
  }, [mediaFileId, coverArtId, getMediaFile, getCoverArtFile, isDBInitialized])

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (coverArtPreview) {
        URL.revokeObjectURL(coverArtPreview)
      }
    }
  }, [coverArtPreview])

  const handleBack = () => {
    setCurrentStep("distribution")
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const { mutate, isPending, status } = useUploadTrack()
  const handleSubmit = async () => {
    try {
      // Single track upload
      if (!mediaFile || !coverArtFile) {
        toast.error("Missing required files", {
          description: "Please make sure you have uploaded both a track file and cover art.",
        })
        setCurrentStep("trackUpload")
        return
      }

      const trackPayload = {
        ...mediaInfo,
        media: mediaFile,
        coverArt: coverArtFile,
        fileType: mediaFile.type.includes("audio") ? "audio" : "video",
        streamingPlatforms,
      }

      mutate(trackPayload, {
        onSuccess: () => {
          toast.success("Upload successful", {
            description: `Your ${mediaType?.toLowerCase()} has been uploaded successfully.`,
          })
        },
        onError: (error) => {
          console.error("Upload failed:", error)
          toast.error("Upload failed", {
            description: "There was an error uploading your content. Please try again.",
          })
        },
      })
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Upload failed", {
        description: "There was an error uploading your content. Please try again.",
      })
    } finally {
      openUploadStatusModal()
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-center text text-xl font-medium mb-8 uppercase text-primary">
            Review Your {mediaType} Summary
          </h3>

          <div className="space-y-6">
            <section className="flex items-start gap-4 mb-6">
              {coverArtPreview && (
                <Image
                  src={coverArtPreview || "/placeholder.svg"}
                  alt="Cover Art Preview"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              )}
              <div>
                <h6 className="font-bold text-xl text-primary">{mediaInfo.title}</h6>
                <p>by {mediaInfo.artistName}</p>
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-x-8 gap-5 p-4 my-6">
              <div>
                <p className="text-sm text-gray-400">Song Title</p>
                <p className="font-medium">{mediaInfo.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Artist Name</p>
                <p className="font-medium">{mediaInfo.artistName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Genre</p>
                <p className="font-medium">{mediaInfo.mainGenre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Release Date</p>
                <p className="font-medium">{formatDate(mediaInfo.releaseDate)}</p>
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-400">Music Description</p>
                <p className="font-medium">{mediaInfo.description}</p>
              </div>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Distribution Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Streaming Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {streamingPlatforms.map((platform, index) => (
                      <span
                        key={index}
                        className="relative bg-gray-800 text-white rounded-full text-sm size-10 overflow-hidden"
                      >
                        <Image
                          src={`/images/platform_logos/${platform.toLowerCase()}.svg`}
                          alt={platform}
                          fill
                          className="text-[0rem] text-opacity-0 bg-gray-700 z-[2]"
                          objectFit="cover"
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Publisher</p>
                    <p className="font-medium">{mediaInfo.publisher}</p>
                  </div>
                  {mediaInfo.recordLabel && (
                    <div>
                      <p className="text-sm text-gray-400">Record Label</p>
                      <p className="font-medium">{mediaInfo.recordLabel}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-400">UPC</p>
                    <p className="font-medium">{mediaInfo.universalProductCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Copyright</p>
                    <p className="font-medium">{mediaInfo.copyright}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mt-8">
            <Button onClick={handleBack} variant="outline" disabled={isPending} size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleSubmit} className="" disabled={isPending} size="lg">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload {mediaType}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <CustomAlertDialog
        variant="success"
        open={status != "idle" && !isPending && isUploadStatusModalOpen}
        onOpenChange={setUploadStatusModalOpen}
        title={status === "success" ? "Upload Successful" : "Upload Failed"}
        description={
          status === "success"
            ? "File upload completed successfully. Go to uploads to view uploaded content!"
            : "There was an error uploading your content. Please try again."
        }
        actionLabel={status === "success" ? "Go to Uploads" : "Retry"}
        cancelLabel="Back to Submit"
        onAction={() => {
          if (status === "success") {
            clearStore()
            router.push("/artiste/catalog")
            closeUploadStatusModal()
          } else {
            closeUploadStatusModal()
          }
        }}
        onCancel={() => {
          closeUploadStatusModal()
        }}
        showCancel={status !== "success"}
        showAction={true}
      />
    </>
  )
}

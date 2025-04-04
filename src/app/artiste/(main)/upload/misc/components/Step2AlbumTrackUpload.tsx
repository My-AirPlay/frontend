"use client"

import type React from "react"
import { toast } from "sonner"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Music, Edit } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectSimple } from "@/components/ui"
import { useStaticAppInfo } from "@/contexts/StaticAppInfoContext"
import { MOCK_GENRES } from "@/constants"
import { AppLogo, Spinner } from "@/components/icons"

import { useAlbumUploadStore } from "../store"
import { AlbumTrackInfo } from "../store/album"
import { getFileSize } from "@/utils/numbers"

export default function TrackUpload() {
  const {
    mediaFiles,
    addMediaFile,
    removeMediaFile,
    setCurrentStep,
    albumTracks,
    addTrack,
    updateTrack,
    removeTrack,
    albumInfo,
  } = useAlbumUploadStore()

  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({
    ...Object.fromEntries(mediaFiles.map((_, index) => [index, 100])),
  })
  const [editingTrackIndex, setEditingTrackIndex] = useState<number | null>(null)
  const [editingTrack, setEditingTrack] = useState<AlbumTrackInfo | null>(null)
  const [sameAsAlbum, setSameAsAlbum] = useState<Record<string, boolean>>({
    artistName: true,
    mainGenre: true,
    releaseDate: true,
    recordLabel: true,
    publisher: true,
    copyright: true,
    streamingPlatforms: true,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (albumTracks.length > 0 && mediaFiles.length == 0) {
      while (mediaFiles.length > 0) {
        removeMediaFile(0);
      }
      while (albumTracks.length > 0) {
        removeTrack(0);
      }
      toast.info("All tracks have been removed. Please start the upload process again.");

    }
  }, [mediaFiles.length, albumTracks.length, removeMediaFile, removeTrack])

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const validFiles: File[] = []
    const invalidFiles: string[] = []

    Array.from(files).forEach((file) => {
      if (file.type.includes("audio") || file.type.includes("video")) {
        validFiles.push(file)

        // Create a default track entry for this file
        const newTrack = {
          title: file.name.replace(/\.(mp3|mp4|wav)$/i, ""),
          artistName: albumInfo.artistName,
          mainGenre: albumInfo.mainGenre,
          releaseDate: albumInfo.releaseDate,
          description: "",
          recordLabel: albumInfo.recordLabel,
          publisher: albumInfo.publisher,
          lyrics: "",
          explicitContent: "No",
          universalProductCode: albumInfo.universalProductCode,
          releaseVersion: albumInfo.releaseVersion,
          copyright: albumInfo.copyright,
          fileType: file.type.includes("audio") ? "audio" : "video",
          streamingPlatforms: [...albumInfo.streamingPlatforms],
        }

        addTrack(newTrack)

        // Simulate upload progress
        const index = mediaFiles.length + validFiles.length - 1
        simulateUploadProgress(index)
      } else {
        invalidFiles.push(file.name)
      }
    })

    validFiles.forEach((file) => {
      addMediaFile(file)
    })

    if (invalidFiles.length > 0) {
      toast.error("Invalid files detected", {
        description: `The following files are not valid: ${invalidFiles.join(", ")}`,
      })
    }

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const simulateUploadProgress = (index: number) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress((prev) => ({
        ...prev,
        [index]: Math.floor(progress),
      }))
    }, 100)
  }

  const handleRemoveFile = (index: number) => {
    removeMediaFile(index)
    removeTrack(index)
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[index]
      return newProgress
    })
  }

  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // const handleBack = () => {
  //   setCurrentStep("musicInfo")
  // }


  const handleContinue = () => {
    if (mediaFiles.length === 0) {
      toast.warning("No files uploaded", {
        description: "Please upload at least one track for your album.",
      })
      return
    }

    setCurrentStep("coverArt")
  }

  const openEditTrack = (index: number) => {
    setEditingTrackIndex(index)
    setEditingTrack({ ...albumTracks[index] })

    // Set sameAsAlbum checkboxes based on whether track values match album values
    const track = albumTracks[index]
    setSameAsAlbum({
      artistName: track.artistName === albumInfo.artistName,
      mainGenre: track.mainGenre === albumInfo.mainGenre,
      releaseDate: track.releaseDate === albumInfo.releaseDate,
      recordLabel: track.recordLabel === albumInfo.recordLabel,
      publisher: track.publisher === albumInfo.publisher,
      copyright: track.copyright === albumInfo.copyright,
      streamingPlatforms: JSON.stringify(track.streamingPlatforms) === JSON.stringify(albumInfo.streamingPlatforms),
    })
  }

  const closeEditTrack = () => {
    setEditingTrackIndex(null)
    setEditingTrack(null)
  }

  const saveTrackChanges = () => {
    if (editingTrackIndex !== null && editingTrack) {
      updateTrack(editingTrackIndex, editingTrack)
      closeEditTrack()
      toast.info("Track updated", {
        description: "Your track details have been updated successfully.",
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTrackChange = (field: string, value: any) => {
    setEditingTrack((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value ?? "",
      };
    });
  }

  const toggleSameAsAlbum = (field: string) => {
    const newValue = !sameAsAlbum[field]
    setSameAsAlbum((prev) => ({
      ...prev,
      [field]: newValue,
    }))

    // If checked, copy the album value to the track
    if (newValue) {
      setEditingTrack((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [field]: (albumInfo[field as keyof typeof albumInfo] as string) || "",
        };
      });
    }
  }

  const { data: staticData, isLoading } = useStaticAppInfo();
  const [genres, setGenres] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    if (staticData && staticData.MusicalInstrument) {
      const genreEntries = Object.entries(staticData.StreamingPlatform || {});
      const formattedGenres = genreEntries.map(([value, label]) => ({
        value: value.toLowerCase(),
        label
      }));
      setGenres(formattedGenres);
    } else {
      setGenres(MOCK_GENRES);
    }
  }, [staticData]);




  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-full min-h-[40vh]">
      <Spinner />
    </div>
  }
  return (
    <div className="w-[80vw] sm:w-[55vw] max-w-[600px] md:max-w-3xl mx-auto mt-16">

      <section className="mb-8 grid lg:grid-cols-2 gap-8 lg:items-stretch">
        <div className="border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center">
          <AppLogo width={150} height={150} className="" style={{ opacity: 0.3, filter: "grayscale(1)" }} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFilesSelected}
            accept=".mp3,.mp4,.wav"
            multiple
          />

          <div className="mb-6 text-left">
            <h3 className="text-base font-semibold mb-4">Album upload requirements</h3>
            <ul className="text-[0.9rem] text-white/70 space-y-1.5 text-left">
              <li>• File format: MP3, MP4</li>
              <li>• Size: at least 3000×3000 pixels</li>
              <li>• File size: Image file size cannot be greater than 15 MB</li>
              <li>• Video mode: Best quality</li>
              <li>• Resolution: 72 dpi</li>
              <li>
                • Your track must not contain any logos, website address, release dates or advertisements of any kind.
              </li>
            </ul>
          </div>

          <Button
            onClick={handleClickUpload}
            size="lg"
            className="bg-primary hover:bg-primary text-white rounded-full px-8 mt-5"
          >
            Browse
          </Button>
        </div>
      </section>

      {
        mediaFiles.length > 0 && (
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-2">Uploading - {mediaFiles.length} files</div>
            <div className="grid md:grid-cols-2 gap-5 lg:gap-y-8">
              {
                mediaFiles.map((file, index) => (
                  <div key={index} className="flex flex-col p-4 rounded-lg border border-white bg-secondary">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <h6 className="flex items-center" style={{ cursor: "pointer" }}>
                          <Music className="h-4 w-4 text-primary mr-2" />
                          <span className="text-[0.8rem]">{file.name}</span>
                        </h6>
                        <span className="text-[0.7rem] text-white/50">{getFileSize(file.size)} MB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditTrack(index)}
                          className="h-6 w-6 text-gray-400 hover:text-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(index)}
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${uploadProgress[index] || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )
      }

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          onClick={handleContinue}
          className="bg-primary hover:bg-primary text-white px-10 rounded-full"
        >
          Save & Continue →
        </Button>
      </div>


      {/* ///////////////////////////////////// */}
      {/*           Track Edit Sheet            */}
      {/* ///////////////////////////////////// */}
      <Sheet open={editingTrackIndex !== null} onOpenChange={closeEditTrack}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Track Details</SheetTitle>
            <SheetDescription>
              Update the information for this track. Check &quot;Same as album&quot; to use album values.
            </SheetDescription>
          </SheetHeader>

          {editingTrack && (
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title</Label>
                <Input
                  id="title"
                  value={editingTrack.title}
                  onChange={(e) => handleTrackChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="artistName">Artist Name</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameArtist"
                      checked={sameAsAlbum.artistName}
                      onCheckedChange={() => toggleSameAsAlbum("artistName")}
                    />
                    <Label htmlFor="sameArtist" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>
                <Input
                  id="artistName"
                  value={editingTrack.artistName}
                  onChange={(e) => handleTrackChange("artistName", e.target.value)}
                  disabled={sameAsAlbum.artistName}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mainGenre">Main Genre</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameGenre"
                      checked={sameAsAlbum.mainGenre}
                      onCheckedChange={() => toggleSameAsAlbum("mainGenre")}
                    />
                    <Label htmlFor="sameGenre" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>

                <SelectSimple
                  label="Explicit Content"
                  value={editingTrack.mainGenre}
                  onChange={(value) => handleTrackChange("mainGenre", value)}
                  options={genres}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Select"
                  disabled={sameAsAlbum.mainGenre}
                />

              </div>

              <div className="space-y-2">
                <Label htmlFor="lyrics">Lyrics</Label>
                <Textarea
                  id="lyrics"
                  value={editingTrack.lyrics}
                  onChange={(e) => handleTrackChange("lyrics", e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Enter lyrics here"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameDate"
                      checked={sameAsAlbum.releaseDate}
                      onCheckedChange={() => toggleSameAsAlbum("releaseDate")}
                    />
                    <Label htmlFor="sameDate" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>
                <Input
                  id="releaseDate"
                  type="date"
                  value={editingTrack.releaseDate ? new Date(editingTrack.releaseDate).toISOString().split("T")[0] : ""}
                  onChange={(e) => handleTrackChange("releaseDate", e.target.value)}
                  disabled={sameAsAlbum.releaseDate}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recordLabel">Record Label</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameLabel"
                      checked={sameAsAlbum.recordLabel}
                      onCheckedChange={() => toggleSameAsAlbum("recordLabel")}
                    />
                    <Label htmlFor="sameLabel" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>
                <Input
                  id="recordLabel"
                  value={editingTrack.recordLabel}
                  onChange={(e) => handleTrackChange("recordLabel", e.target.value)}
                  disabled={sameAsAlbum.recordLabel}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="publisher">Publisher</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="samePublisher"
                      checked={sameAsAlbum.publisher}
                      onCheckedChange={() => toggleSameAsAlbum("publisher")}
                    />
                    <Label htmlFor="samePublisher" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>
                <Input
                  id="publisher"
                  value={editingTrack.publisher}
                  onChange={(e) => handleTrackChange("publisher", e.target.value)}
                  disabled={sameAsAlbum.publisher}
                />
              </div>

              <SelectSimple
                label="Explicit Content"
                value={editingTrack.explicitContent}
                onChange={(value) => handleTrackChange("explicitContent", value)}
                options={[
                  { value: "No", label: "No" },
                  { value: "Yes", label: "Yes" },
                ]}
                labelKey="label"
                valueKey="value"
                placeholder="Select"
                disabled={sameAsAlbum.explicitContent}
              />


              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="copyright">Copyright</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameCopyright"
                      checked={sameAsAlbum.copyright}
                      onCheckedChange={() => toggleSameAsAlbum("copyright")}
                    />
                    <Label htmlFor="sameCopyright" className="text-sm text-gray-500">
                      Same as album
                    </Label>
                  </div>
                </div>
                <Input
                  id="copyright"
                  value={editingTrack.copyright}
                  onChange={(e) => handleTrackChange("copyright", e.target.value)}
                  disabled={sameAsAlbum.copyright}
                />
              </div>
            </div>
          )}

          <SheetFooter className="pt-4">
            <Button variant="outline" onClick={closeEditTrack}>
              Cancel
            </Button>
            <Button size="md" className="bg-primary hover:bg-primary" onClick={saveTrackChanges}>
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}


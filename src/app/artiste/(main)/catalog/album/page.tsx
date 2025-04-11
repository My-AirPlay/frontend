'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Musicnote } from 'iconsax-react'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { formatDate } from 'date-fns'

import useBooleanStateControl from '@/hooks/useBooleanStateControl'
import { Button, LinkButton } from '@/components/ui'
import AddSongToAlbumFromAlbumMenu from '../misc/components/AddSongToAlbumFromAlbumMenu'

import { useGetAlbumDetails } from '../misc/api'
import AudioCard, { AudioCardSkeleton } from '../misc/components/AudioCard'


const AlbumDetailsPage = () => {
    const searchParams = useSearchParams()
    const albumId = searchParams.get('albumId')
    const { data: album, isLoading } = useGetAlbumDetails(albumId)
    const [imageError, setImageError] = React.useState(false)

    const {
        state: isAddSongToAlbumDialogOpen,
        setTrue: openAddSongToAlbumModal,
        setState: setIsAddSongToAlbumDialogState
    } = useBooleanStateControl();

    return (
        <div>
            <LinkButton variant="outline" className="bg-secondary text-foreground border-border mb-4" href="/artiste/catalog?section=albums" replace>
                <ChevronLeft size={16} className="mr-2" />
                <span>Back to albums</span>
            </LinkButton>
            <header className='flex max-md:flex-col md:justify-between pb-4 border-b border-b-white/40'>
                <section className="flex max-sm:flex-col items-end gap-4">
                    <div className="relative size-24 flex items-center justify-center">
                        <Image
                            src={album?.mediaDirCoverArtUrl || ""}
                            alt={album?.title || ""}
                            className="object-cover rounded-lg text-opacity-0 text-[0px]"
                            fill
                            onError={() => setImageError(true)}
                        />
                        {imageError && <Musicnote size={60} className="stroke-white z-[3]" />}
                    </div>
                    <div className="flex flex-col">

                        <h1 className="text-xl lg:text-2xl font-medium">
                            {album?.title}
                        </h1>
                        <div className="text-sm text-white/50 md:flex items-center gap-4 divide-x">
                            <p>
                                {album?.fileIds?.length} Tracks

                            </p>
                            <p>
                                Released:{" "}
                                <span className="text-white">
                                    {formatDate(new Date(album?.releaseDate || 0), "MMM dd yyyy")}
                                </span>
                            </p>
                            <p>
                                Artist:{" "}
                                <span className="text-white">
                                    {album?.artistName}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <Button
                        onClick={openAddSongToAlbumModal}
                        className="mt-4"
                    >
                        Add Songs
                    </Button>
                </section>
            </header>

            <div>
                {
                    !isLoading && !album ? (
                        <div className="flex items-center justify-center h-full w-full">
                            <h1 className='text-xl text-muted-foreground'>No audios found</h1>
                        </div>
                    )
                        :

                        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
                            {
                                isLoading ? Array.from({ length: 10 }).map((_, index) => (
                                    <AudioCardSkeleton key={`${_}${index}`} />
                                ))
                                    :
                                    album?.fileIds?.map((audio) => (
                                        <AudioCard
                                            key={audio._id}
                                            audio={audio}
                                        />
                                    ))}
                        </div>
                }
            </div>

            {
                !!album &&
                <AddSongToAlbumFromAlbumMenu
                    album={album}
                    isAddSongToAlbumDialogOpen={isAddSongToAlbumDialogOpen}
                    setIsAddSongToAlbumDialogState={setIsAddSongToAlbumDialogState}
                />
            }
        </div>
    )
}

export default AlbumDetailsPage
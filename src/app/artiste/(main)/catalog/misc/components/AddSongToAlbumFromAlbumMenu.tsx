import React from 'react'
import { TArtisteAlbum } from '../api/getArtisteAlbums';
import { Button, Dialog, DialogContent, DialogTitle, SelectSimple } from '@/components/ui';
import { Musicnote } from 'iconsax-react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from 'date-fns';
import { useGetAudios } from '../api';
import AudioCard, { AudioCardSkeleton } from './AudioCard';

interface AddSongToAlbumFromAlbumMenuProps {
    isAddSongToAlbumDialogOpen: boolean;
    setIsAddSongToAlbumDialogState: (state: boolean) => void;
    album: TArtisteAlbum;
}
const AddSongToAlbumFromAlbumMenu = ({ isAddSongToAlbumDialogOpen, setIsAddSongToAlbumDialogState, album }: AddSongToAlbumFromAlbumMenuProps) => {
    const [imageError, setImageError] = React.useState(false)
    const [itemsPerPage, setItemsPerPage] = React.useState(20);
    const [page, setPage] = React.useState(1);
    const { data, isLoading } = useGetAudios({
        page: page,
        limit: itemsPerPage,
    });

    return (

        <Dialog open={isAddSongToAlbumDialogOpen} onOpenChange={setIsAddSongToAlbumDialogState}>
            <DialogTitle className="sr-only">Details</DialogTitle>
            <DialogContent className="bg-zinc-900 text-white max-w-xl p-0 border-none !rounded-2xl ">
                <div className="rounded-2xl p-4 h-[90vh] overflow-hidden flex flex-col">
                    <header className="rounded-2xl">
                        <div className="flex gap-6 mb-4 p-4">
                            <div className="relative size-24 flex items-center justify-center">
                                <Image
                                    src={album.mediaDirCoverArtUrl}
                                    alt={album.title}
                                    className="object-cover rounded-lg text-opacity-0 text-[0px]"
                                    fill
                                    onError={() => setImageError(true)}
                                />
                                {imageError && <Musicnote size={60} className="stroke-white z-[3]" />}
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="text-orange-500 text-sm">
                                        Released • {album.releaseDate ? formatDate(new Date(album.releaseDate), 'MMM dd yyyy') : 'No date'}
                                    </div>
                                    <h2 className="text-xl font-bold mt-2">{album.title}</h2>
                                </div>

                            </div>
                        </div>
                    </header>

                    <div className="relative flex flex-col overflow-hidden">



                        <section className='flex-1 overflow-y-auto'>
                            {
                                !isLoading && data?.data.length === 0 ? (
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
                                                data?.data.filter(media => !album.fileIds.includes(media._id)).map((audio) => (
                                                    <AudioCard
                                                        key={audio._id}
                                                        audio={audio}
                                                        album={album}
                                                    />
                                                ))
                                        }
                                    </div>
                            }
                        </section>

                        <footer className="stickty top-0 gap-8 h-10 bg-background flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => setPage((prev) => prev - 1)}
                                    disabled={page === 1}
                                    size="sm"
                                    variant="outline"
                                    className={`px-4 !py-2  ${page === 1 && "opacity-50 cursor-not-allowed"}`}
                                >
                                    Previous
                                </Button>
                                <span className='min-w-[3ch] text-center '>{page}</span>
                                <Button
                                    onClick={() => setPage((prev) => prev + 1)}
                                    disabled={(data?.total ?? 0) <= itemsPerPage * page}
                                    size="sm"
                                    variant="outline"
                                    className={`px-4 !py-2  ${(data?.total ?? 0) <= itemsPerPage * page && "opacity-50 cursor-not-allowed"}`}
                                >
                                    Next
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-xs sm:text-sm">
                                    Items per page:
                                </p>

                                <SelectSimple
                                    value={String(itemsPerPage)}
                                    onChange={(value) => {
                                        setItemsPerPage(Number(value))
                                        setPage(1)
                                    }}
                                    options={[
                                        { value: "10", label: "10" },
                                        { value: "20", label: "20" },
                                        { value: "50", label: "50" },
                                        { value: "100", label: "100" },
                                    ]}
                                    valueKey='value'
                                    labelKey='label'
                                    className="w-20 !h-7 !p-2"
                                    placeholder="Items per page"
                                    size={"sm"}
                                />
                            </div>

                        </footer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default AddSongToAlbumFromAlbumMenu
import React from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { Play, Ellipsis, Eye, Trash, Edit2, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { Musicnote } from 'iconsax-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, ReusableDropdownMenu, Dialog, DialogContent, Sheet, SheetContent, SheetHeader, SheetTitle, Skeleton, DialogTitle, CustomAlertDialog } from '@/components/ui'

import useBooleanStateControl from '@/hooks/useBooleanStateControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input, SelectSimple } from '@/components/ui'
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext'
import { SmallSpinner } from '@/components/icons'


import { TArtisteAlbum } from '../api/getArtisteAlbums'
import { useDeleteAlbum, useUpdateAlbum } from '../api'



const mediaUpdateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    artistName: z.string().min(1, "Artist name is required"),
    mainGenre: z.string().min(1, "Genre is required"),
    releaseDate: z.string().min(1, "Release date is required"),
    description: z.string().min(1, "Description is required"),
    recordLabel: z.string().optional(),
    publisher: z.string().min(1, "Publisher is required"),
    copyright: z.string().min(1, "Copyright is required"),
    explicitContent: z.string().min(1, "Please select an option"),
    universalProductCode: z.string().min(1, "UPC is required"),
    releaseVersion: z.string().min(1, "Release version is required"),
})

type MediaUpdateFormValues = z.infer<typeof mediaUpdateSchema>



const AlbumCard = ({ album }: {
    album: TArtisteAlbum,
}) => {
    const {
        state: isViewDetailsDialogOpen,
        setTrue: openViewDetailsDialog,
        setState: setIsViewDetailsDialogState
    } = useBooleanStateControl()

    const {
        state: isEditSheetOpen,
        setTrue: openEditSheet,
        setState: setIsEditSheetState
    } = useBooleanStateControl()


    const [imageError, setImageError] = React.useState(false)

    const defaultValues: MediaUpdateFormValues = {
        title: album.title,
        artistName: album.artistName || "",
        mainGenre: album.mainGenre || "",
        releaseDate: album.releaseDate ? new Date(album.releaseDate).toISOString().split('T')[0] : "",
        description: album.description || "",
        recordLabel: album.recordLabel || "",
        publisher: album.publisher || "",
        copyright: album.copyright || "",
        explicitContent: album.explicitContent || "No",
        universalProductCode: album.universalProductCode || "",
        releaseVersion: album.releaseVersion || "",
    }

    const form = useForm<MediaUpdateFormValues>({
        resolver: zodResolver(mediaUpdateSchema),
        defaultValues,
        mode: "onChange"
    })
    const { handleSubmit, formState: { errors, isValid } } = form
    const { formattedData, isLoading: isLoadingStaticData } = useStaticAppInfo();
    const { mutate: updateMedia, isPending: isUpdatinAlbum } = useUpdateAlbum();
    const { mutate: deleteMedia, isPending: isDeletingAlbum } = useDeleteAlbum();
    const onSubmit = (data: MediaUpdateFormValues) => {
        const updatedAlbum = {
            ...album,
            ...data
        }
        updateMedia(updatedAlbum, {
            onSuccess() {
                toast.success("Album track updated successfully")
                setIsEditSheetState(false)
            },
            onError() {
                toast.error("Failed to update album track")
            }
        })
    }

    const {
        state: isConfirmDeleteModalOpen,
        setTrue: openConfirmDeleteModal,
        setFalse: closeConfirmDeleteModal,
        setState: setConfirmDeleteModalState
    } = useBooleanStateControl();
    const handleDelete = () => {
        deleteMedia(album._id, {
            onSuccess() {
                toast.success("Album track deleted successfully")
                setIsEditSheetState(false)
            },
            onError() {
                toast.error("Failed to delete album track")
            }
        })
    }





    return (
        <article className="relative flex flex-col gap-2.5 rounded-xl cursor-pointer p-1 border-[0.6px]">
            <header className='absolute top-2 right-2 z-[3]'>
                <ReusableDropdownMenu
                    trigger={
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={(e) => {
                                // Stop event propagation
                                e.stopPropagation()
                            }}
                        >
                            <Ellipsis size={16} className="text-white rotate-90" />
                        </Button>
                    }
                    items={[
                        {
                            label: "View Details",
                            icon: <Eye />,
                            onClick: openViewDetailsDialog,
                        },
                        {
                            label: "Edit Details",
                            icon: <Edit2 />,
                            onClick: openEditSheet,
                        },
                        {
                            label: "Delete",
                            icon: <Trash />,
                            onClick: openConfirmDeleteModal,
                        },
                    ]}
                    contentProps={{ className: "w-52" }}
                />
            </header>
            <div
                className='flex items-center justify-center relative max-h-[150px] aspect-square'
                onClick={openViewDetailsDialog}
            >
                <Image
                    src={album.mediaDirCoverArtUrl}
                    alt={album.title}
                    className="object-cover rounded-xl z-[2] text-opacity-0 text-[0px]"
                    priority={true}
                    fill
                    onError={() => setImageError(true)}
                />
                {imageError && <Musicnote size={60} className="stroke-white z-[3]" />}
            </div>
            <footer className="px-3">
                <h6>
                    {album.title}
                </h6>
            </footer>



            <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogState}>
                <DialogTitle className="sr-only">Details</DialogTitle>
                <DialogContent className="bg-zinc-900 text-white max-w-md p-0 border-none !rounded-2xl">
                    <div className="rounded-2xl p-4">
                        <div className="rounded-2xl bg-background p-2.5">
                            <div className="flex gap-6 mb-4 p-4">
                                <div className="relative w-32 h-32 flex items-center justify-center">
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
                                            Released • {album.releaseDate ? format(new Date(album.releaseDate), 'MMM dd yyyy') : 'No date'}
                                        </div>
                                        <h2 className="text-xl font-bold mt-2">{album.title}</h2>
                                    </div>

                                    <Button
                                        size="icon"
                                        className="bg-white text-black hover:bg-gray-200 rounded-full flex items-center justify-center"
                                    >
                                        <Play className="ml-1" />
                                    </Button>
                                </div>
                            </div>

                            <div className="border-t border-zinc-700 bg-background p-4">
                                <h3 className="text-orange-500 mb-4">Details</h3>

                                <div className="grid grid-cols-2 gap-y-6">
                                    <div>
                                        <div className="text-white/50 text-sm">Artist Name</div>
                                        <div>{album.artistName}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Publisher Name</div>
                                        <div>{album.publisher}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Genre</div>
                                        <div>{album.mainGenre}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Record Label</div>
                                        <div>{album.recordLabel}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Explicit</div>
                                        <div>{album.explicitContent === 'true' ? 'Rated 18' : 'No'}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Artist Name</div>
                                        <div>{album.artistName}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Instruments</div>
                                        <div>{album.instruments?.length ? album.instruments.join(', ') : 'None'}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Copyright</div>
                                        <div>{album.copyright ? 'Yes' : 'No'}</div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="text-white/50 text-sm">Description</div>
                                    <p className="mt-2">{album.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetState}>
                <SheetContent className="w-full md:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Edit Album</SheetTitle>
                    </SheetHeader>

                    <div className="py-6">
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter track title"
                                                        hasError={!!errors.title}
                                                        errormessage={errors.title?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="artistName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Artist Name <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter artist name"
                                                        hasError={!!errors.artistName}
                                                        errormessage={errors.artistName?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mainGenre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Genre <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <SelectSimple
                                                        options={formattedData?.Genre}
                                                        isLoadingOptions={isLoadingStaticData}
                                                        value={field.value}
                                                        valueKey="value"
                                                        labelKey="label"
                                                        onChange={field.onChange}
                                                        placeholder="Select genre"
                                                        hasError={!!errors.mainGenre}
                                                        errormessage={errors.mainGenre?.message}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="releaseDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Release Date <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        hasError={!!errors.releaseDate}
                                                        errormessage={errors.releaseDate?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter track description"
                                                        className={`min-h-24 ${errors.description ? "border-red-500" : ""}`}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {errors.description && (
                                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="recordLabel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Record Label</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter record label"
                                                        hasError={!!errors.recordLabel}
                                                        errormessage={errors.recordLabel?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="publisher"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Publisher <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter publisher"
                                                        hasError={!!errors.publisher}
                                                        errormessage={errors.publisher?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="explicitContent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Explicit Content</FormLabel>
                                                <FormControl>
                                                    <SelectSimple
                                                        options={[
                                                            { label: "Yes", value: "Yes" },
                                                            { label: "No", value: "No" },
                                                        ]}
                                                        value={field.value}
                                                        valueKey="value"
                                                        labelKey="label"
                                                        onChange={field.onChange}
                                                        placeholder="Yes/No"
                                                        hasError={!!errors.explicitContent}
                                                        errormessage={errors.explicitContent?.message}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="universalProductCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Universal Product Code (UPC) <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter UPC"
                                                        hasError={!!errors.universalProductCode}
                                                        errormessage={errors.universalProductCode?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="releaseVersion"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Release Version <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter release version"
                                                        hasError={!!errors.releaseVersion}
                                                        errormessage={errors.releaseVersion?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="copyright"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Copyright <span className="text-primary">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter copyright information"
                                                        hasError={!!errors.copyright}
                                                        errormessage={errors.copyright?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className="flex justify-center mt-8">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="rounded-full"
                                        disabled={!isValid}
                                    >
                                        Update Track <ArrowRight className="ml-2 h-4 w-4" />
                                        {
                                            isUpdatinAlbum && <SmallSpinner className='ml-1.5' />
                                        }
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>


            <CustomAlertDialog
                variant={"warning"}
                open={isConfirmDeleteModalOpen}
                onOpenChange={setConfirmDeleteModalState}
                title={"Confirm Delete"}
                description={"Are you sure you want to delete this album track? This action cannot be undone."}
                actionLabel={"Go ahead, delete"}
                cancelLabel="Cancel"
                onAction={handleDelete}
                onCancel={closeConfirmDeleteModal}
                showCancel={true}
                showAction={true}
                isPerformingAction={isDeletingAlbum}
            />
        </article>
    )
}

export default AlbumCard



export const AlbumCardSkeleton = () => {
    return (
        <div className="relative flex flex-col gap-4 rounded-xl max-h-[280px]">
            <div className="absolute top-2 right-2 z-[3]">
                <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
            </div>
            <div className="h-full min-h-[110px] relative">
                <Skeleton className="w-full h-full rounded-xl bg-gray-800" />
            </div>
            <div className="px-2">
                <Skeleton className="h-5 w-3/4 bg-gray-800" />
            </div>
        </div>
    )
}
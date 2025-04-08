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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input, SelectSimple } from '@/components/ui'
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext'
import { SmallSpinner } from '@/components/icons'

import { useDeleteMedia, useUpdateMedia } from '../api'
import { TArtistMedia } from '../api/getArtisteMedias'


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
    lyrics: z.string().optional(),
    universalProductCode: z.string().min(1, "UPC is required"),
    releaseVersion: z.string().min(1, "Release version is required"),
})

type MediaUpdateFormValues = z.infer<typeof mediaUpdateSchema>



const AudioCard = ({ audio }: {
    audio: TArtistMedia,
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
        title: audio.title,
        artistName: audio.artistName || "",
        mainGenre: audio.mainGenre || "",
        releaseDate: audio.releaseDate ? new Date(audio.releaseDate).toISOString().split('T')[0] : "",
        description: audio.description || "",
        recordLabel: audio.recordLabel || "",
        publisher: audio.publisher || "",
        copyright: audio.copyright || "",
        explicitContent: audio.explicitContent || "No",
        lyrics: audio.lyrics || "",
        universalProductCode: audio.universalProductCode || "",
        releaseVersion: audio.releaseVersion || "",
    }

    const form = useForm<MediaUpdateFormValues>({
        resolver: zodResolver(mediaUpdateSchema),
        defaultValues,
        mode: "onChange"
    })

    const { handleSubmit, formState: { errors, isValid } } = form
    const { formattedData, isLoading: isLoadingStaticData } = useStaticAppInfo();
    const { mutate: updateMedia, isPending: isUpdatingMedia } = useUpdateMedia();
    const { mutate: deleteMedia, isPending: isDeletingMedia } = useDeleteMedia();
    const onSubmit = (data: MediaUpdateFormValues) => {
        const updatedAudio = {
            ...audio,
            ...data
        }
        updateMedia(updatedAudio, {
            onSuccess() {
                toast.success("Audio track updated successfully")
                setIsEditSheetState(false)
            },
            onError() {
                toast.error("Failed to update audio track")
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
        deleteMedia(audio._id, {
            onSuccess() {
                toast.success("Audio track deleted successfully")
                setIsEditSheetState(false)
            },
            onError() {
                toast.error("Failed to delete audio track")
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
                className='flex items-center justify-center relative max-h-[200px] aspect-square'
                onClick={openViewDetailsDialog}
            >
                <Image
                    src={audio.mediaCoverArtUrl || audio.mediaUrl || '/images/placeholder.png'}
                    alt={audio.title}
                    className="object-cover rounded-xl z-[2] text-opacity-0 text-[0px]"
                    priority={true}
                    fill
                    onError={() => setImageError(true)}
                />
                {imageError && <Musicnote size={60} className="stroke-white z-[3]" />}
            </div>
            <footer className="px-3">
                <h6>
                    {audio.title}
                </h6>
            </footer>



            <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogState}>
                <DialogTitle>Details</DialogTitle>
                <DialogContent className="bg-zinc-900 text-white max-w-md p-0 border-none !rounded-2xl">
                    <div className="rounded-2xl p-4">
                        <div className="rounded-2xl bg-background p-2.5">
                            <div className="flex gap-6 mb-4 p-4">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <Image
                                        src={audio.mediaCoverArtUrl || audio.mediaUrl || '/images/placeholder.png'}
                                        alt={audio.title}
                                        className="object-cover rounded-lg text-opacity-0 text-[0px]"
                                        fill
                                        onError={() => setImageError(true)}
                                    />
                                    {imageError && <Musicnote size={60} className="stroke-white z-[3]" />}
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <div className="text-orange-500 text-sm">
                                            Released • {audio.releaseDate ? format(new Date(audio.releaseDate), 'MMM dd yyyy') : 'No date'}
                                        </div>
                                        <h2 className="text-xl font-bold mt-2">{audio.title}</h2>
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
                                        <div>{audio.artistName}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Publisher Name</div>
                                        <div>{audio.publisher}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Genre</div>
                                        <div>{audio.mainGenre}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Record Label</div>
                                        <div>{audio.recordLabel}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Explicit</div>
                                        <div>{audio.explicitContent === 'true' ? 'Rated 18' : 'No'}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Artist Name</div>
                                        <div>{audio.artistName}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Instruments</div>
                                        <div>{audio.instruments?.length ? audio.instruments.join(', ') : 'None'}</div>
                                    </div>

                                    <div>
                                        <div className="text-white/50 text-sm">Copyright</div>
                                        <div>{audio.copyright ? 'Yes' : 'No'}</div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="text-white/50 text-sm">Description</div>
                                    <p className="mt-2">{audio.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


            <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetState}>
                <SheetContent className="w-full md:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Edit Audio Track</SheetTitle>
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

                                    <FormField
                                        control={form.control}
                                        name="lyrics"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lyrics</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter lyrics"
                                                        className="min-h-32"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
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
                                            isUpdatingMedia && <SmallSpinner className='ml-1.5' />
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
                description={"Are you sure you want to delete this audio track? This action cannot be undone."}
                actionLabel={"Go ahead, delete"}
                cancelLabel="Cancel"
                onAction={handleDelete}
                onCancel={closeConfirmDeleteModal}
                showCancel={true}
                showAction={true}
            />
        </article>
    )
}

export default AudioCard



export const AudioCardSkeleton = () => {
    return (
        <div className="relative flex flex-col gap-4 rounded-xl max-h-[280px]">
            <div className="absolute top-2 right-2 z-[3]">
                <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
            </div>
            <div className="h-full min-h-[150px] relative">
                <Skeleton className="w-full h-full rounded-xl bg-gray-800" />
            </div>
            <div className="px-2">
                <Skeleton className="h-5 w-3/4 bg-gray-800" />
            </div>
        </div>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useStaticAppInfo } from "@/contexts/StaticAppInfoContext";

import { useAlbumUploadStore, } from "../store";
import { Input, SelectSimple } from "@/components/ui";
import { AlbumInfoFormValues, albumInfoSchema } from "../schema";
import SelectMultipleCombo from "@/components/ui/select-multiple-combobox";

export default function Step1MusicInfo() {
    const { albumInfo, updateAlbumInfo, setCurrentStep } = useAlbumUploadStore();
    const { data: staticData, isLoading } = useStaticAppInfo();
    const [genres, setGenres] = useState<{ value: string; label: string }[]>([]);

    // Set up genres from static data when it's loaded
    useEffect(() => {
        if (staticData && staticData.MusicalInstrument) {
            const genreEntries = Object.entries(staticData.StreamingPlatform || {});
            const formattedGenres = genreEntries.map(([value, label]) => ({
                value: value.toLowerCase(),
                label
            }));
            setGenres(formattedGenres);
        } else {
            // Fallback genres if API fails
            setGenres([
                { value: "pop", label: "Pop" },
                { value: "rock", label: "Rock" },
                { value: "hiphop", label: "Hip Hop" },
                { value: "rnb", label: "R&B" },
                { value: "country", label: "Country" },
                { value: "electronic", label: "Electronic" },
                { value: "jazz", label: "Jazz" },
                { value: "classical", label: "Classical" },
                { value: "reggae", label: "Reggae" },
                { value: "folk", label: "Folk" },
                { value: "blues", label: "Blues" },
                { value: "metal", label: "Metal" },
                { value: "alternative", label: "Alternative" },
                { value: "edm", label: "EDM" },
            ]);
        }
    }, [staticData]);

    // Pre-fill form with sample valid data if no data exists
    const defaultValues = {
        title: albumInfo.title || "My Album Title",
        artistName: albumInfo.artistName || "Artist Name",
        mainGenre: albumInfo.mainGenre || "pop",
        secondaryGenres: albumInfo.secondaryGenres || [],
        releaseDate: albumInfo.releaseDate || new Date().toISOString().split('T')[0],
        description: albumInfo.description || "This is a sample description for the album.",
        recordLabel: albumInfo.recordLabel || "Sample Record Label",
        publisher: albumInfo.publisher || "Sample Publisher",
        copyright: albumInfo.copyright || "© 2025 Copyright Owner",
        explicitContent: albumInfo.explicitContent || "No",
        universalProductCode: albumInfo.universalProductCode || "123456789012",
        releaseVersion: albumInfo.releaseVersion || "1.0",
        // streamingPlatforms:
        //     ["spotify", "apple", "youtube"]
    };

    const form = useForm<AlbumInfoFormValues>({
        resolver: zodResolver(albumInfoSchema),
        defaultValues,
        mode: "onChange" // Validate on change for better user experience
    });

    // Update form when store values change (e.g. on refresh)
    useEffect(() => {
        console.log("Album info in form:", albumInfo);
        if (albumInfo) {
            // Reset the form with values from the store
            Object.keys(albumInfo).forEach((key) => {
                if (albumInfo[key as keyof typeof albumInfo] !== undefined &&
                    albumInfo[key as keyof typeof albumInfo] !== '') {
                    form.setValue(key as any, albumInfo[key as keyof typeof albumInfo]);
                }
            });
        }
    }, [albumInfo, form]);

    const { handleSubmit, formState: { errors, isValid } } = form;

    const onSubmit = (data: AlbumInfoFormValues) => {
        console.log("Form submitted with:", data);
        updateAlbumInfo(data);
        setCurrentStep('trackUpload');


        setCurrentStep('trackUpload');
        toast.success("Music info saved successfully");
    };
    console.log(errors, isValid)

    if (isLoading) {
        return <div className="text-center py-8">Loading form data...</div>;
    }

    return (
        <div className="container max-w-3xl mx-auto px-4">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            options={genres}
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
                            name="secondaryGenres"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Secondary Genre <span className="text-primary">*</span></FormLabel>
                                    <FormControl>
                                        <SelectMultipleCombo
                                            name="secondaryGenres"
                                            options={genres}
                                            values={field.value || []}
                                            showSelectedValues
                                            valueKey="value"
                                            labelKey="label"
                                            onChange={field.onChange}
                                            placeholder="Select genre"
                                            hasError={!!errors.secondaryGenres}
                                            errormessage={errors.secondaryGenres?.message}
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
                                <FormItem className="col-span-full">
                                    <FormLabel>Description <span className="text-primary">*</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter track description"
                                            className={errors.description ? "border-red-500" : ""}
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

                    <div className="flex justify-center pt-6">
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/80 text-white px-8 py-5 rounded-full"
                        >
                            Save & Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
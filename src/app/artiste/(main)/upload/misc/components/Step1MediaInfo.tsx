/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useStaticAppInfo } from "@/contexts/StaticAppInfoContext";
import { Input, SelectSimple } from "@/components/ui";
import { MOCK_GENRES } from "@/constants";
import { convertToTitleCase } from "@/utils/strings";

import { MediaInfoFormValues, mediaInfoSchema, } from "../schema";
import { useMediaUploadStore } from "../store";

export default function Step1MusicInfo() {
    const { mediaInfo, updateMediaInfo, setCurrentStep } = useMediaUploadStore();
    const { data: staticData, isLoading } = useStaticAppInfo();
    const [genres, setGenres] = useState<{ value: string; label: string }[]>([]);


    useEffect(() => {
        if (staticData && staticData.Genre) {
            const genreEntries = Object.entries(staticData.Genre || {});
            const formattedGenres = genreEntries.map(([value, label]) => ({
                value: convertToTitleCase(value),
                label
            }));
            setGenres(formattedGenres);
        } else {
            setGenres(MOCK_GENRES);
        }
    }, [staticData])


    const defaultValues = {
        title: mediaInfo.title,
        artistName: mediaInfo.artistName || "Artist Name",
        mainGenre: mediaInfo.mainGenre,
        releaseDate: mediaInfo.releaseDate || new Date().toISOString().split('T')[0],
        description: mediaInfo.description || "This is a sample description for the track.",
        recordLabel: mediaInfo.recordLabel || "Sample Record Label",
        publisher: mediaInfo.publisher || "Sample Publisher",
        copyright: mediaInfo.copyright || "© 2025 Copyright Owner",
        explicitContent: mediaInfo.explicitContent || "No",
        lyrics: mediaInfo.lyrics || "",
        universalProductCode: mediaInfo.universalProductCode || "123456789012",
        releaseVersion: mediaInfo.releaseVersion || "1.0",
    };

    const form = useForm<MediaInfoFormValues>({
        resolver: zodResolver(mediaInfoSchema),
        defaultValues,
        mode: "onChange"
    });




    const { handleSubmit, formState: { errors, isValid } } = form;

    const onSubmit = (data: MediaInfoFormValues) => {
        console.log("Form submitted with:", data);
        setCurrentStep('trackUpload');
        updateMediaInfo(data);
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

                        <FormField
                            control={form.control}
                            name="lyrics"
                            render={({ field }) => (
                                <FormItem className="col-span-full">
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

                    <div className="flex justify-center my-8">
                        <Button
                            type="submit"
                            size="lg"
                            className="rounded-full"
                        >
                            Save & Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"


import { Form, FormControl, FormField, FormItem, FormLabel, Card, CardContent, Textarea, Input, Button } from "@/components/ui"

import { type ProfileFormValues, profileSchema } from "../schemas"
import { useArtisteContext } from "@/contexts/AuthContextArtist"

export default function SectionProfile() {
    const [isEditing, setIsEditing] = useState(false)
const {artist} = useArtisteContext()
    const defaultValues: ProfileFormValues = {
        fullName: artist?.artistName ||"Mary Rose",
        stageName: "Rose",
        phoneNumber: "+234567890",
        email: "maryrose@gmail.com",
        bio: "A very shy person",
        instagram: "",
        soundcloud: "",
        tiktok: "",
        twitter: "",
        facebook: "",
        website: "",
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
        mode: "onChange",
    })

    const {
        handleSubmit,
        formState: { errors, },
    } = form

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Form submitted with:", data)
        toast.success("Profile information updated successfully")
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">Basic Information</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Full Name <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.fullName}
                                                    errormessage={errors.fullName?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="stageName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Stage Name <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.stageName}
                                                    errormessage={errors.stageName?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Phone Number <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.phoneNumber}
                                                    errormessage={errors.phoneNumber?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email Address <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.email}
                                                    errormessage={errors.email?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="col-span-full">
                                            <FormLabel>Tell us a bit about yourself (Biography)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    disabled={!isEditing}
                                                    className={`min-h-[100px] ${errors.bio ? "border-red-500" : ""}`}
                                                />
                                            </FormControl>
                                            {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-between items-center mt-8">
                        <h2 className="text-xl font-semibold flex items-center gap-2">Social Media Links</h2>
                    </div>

                    <Card className="mt-4">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Instagram profile URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.instagram}
                                                    errormessage={errors.instagram?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="soundcloud"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Soundcloud</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Soundcloud profile URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.soundcloud}
                                                    errormessage={errors.soundcloud?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tiktok"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>TikTok</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="TikTok profile URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.tiktok}
                                                    errormessage={errors.tiktok?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>X (formerly Twitter)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="X profile URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.twitter}
                                                    errormessage={errors.twitter?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facebook</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Facebook profile URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.facebook}
                                                    errormessage={errors.facebook?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Your website URL"
                                                    disabled={!isEditing}
                                                    hasError={!!errors.website}
                                                    errormessage={errors.website?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

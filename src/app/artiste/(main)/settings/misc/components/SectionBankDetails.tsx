"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Input, Button, Card, CardContent, SelectSimple, Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui"

import { type BankFormValues, bankSchema } from "../schemas"
import { useArtisteContext } from "@/contexts/AuthContextArtist"
import { useUpdateBankData } from "../api"
import { SmallSpinner, Spinner } from "@/components/icons"

export default function SectionBankDetails() {
    const [isEditing, setIsEditing] = useState(false)
    const { artist, isLoading } = useArtisteContext()

    const defaultValues: BankFormValues = {
        accountNumber: artist?.bankDetails?.accountNumber.toString() || "",
        bankName: artist?.bankDetails?.bankName || "",
        accountName: artist?.bankDetails?.accountName || "",
        sortCode: artist?.bankDetails?.sortCode || "",
        swiftCode: artist?.bankDetails?.ibanSwiftCode || "",
        payoutOption: artist?.bankDetails?.paymentOption || "monthly",
        currency: artist?.bankDetails?.currency || "naira",
    }

    const form = useForm<BankFormValues>({
        resolver: zodResolver(bankSchema),
        defaultValues,
        mode: "onChange",
    })

    const {
        handleSubmit,
        formState: { errors },
    } = form

    const { mutate, isPending } = useUpdateBankData();
    const onSubmit = (data: BankFormValues) => {
        mutate({ ...data, email: artist?.email || "" }, {
            onSuccess: () => {
                toast.success("Bank information updated successfully")
                setIsEditing(false)
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update bank data")
            },
        })
    }

    const payoutOptions = [
        { label: "Weekly", value: "weekly" },
        { label: "Bi-weekly", value: "biweekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Quarterly", value: "quarterly" },
    ]

    const currencyOptions = [
        { label: "₦ (Naira)", value: "naira" },
        { label: "$ (USD)", value: "usd" },
        { label: "€ (EUR)", value: "eur" },
        { label: "£ (GBP)", value: "gbp" },
    ]


    if (isLoading) {
        return (
            <div className="size-full flex items-center justify-center">
                <Spinner />
            </div>
        )
    }



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">Bank Details</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>Save Changes

                                {
                                    isPending && <SmallSpinner />
                                }
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} >
                            Edit Bank Details
                        </Button>
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
                                    name="accountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Account Number <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.accountNumber}
                                                    errormessage={errors.accountNumber?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bankName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Bank Name <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.bankName}
                                                    errormessage={errors.bankName?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="accountName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Account Name <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.accountName}
                                                    errormessage={errors.accountName?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sortCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sort Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.sortCode}
                                                    errormessage={errors.sortCode?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="swiftCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>IBAN Swift Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.swiftCode}
                                                    errormessage={errors.swiftCode?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="payoutOption"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Payout Option <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <SelectSimple
                                                    options={payoutOptions}
                                                    value={field.value}
                                                    labelKey="label"
                                                    valueKey="value"
                                                    placeholder="Select payout option"
                                                    onChange={field.onChange}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.payoutOption}
                                                    errormessage={errors.payoutOption?.message}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Currency <span className="text-primary">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <SelectSimple
                                                    options={currencyOptions}
                                                    value={field.value}
                                                    labelKey="label"
                                                    valueKey="value"
                                                    onChange={field.onChange}
                                                    disabled={!isEditing}
                                                    hasError={!!errors.currency}
                                                    errormessage={errors.currency?.message}
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

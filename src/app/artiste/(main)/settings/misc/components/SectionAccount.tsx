"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { type AccountDeletionFormValues, accountDeletionSchema } from "../schemas"
import { SelectSimple } from "@/components/ui"

export default function AccountSection() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const form = useForm<AccountDeletionFormValues>({
    resolver: zodResolver(accountDeletionSchema),
    defaultValues: {
      deleteReason: "",
      password: "",
    },
    mode: "onChange",
  })

  const {
    handleSubmit,
    formState: { errors, },
  } = form

  const onSubmit = (data: AccountDeletionFormValues) => {
    console.log("Form submitted with:", data)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    toast.success("Account deleted successfully")
    setShowDeleteConfirmation(false)
    // In a real app, you would redirect to a logout or home page
  }

  const deleteReasonOptions = [
    { label: "Not useful for me", value: "not-useful" },
    { label: "Too expensive", value: "too-expensive" },
    { label: "Found a better alternative", value: "found-alternative" },
    { label: "Privacy concerns", value: "privacy-concerns" },
    { label: "Other", value: "other" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-red-500">Delete Account</h2>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border border-red-200">
            <CardContent className="p-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="deleteReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Reason for Deletion? <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <SelectSimple
                          options={deleteReasonOptions}
                          value={field.value}
                          labelKey="label"
                          valueKey="value"
                          onChange={field.onChange}
                          placeholder="Select reason"
                          hasError={!!errors.deleteReason}
                          errormessage={errors.deleteReason?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please enter your current password to proceed to account deletion.{" "}
                        <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          hasError={!!errors.password}
                          errormessage={errors.password?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-600 text-sm">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Deleting your account is permanent and cannot be undone.</p>
                      <p>Please make sure that you have saved any important data before proceeding.</p>
                      <p className="mt-2">If you have any doubts, you can always cancel the deletion process.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button variant="destructive" type="submit">
                    Delete account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Confirm Account Deletion</h3>
              <p className="mb-6">
                Are you absolutely sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Yes, delete my account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

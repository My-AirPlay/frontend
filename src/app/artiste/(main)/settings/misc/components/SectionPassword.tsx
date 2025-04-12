"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { type PasswordFormValues, passwordSchema } from "../schemas"

export default function SectionPassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  const {
    handleSubmit,
    formState: { errors, },
    reset,
  } = form

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Form submitted with:", data)
    toast.success("Password changed successfully")
    setShowPasswordForm(false)
    reset()
  }

  const handleCancel = () => {
    setShowPasswordForm(false)
    reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">Password</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          {!showPasswordForm ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Change your password to keep your account secure</p>
                <Button onClick={() => setShowPasswordForm(true)} className="px-8">
                  Change Password
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Current Password <span className="text-primary">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                            hasError={!!errors.currentPassword}
                            errormessage={errors.currentPassword?.message}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        New Password <span className="text-primary">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            hasError={!!errors.newPassword}
                            errormessage={errors.newPassword?.message}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm New Password <span className="text-primary">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            hasError={!!errors.confirmPassword}
                            errormessage={errors.confirmPassword?.message}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="outline" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">Apply Changes</Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

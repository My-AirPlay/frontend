"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    category: "",
    complaint: "",
    screenshot: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    // Redirect or show success message
  }

  return (
    <div>
      <h2 className="text-xl font-medium mb-2">Report an Issue</h2>
      <p className="text-gray-400 mb-6">
        Kindly drop your complaint here and our customer representative will attend to it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Complaint Category</label>
          <Select onValueChange={(value) => setFormData({ ...formData, category: value })} value={formData.category}>
            <SelectTrigger className="w-full bg-secondary border-gray-700 text-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-gray-700 text-white">
              <SelectItem value="music-upload">Music Upload</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="royalties">Royalties</SelectItem>
              <SelectItem value="distribution">Distribution</SelectItem>
              <SelectItem value="account">Account</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">What is your complaint?</label>
          <Textarea
            placeholder="Share a reply"
            className="w-full bg-secondary border-gray-700 text-white min-h-[120px]"
            value={formData.complaint}
            onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Share a screenshot (Optional)</label>
          <div className="border border-dashed border-[#FF6B00] rounded-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-sm text-gray-400 mb-1">
                Drag & drop files or <span className="text-[#FF6B00]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">Supported formats: JPEG, PNG, GIF, MP4</p>
            </div>
            <input
              type="file"
              className="hidden"
              id="screenshot-upload"
              accept="image/jpeg,image/png,image/gif,video/mp4"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, screenshot: e.target.files[0] })
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="bg-[#FF6B00] hover:bg-[#E05F00] text-white px-10">
            Submit
            <span className="ml-2">→</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

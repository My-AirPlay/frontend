"use client"

import type React from "react"

import { useState } from "react"
import { X, Twitter, Linkedin, Instagram, Facebook } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"



export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields")
            return
        }

        const subject = `Contact Form Submission from ${formData.name}`
        const body = `Name: ${formData.name}\n
         Email: ${formData.email} \n
         Message:${formData.message}`

        const encodedSubject = encodeURIComponent(subject)
        const encodedBody = encodeURIComponent(body)

        window.location.href = `mailto:contact@airplay.com?subject=${encodedSubject}&body=${encodedBody}`

        // setFormData({ name: "", email: "", message: "" })
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-xl bg-black rounded-lg p-6 relative">
                <Link href="/artiste/support/faqs" className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Link>

                <h2 className="text-xl font-semibold text-[#FF6B00] text-center mb-6">CONTACT US</h2>

                <div className="text-center mb-6">
                    <p className="text-gray-200 mb-4">
                        We value your interest and involvement in AirPlay community. Whether you have questions, need support, or
                        want to get more involved, we're here to help.
                    </p>
                    <p className="text-gray-200">
                        Contact Number : <span className="text-[#FF6B00]">+23456789089</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Your Name"
                        className="w-full  "
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <Input
                        type="email"
                        placeholder="Your Email"
                        className="w-full  "
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <Textarea
                        placeholder="Your Message"
                        className="w-full   min-h-[120px]"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    />

                    <div className="flex justify-center mt-6">
                        <Button type="submit" className="bg-[#FF6B00] hover:bg-[#E05F00] text-white px-10">
                            Submit
                            <span className="ml-2">→</span>
                        </Button>
                    </div>
                </form>

                <div className="flex justify-center space-x-6 mt-8">
                    <a href="#" className="text-gray-400 hover:text-white">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

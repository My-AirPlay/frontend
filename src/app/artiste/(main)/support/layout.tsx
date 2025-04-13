"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle } from "lucide-react"

export default function HelpSupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <HelpCircle className="mr-2 h-5 w-5 text-[#FF6B00]" />
          <h1 className="text-2xl font-semibold">Help and Support</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          {pathname.includes("/faqs") && (
            <div className="flex space-x-2">
              <Link
                href="/artiste/support/report-issue"
                className="flex items-center px-3 py-1.5 text-sm rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700"
              >
                <span>Report an Issue</span>
              </Link>
              <Link
                href="/artiste/support/all-issues"
                className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white"
              >
                <span>Ask Question</span>
              </Link>
            </div>
          )}

          {pathname.includes("/report-issue") && (
            <Link
              href="/artiste/support/all-issues"
              className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white"
            >
              <span>View All Issues</span>
            </Link>
          )}

          {pathname.includes("/all-issues") && (
            <Link
              href="/artiste/support/faqs"
              className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white"
            >
              <span>Go Back</span>
            </Link>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}

"use client"

import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">Notifications</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-500">Pending Payment</h3>
              <p className="text-sm text-muted-foreground">Your royalties payment is still in process</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-500">Payment Successful</h3>
              <p className="text-sm text-muted-foreground">Your royalties payment was successful</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-orange-500">Exciting News!</h3>
              <p className="text-sm text-muted-foreground">We have some good news from spotify</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <span className="sr-only">Dismiss</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

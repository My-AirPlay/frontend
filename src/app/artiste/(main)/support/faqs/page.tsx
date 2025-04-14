"use client"

import { useState } from "react"
import { Search, Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function FAQsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
        "general-3": true,
        "account-3": true,
        "payment-3": true,
    })

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    return (
        <div>
            <h2 className="text-xl font-medium mb-4">FAQs</h2>

            <div className="relative mb-6">
                <Input
                    type="text"
                    placeholder="Search FAQ"
                    className="w-full bg-secondary border-gray-700 text-white pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full bg-transparent border-b border-gray-800 justify-start space-x-6 rounded-none h-auto pb-2">
                    <TabsTrigger
                        value="general"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        General Enquiries
                    </TabsTrigger>
                    <TabsTrigger
                        value="account"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        Account Setup
                    </TabsTrigger>
                    <TabsTrigger
                        value="payment"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        Payment
                    </TabsTrigger>
                    <TabsTrigger
                        value="music"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        Music Uploads
                    </TabsTrigger>
                    <TabsTrigger
                        value="contract"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        Contract Management
                    </TabsTrigger>
                    <TabsTrigger
                        value="analytics"
                        className="px-0 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF6B00] data-[state=active]:text-white rounded-none bg-transparent text-gray-400 data-[state=active]:shadow-none"
                    >
                        Analytics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">General Enquiries</h3>

                    {[1, 2, 3, 4].map((item) => (
                        <div key={`general-${item}`} className="mb-4">
                            <div
                                className="flex justify-between items-center py-3 cursor-pointer"
                                onClick={() => toggleItem(`general-${item}`)}
                            >
                                <h4 className="font-medium">Lorem ipsum dolor sit amet</h4>
                                {expandedItems[`general-${item}`] ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </div>

                            {expandedItems[`general-${item}`] && (
                                <div className="py-3 text-sm text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </div>
                            )}
                            <div className="border-b border-gray-800"></div>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="account" className="mt-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">Account Setup</h3>

                    {[1, 2, 3, 4].map((item) => (
                        <div key={`account-${item}`} className="mb-4">
                            <div
                                className="flex justify-between items-center py-3 cursor-pointer"
                                onClick={() => toggleItem(`account-${item}`)}
                            >
                                <h4 className="font-medium">Lorem ipsum dolor sit amet</h4>
                                {expandedItems[`account-${item}`] ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </div>

                            {expandedItems[`account-${item}`] && (
                                <div className="py-3 text-sm text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </div>
                            )}
                            <div className="border-b border-gray-800"></div>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">Payment</h3>

                    {[1, 2, 3, 4].map((item) => (
                        <div key={`payment-${item}`} className="mb-4">
                            <div
                                className="flex justify-between items-center py-3 cursor-pointer"
                                onClick={() => toggleItem(`payment-${item}`)}
                            >
                                <h4 className="font-medium">Lorem ipsum dolor sit amet</h4>
                                {expandedItems[`payment-${item}`] ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </div>

                            {expandedItems[`payment-${item}`] && (
                                <div className="py-3 text-sm text-gray-400">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </div>
                            )}
                            <div className="border-b border-gray-800"></div>
                        </div>
                    ))}
                </TabsContent>

                {/* Other tab contents would follow the same pattern */}
            </Tabs>

            <div className="mt-12">
                <h3 className="text-lg font-medium mb-6">Help Articles & Tutorials</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                        <div className="mb-2">📝</div>
                        <h4 className="font-medium mb-1">Music Uploads</h4>
                        <p className="text-sm text-gray-400 mb-2">
                            Ensure your music file is in an accepted format. Upload your music and compress if necessary.
                        </p>
                        <p className="text-sm text-[#FF6B00]">You can read more</p>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                        <div className="mb-2">📊</div>
                        <h4 className="font-medium mb-1">Analytics & Report</h4>
                        <p className="text-sm text-gray-400 mb-2">
                            Ensure your music file is in an accepted format. Check the file size limit and compress if necessary.
                        </p>
                        <p className="text-sm text-[#FF6B00]">You can read more</p>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                        <div className="mb-2">📄</div>
                        <h4 className="font-medium mb-1">Contract Management</h4>
                        <p className="text-sm text-gray-400 mb-2">
                            Ensure your music file is in an accepted format. Check the file size limit and compress if necessary.
                        </p>
                        <p className="text-sm text-[#FF6B00]">You can read more</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Contact Us</h3>
                    <Link
                        href={"/artiste/support/contact"}
                        className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white"
                    >
                        <span>Contact Us</span>
                    </Link>
                </div>

                <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">
                        For help and more information about AirPlay send us an email here or click the{" "}
                        <Link href="mailto:@contact@airplay.com" className="text-[#FF6B00]">link</Link> to drop your enquiries. Email:{" "}
                        <Link href="mailto:@contact@airplay.com" className="text-[#FF6B00]">contact@airplay.com</Link>
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Terms and Conditions</h3>
                <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">
                        Read our terms and conditions here: <span className="text-[#FF6B00]">terms and conditions</span>
                    </p>
                </div>
            </div>

            <div className="mt-8 mb-12">
                <h3 className="text-lg font-medium mb-4">Privacy Policy</h3>
                <div className="bg-secondary rounded-lg p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">
                        Read our privacy policy here: <span className="text-[#FF6B00]">privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

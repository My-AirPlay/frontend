"use client"
import Link from "next/link"

export default function AllIssuesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">All Issues</h2>
        <Link
          href="/artiste/support/faqs"
          className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white"
        >
          <span>Go Back</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div>
          <div className="bg-red-500/20 py-2 px-4 rounded-t-md">
            <h3 className="font-medium">Pending</h3>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs text-gray-400 mb-2">Image attached</div>
              <h4 className="font-medium mb-1">Music Uploads</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs text-gray-400 mb-2">No image attached</div>
              <h4 className="font-medium mb-1">Distribution Issues</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs text-gray-400 mb-2">Image attached</div>
              <h4 className="font-medium mb-1">Music Uploads</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="text-xs text-gray-400 mb-2">No image attached</div>
              <h4 className="font-medium mb-1">Distribution Issues</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <div className="bg-[#FF6B00] py-2 px-4 rounded-t-md">
            <h3 className="font-medium">In Progress</h3>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-secondary rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="text-xs text-gray-400">Image attached</div>
                <div className="text-xs bg-[#FF6B00] px-2 py-0.5 rounded text-white">Email sent</div>
              </div>
              <h4 className="font-medium mb-1">Service issue</h4>
              <p className="text-sm text-gray-400 mb-2">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
              <div className="flex items-center text-xs text-gray-400">
                <span className="inline-block w-3 h-3 bg-[#FF6B00] rounded-full mr-2"></span>
                Customer Representative
              </div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="text-xs text-gray-400">Image attached</div>
                <div className="text-xs bg-[#FF6B00] px-2 py-0.5 rounded text-white">Email sent</div>
              </div>
              <h4 className="font-medium mb-1">Service issue</h4>
              <p className="text-sm text-gray-400 mb-2">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
              <div className="flex items-center text-xs text-gray-400">
                <span className="inline-block w-3 h-3 bg-[#FF6B00] rounded-full mr-2"></span>
                Customer Representative
              </div>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="text-xs text-gray-400">Image attached</div>
                <div className="text-xs bg-[#FF6B00] px-2 py-0.5 rounded text-white">Email sent</div>
              </div>
              <h4 className="font-medium mb-1">Service issue</h4>
              <p className="text-sm text-gray-400 mb-2">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
              <div className="flex items-center text-xs text-gray-400">
                <span className="inline-block w-3 h-3 bg-[#FF6B00] rounded-full mr-2"></span>
                Customer Representative
              </div>
            </div>
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <div className="bg-green-500/20 py-2 px-4 rounded-t-md">
            <h3 className="font-medium">Completed</h3>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-secondary rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-400">Resolved via mail</div>
              </div>
              <h4 className="font-medium mb-1">Royalties</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>

            <div className="bg-secondary rounded-md p-4">
              <div className="flex justify-between mb-2">
                <div className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-400">Resolved via mail</div>
              </div>
              <h4 className="font-medium mb-1">Royalties</h4>
              <p className="text-sm text-gray-400">I can&apos;t upload my music on the dashboard, it is Unresponsive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

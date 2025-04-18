'use client';
import Link from 'next/link';
import { useListAllIssue } from '../misc/api';

export default function AllIssuesPage() {
	const { data } = useListAllIssue();

	// Filter issues by status
	const pendingIssues = data?.data?.filter(issue => issue.status === 'Pending') || [];
	const inProgressIssues = data?.data?.filter(issue => issue.status === 'In Progress') || [];
	const completedIssues = data?.data?.filter(issue => issue.status === 'Completed') || [];

	// Helper function to truncate text
	interface TruncateTextParams {
		text: string;
		maxLength?: number;
	}

	const truncateText = ({ text, maxLength = 100 }: TruncateTextParams): string => {
		if (!text) return '';
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-medium">All Issues</h2>
				<Link href="/artiste/support/report-issue" className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white">
					<span>Report an issue</span>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Pending Column */}
				<div>
					<div className="bg-red-500/20 py-2 px-4 rounded-t-md">
						<h3 className="font-medium">Pending</h3>
					</div>

					<div className="space-y-4 mt-4">
						{pendingIssues.length > 0 ? (
							pendingIssues.map(issue => (
								<div key={issue._id} className="bg-secondary rounded-md p-4">
									<div className="text-xs text-gray-400 mb-2">
										{/* Assuming no image attachment info in the data */}
										No image attached
									</div>
									<h4 className="font-medium mb-1">{issue.complaintType}</h4>
									<p className="text-sm text-gray-400">{truncateText({ text: issue.complain })}</p>
								</div>
							))
						) : (
							<div className="bg-secondary rounded-md p-4 text-center text-gray-400">No pending issues</div>
						)}
					</div>
				</div>

				{/* In Progress Column */}
				<div>
					<div className="bg-[#FF6B00] py-2 px-4 rounded-t-md">
						<h3 className="font-medium">In Progress</h3>
					</div>

					<div className="space-y-4 mt-4">
						{inProgressIssues.length > 0 ? (
							inProgressIssues.map(issue => (
								<div key={issue._id} className="bg-secondary rounded-md p-4">
									<div className="flex justify-between mb-2">
										<div className="text-xs text-gray-400">No image attached</div>
										<div className="text-xs bg-[#FF6B00] px-2 py-0.5 rounded text-white">Email sent</div>
									</div>
									<h4 className="font-medium mb-1">{issue.complaintType}</h4>
									<p className="text-sm text-gray-400 mb-2">{truncateText({ text: issue.complain })}</p>
									<div className="flex items-center text-xs text-gray-400">
										<span className="inline-block w-3 h-3 bg-[#FF6B00] rounded-full mr-2"></span>
										Customer Representative
									</div>
								</div>
							))
						) : (
							<div className="bg-secondary rounded-md p-4 text-center text-gray-400">No issues in progress</div>
						)}
					</div>
				</div>

				{/* Completed Column */}
				<div>
					<div className="bg-green-500/20 py-2 px-4 rounded-t-md">
						<h3 className="font-medium">Completed</h3>
					</div>

					<div className="space-y-4 mt-4">
						{completedIssues.length > 0 ? (
							completedIssues.map(issue => (
								<div key={issue._id} className="bg-secondary rounded-md p-4">
									<div className="flex justify-between mb-2">
										<div className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-400">Resolved via mail</div>
									</div>
									<h4 className="font-medium mb-1">{issue.complaintType}</h4>
									<p className="text-sm text-gray-400">{truncateText({ text: issue.complain })}</p>
								</div>
							))
						) : (
							<div className="bg-secondary rounded-md p-4 text-center text-gray-400">No completed issues</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

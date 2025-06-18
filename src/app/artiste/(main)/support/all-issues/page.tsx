'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useListAllIssue } from '../misc/api';
import { Button } from '@/components/ui/button';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { cn } from '@/lib/utils';
import moment from 'moment';

// Helper component for a visually distinct status badge
const StatusBadge = ({ status }: { status: string }) => {
	return <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', status === 'Pending' && 'bg-red-500/20 text-red-400', status === 'Processing' && 'bg-amber-500/20 text-amber-400', status === 'Resolved' && 'bg-green-500/20 text-green-400')}>{status}</span>;
};

export default function AllIssuesPage() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// 1. Read page, limit, and status from URL for server-side pagination/filtering
	const page = Number(searchParams.get('page') || '1');
	const limit = Number(searchParams.get('limit') || '10');

	// 2. Pass pagination and filter parameters to the API hook
	const { data: issuesData, isPending } = useListAllIssue({
		page,
		limit
	});

	const issues = issuesData?.data || [];
	const totalPages = issuesData?.totalPages || 1;

	// Helper function to update URL search params and trigger a re-fetch
	const updateQueryParams = (paramsToUpdate: Record<string, string | number>) => {
		const params = new URLSearchParams(searchParams.toString());
		Object.entries(paramsToUpdate).forEach(([key, value]) => {
			params.set(key, String(value));
		});
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// --- Event Handlers ---
	const handleNextPage = () => {
		if (page < totalPages) {
			updateQueryParams({ page: page + 1 });
		}
	};

	const handlePrevPage = () => {
		if (page > 1) {
			updateQueryParams({ page: page - 1 });
		}
	};

	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// Reset to page 1 when limit changes
		updateQueryParams({ limit: Number(e.target.value), page: 1 });
	};

	return (
		<div className="space-y-6">
			<header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<h2 className="text-xl font-medium">All Issues</h2>
				<div className="flex items-center gap-4">
					<Link href="/artiste/support/report-issue" className="flex items-center px-3 py-1.5 text-sm rounded-md bg-[#FF6B00] hover:bg-[#E05F00] text-white">
						<span>Report an issue</span>
					</Link>
				</div>
			</header>

			{/* 3. New List-Based Layout */}
			<div className="bg-secondary rounded-lg border border-border">
				{isPending ? (
					<div className="p-10 flex justify-center">
						<LoadingBox />
					</div>
				) : issues.length > 0 ? (
					issues.map(issue => (
						<div key={issue._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-white/5 transition-colors">
							<div className="mb-4 md:mb-0">
								<div className="flex items-center gap-3 mb-1">
									<h4 className="font-medium">{issue.complaintType}</h4>
									<StatusBadge status={issue.status} />
								</div>
								<p className="text-sm text-gray-400">
									ID: {issue.complaintId} &bull; Date: {moment(issue.createdAt).format('DD MMM, YYYY')}
								</p>
							</div>
							<Link href={`/artiste/support/all-issues/${issue._id}?complaintId=${issue.complaintId}`}>
								<Button variant="outline">View Details</Button>
							</Link>
						</div>
					))
				) : (
					<div className="p-10 text-center text-gray-400">No issues found for the selected filter.</div>
				)}
			</div>

			{/* 4. Pagination Controls */}
			{issues.length > 0 && (
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2">
						<Button onClick={handlePrevPage} disabled={page <= 1} variant="outline" size="icon" className="h-8 w-8">
							<ArrowLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm text-gray-400">
							Page {page} of {totalPages}
						</span>
						<Button onClick={handleNextPage} disabled={page >= totalPages} variant="outline" size="icon" className="h-8 w-8">
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-400">Rows per page:</span>
						<select className="bg-secondary border border-border rounded-md p-1 text-sm" value={limit} onChange={handleLimitChange}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
}

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-40" />
				<Skeleton className="h-10 w-32 rounded-md" />
			</div>
			<div className="flex gap-3">
				<Skeleton className="h-9 w-28 rounded-md" />
				<Skeleton className="h-9 w-28 rounded-md" />
				<Skeleton className="h-9 w-28 rounded-md" />
			</div>
			<div className="border border-border rounded-lg overflow-hidden">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
						<Skeleton className="h-10 w-10 rounded-full" />
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-48 ml-auto" />
						<Skeleton className="h-6 w-20 rounded-full" />
					</div>
				))}
			</div>
		</div>
	);
}

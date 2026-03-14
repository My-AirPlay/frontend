import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-10 w-64 rounded-md" />
			</div>
			<div className="border border-border rounded-lg overflow-hidden">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
						<Skeleton className="h-10 w-10 rounded-full" />
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-4 w-20 ml-auto" />
					</div>
				))}
			</div>
		</div>
	);
}

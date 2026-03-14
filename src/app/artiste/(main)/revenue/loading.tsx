import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="space-y-6">
			<Skeleton className="h-8 w-40" />
			<div className="grid md:grid-cols-3 gap-4">
				<Skeleton className="h-28 rounded-lg" />
				<Skeleton className="h-28 rounded-lg" />
				<Skeleton className="h-28 rounded-lg" />
			</div>
			<Skeleton className="h-64 rounded-lg" />
		</div>
	);
}

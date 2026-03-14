import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="p-6 max-md:px-4 lg:px-10 space-y-6">
			<Skeleton className="h-8 w-48" />
			<div className="grid md:grid-cols-3 gap-4">
				<Skeleton className="h-32 rounded-lg" />
				<Skeleton className="h-32 rounded-lg" />
				<Skeleton className="h-32 rounded-lg" />
			</div>
			<Skeleton className="h-64 rounded-lg" />
		</div>
	);
}

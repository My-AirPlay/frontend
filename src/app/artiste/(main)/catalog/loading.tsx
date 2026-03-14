import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-40" />
				<Skeleton className="h-10 w-32 rounded-md" />
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="bg-secondary rounded-lg overflow-hidden">
						<Skeleton className="h-40 w-full" />
						<div className="p-4 space-y-2">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

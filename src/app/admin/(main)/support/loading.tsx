import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="space-y-6">
			<Skeleton className="h-8 w-40" />
			<div className="grid md:[grid-template-columns:repeat(auto-fill,minmax(350px,1fr))] gap-x-6 gap-y-5">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="bg-custom-gradient px-5 py-4 rounded-lg space-y-4">
						<Skeleton className="h-8 w-24 rounded-full ml-auto" />
						<div className="p-4 space-y-3">
							<Skeleton className="h-5 w-40" />
							<div className="grid grid-cols-2 gap-4">
								<Skeleton className="h-10" />
								<Skeleton className="h-10" />
								<Skeleton className="h-10" />
								<Skeleton className="h-10" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

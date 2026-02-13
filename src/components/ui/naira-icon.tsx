import { cn } from '@/lib/utils';

export function NairaIcon({ className, size = 20 }: { className?: string; size?: number }) {
	return (
		<svg className={cn(className)} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M5 20V4l14 16V4" />
			<line x1="3" y1="10" x2="21" y2="10" />
			<line x1="3" y1="14" x2="21" y2="14" />
		</svg>
	);
}

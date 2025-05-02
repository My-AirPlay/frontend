import { useState } from 'react';
import Image from 'next/image';

import React from 'react';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Props {
	index: number;
	platform: { value: string; label: string };
	selectedPlatforms: string[];
	handleToggle: (value: string) => void;
}
const Step4MediaDistributionPlatformCard = ({ index, platform, selectedPlatforms, handleToggle }: Props) => {
	const label = platform.label;
	return (
		<Card key={index} className={`p-4 cursor-pointer text-center transition-all ${selectedPlatforms.includes(platform.value) ? 'border-primary bg-black/50' : 'border-gray-600 hover:border-gray-400'}`} onClick={() => handleToggle(platform.value)}>
			<div className="flex flex-col items-center">
				<PlatformImage label={label} isSelected={selectedPlatforms.includes(platform.value)} />

				<p className="text-sm font-medium">{label}</p>
			</div>
		</Card>
	);
};

export default Step4MediaDistributionPlatformCard;

interface PlatformImageProps {
	label: string;
	className?: string;
	isSelected?: boolean;
}
export const PlatformImage = ({ label, className, isSelected }: PlatformImageProps) => {
	const [src, setSrc] = useState(`/images/platform_logos/${label.toLowerCase()}.png`);

	return (
		<div className={cn('relative w-12 h-12 rounded-full bg-gray-700 mb-3 flex items-center justify-center', className)}>
			<Image
				src={src}
				alt={label}
				priority
				fill
				className={cn('rounded-full text-[0rem] text-opacity-0 bg-gray-700 z-[2]')}
				style={{ filter: isSelected ? 'none' : 'grayscale(1)' }}
				onError={() => {
					if (src.endsWith('.png')) setSrc(`/images/platform_logos/${label.toLowerCase()}.jpg`);
					else if (src.endsWith('.jpg')) setSrc(`/images/platform_logos/${label.toLowerCase()}.svg`);
					else if (src.endsWith('.svg')) setSrc(`/images/platform_logos/${label.toLowerCase()}.webp`);
					else setSrc('/images/platform_logos/platform.svg');
				}}
			/>
			<span className="text-xl font-bold">{label.charAt(0)}</span>
		</div>
	);
};

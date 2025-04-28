'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './button';

const PreviousPageButton = ({ target = null }) => {
	const router = useRouter();

	return (
		<Button variant="outline" className="bg-secondary text-foreground border-border" onClick={() => (target ? router.push(`${target}`) : router.back())}>
			<ChevronLeft size={16} className="mr-2" />
			<span>Previous Page</span>
		</Button>
	);
};

export default PreviousPageButton;

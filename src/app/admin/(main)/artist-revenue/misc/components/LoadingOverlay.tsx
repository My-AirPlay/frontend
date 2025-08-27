import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

export const PublishingOverlay: React.FC = () => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col justify-center items-center space-y-4">
			<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="flex flex-col items-center">
				<LoaderCircle className="w-12 h-12 animate-spin text-primary mb-4" />
				<h2 className="text-xl font-semibold text-white">Publishing Matched Records...</h2>
				<p className="text-gray-300">Please wait, this may take a moment.</p>
			</motion.div>
		</div>
	);
};

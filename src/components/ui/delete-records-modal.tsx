// components/ui/deletion-progress-modal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, CheckCircle, Wand2, PartyPopper } from 'lucide-react';

interface DeletionProgressModalProps {
	isOpen: boolean;
	onClose: () => void;
	reportIdsToDelete: string[];
}

const deletionSteps = ['Locating credit transactions...', 'Purging transaction records...', 'Finding associated published reports...', 'Disintegrating reports from existence...', 'Sweeping up the digital dust...', 'All done!'];

const DeletionProgressModal: React.FC<DeletionProgressModalProps> = ({ isOpen, onClose, reportIdsToDelete }) => {
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		if (isOpen) {
			// Reset step on open
			setCurrentStep(0);
			console.log('Starting deletion for reports:', reportIdsToDelete);

			const interval = setInterval(() => {
				setCurrentStep(prevStep => {
					if (prevStep < deletionSteps.length - 1) {
						return prevStep + 1;
					}
					clearInterval(interval);
					return prevStep;
				});
			}, 3500);

			return () => clearInterval(interval);
		}
	}, [isOpen, reportIdsToDelete]);

	const isComplete = currentStep === deletionSteps.length - 1;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
					<motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-background rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
						<motion.div
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, 10, -10, 0]
							}}
							transition={{
								duration: 0.8,
								repeat: isComplete ? 1 : Infinity,
								repeatType: 'reverse'
							}}
						>
							{isComplete ? <PartyPopper size={48} className="mx-auto text-primary/50" /> : <Wand2 size={48} className="mx-auto text-primary" />}
						</motion.div>

						<h2 className="text-2xl text-primary font-bold mt-4">{isComplete ? 'Poof! All Gone!' : 'Magic in Progress...'}</h2>
						<p className="text-white mt-2 mb-6">Your request is being processed. Feel free to grab a coffee or close this window — we&#39;ll handle things from here!</p>

						<div className="text-left space-y-3">
							{deletionSteps.map((step, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{
										opacity: index <= currentStep ? 1 : 0.5,
										x: index <= currentStep ? 0 : -20
									}}
									transition={{ delay: index * 0.1 }}
									className="flex items-center space-x-3"
								>
									{index < currentStep ? <CheckCircle size={20} className="text-primary/50" /> : index === currentStep && !isComplete ? <Loader size={20} className="animate-spin text-primary" /> : <CheckCircle size={20} className={isComplete ? 'text-primary/50' : 'text-gray-300'} />}
									<span className={index < currentStep ? 'text-gray-500 line-through' : index === currentStep && !isComplete ? 'text-primary font-semibold' : isComplete ? 'text-gray-500 line-through' : 'text-gray-500'}>{step}</span>
								</motion.div>
							))}
						</div>

						<button onClick={onClose} disabled={!isComplete} className="mt-8 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/50 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
							{isComplete ? (
								<>
									<PartyPopper size={20} /> Great, Thanks!
								</>
							) : (
								'Processing...'
							)}
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DeletionProgressModal;

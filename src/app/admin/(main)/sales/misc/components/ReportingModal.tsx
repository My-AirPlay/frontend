/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'; // Assuming this is the correct path to your Button component

// Define the props for the modal component
interface ReportingPeriodModalProps {
	onClose: () => void;
	onSave: (period: string) => void;
	isLoading: boolean;
}

const ReportingPeriodModal: React.FC<ReportingPeriodModalProps> = ({ onClose, onSave, isLoading }) => {
	// State to hold the input value for the reporting period
	const [period, setPeriod] = useState<string>('');
	// State for the validation error message
	const [error, setError] = useState<string | null>(null);

	// Regex to validate the MMM-YYYY format (e.g., JAN-2025). Case-insensitive.
	const periodRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-\d{4}$/i;

	/**
	 * Handles changes to the input field, converting to uppercase and clearing errors.
	 */
	const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Automatically convert input to uppercase for consistency
		const value = e.target.value.toUpperCase();
		setPeriod(value);
		// Clear the error message as the user types
		if (error) {
			setError(null);
		}
	};

	/**
	 * Validates the input and calls the onSave prop if the format is correct.
	 */
	const handleSave = () => {
		// Validate the input against the MMM-YYYY regex
		if (!periodRegex.test(period)) {
			const errorMessage = 'Invalid format. Please use MMM-YYYY (e.g., AUG-2025).';
			setError(errorMessage);
			toast.error(errorMessage); // Also show a toast notification for better UX
			return;
		}
		// If validation passes, call the onSave callback from the parent component
		onSave(period);
	};

	return (
		// Modal overlay, covering the entire screen
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			{/* Modal content with entry/exit animation */}
			<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md space-y-4 rounded-lg bg-[#272727] p-6 shadow-xl">
				<h2 className="text-xl font-semibold text-white">Set Reporting Period</h2>
				<p className="text-sm text-gray-400">Please enter the reporting period for the sales data. This will be associated with the uploaded records.</p>

				{/* Input field for the reporting period */}
				<div>
					<label htmlFor="reporting-period" className="mb-2 block text-sm font-medium text-gray-300">
						Reporting Period (MMM-YYYY)
					</label>
					<input
						type="text"
						id="reporting-period"
						value={period}
						onChange={handlePeriodChange}
						placeholder="e.g., AUG-2025"
						className={`w-full rounded-md bg-[#333] p-3 text-white
              ${error ? 'border-red-500' : 'border-gray-600'}
              border focus:outline-none focus:ring-2 focus:ring-primary`}
						aria-invalid={!!error}
						aria-describedby="period-error"
					/>
					{error && (
						<p id="period-error" className="mt-2 text-xs text-red-500">
							{error}
						</p>
					)}
				</div>

				{/* Action buttons */}
				<div className="mt-6 flex justify-end gap-4">
					<Button variant="outline" onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
					<Button
						className="bg-primary hover:bg-primary/90"
						onClick={handleSave}
						disabled={!period || isLoading} // Disable if input is empty or a request is in progress
						isLoading={isLoading}
					>
						Save Period
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

export default ReportingPeriodModal;

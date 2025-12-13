import React from 'react';
import { X, Calendar, BarChart2, Mic, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

interface Report {
	reportId: string;
	createdAt: string;
	activityPeriods: string[];
	artistNames: string[];
	revenue: number;
	name: string;
}

interface ReportModalProps {
	report: Report | null;
	onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
	if (!report) {
		return null;
	}
	const grossRevenue = report.revenue / 0.8;

	const formattedDate = new Date(report.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="bg-background rounded-lg shadow-xl p-6 w-full max-w-lg relative">
				{/* Close Button */}
				<button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
					<X size={24} />
				</button>

				{/* Header */}
				<div className="flex items-center space-x-3 mb-4">
					<div className="bg-indigo-100 p-2 rounded-md">
						<FileText className="text-indigo-600" size={24} />
					</div>
					<div>
						<h2 className="text-xl font-semibold">{report.name}</h2>
						<p className="text-sm text-gray-500">{report.reportId}</p>
					</div>
				</div>

				{/* Body */}
				<div className="space-y-4">
					<div className="p-4 rounded-md border bg-background">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="text-sm text-gray-500 mb-1">Gross Revenue</div>
								<p className="text-xl font-bold text-primary">{formatCurrency(grossRevenue, 'NGN')}</p>
							</div>
							<div className="text-right">
								<div className="text-sm text-gray-500 mb-1">Net Revenue</div>
								<p className="text-xl font-semibold text-primary">{formatCurrency(report.revenue, 'NGN')}</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* ✨ UPDATED ARTIST LIST SECTION ✨ */}
						<div className="p-4 rounded-md border">
							<div className="flex items-center text-sm text-gray-500 mb-2">
								<Mic size={16} className="mr-2" /> Artist(s)
							</div>
							<div className="max-h-24 overflow-y-auto flex flex-wrap gap-2">click into report to view</div>
							{/* Scrollable container for artist names */}
							{/*<div className="max-h-24 overflow-y-auto flex flex-wrap gap-2">
								{report.artistNames.map((name, index) => (
									<span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
										{name}
									</span>
								))}
							</div>*/}
						</div>
						{/* END OF UPDATED SECTION */}

						<div className="p-4 rounded-md border">
							<div className="flex items-center text-sm text-gray-500 mb-2">
								<BarChart2 size={16} className="mr-2" /> Activity Period
							</div>
							<p className="font-medium">{report.activityPeriods.join(', ')}</p>
						</div>
					</div>
					<div className="p-4 rounded-md border">
						<div className="flex items-center text-sm text-gray-500 mb-2">
							<Calendar size={16} className="mr-2" /> Date Published
						</div>
						<p className="font-medium">{formattedDate}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportModal;

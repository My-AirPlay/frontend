import React from 'react';
import { Button } from '@/components/ui';

interface SuccessModalProps {
	type: 'created' | 'matched';
	artistName?: string;
	artistRealName?: string;
	onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ type, artistName = 'Edwin', artistRealName = 'Edwin Mark', onClose }) => {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-secondary p-8 rounded-lg max-w-md w-full mx-4">
				<h2 className="text-xl font-semibold text-primary text-center mb-6">{type === 'created' ? 'Artist Created Successfully' : 'Artist Match Successful'}</h2>

				{type === 'created' ? (
					<div className="text-center mb-6">
						<p className="mb-4">The Artist You Created &quot;{artistName}&quot; has been Saved Successfully.</p>
						<div className="space-y-2">
							<p>
								Artist Name: <span className="text-primary">{artistName}</span>
							</p>
							<p>
								Artist Real Name: <span className="text-primary">{artistRealName}</span>
							</p>
						</div>
					</div>
				) : (
					<div className="text-center mb-6">
						<p className="mb-4">You Have Successfully Matched Your Artist To A Profile</p>
						<p>
							Status: <span className="text-primary">Matched</span>
						</p>
					</div>
				)}

				<div className="flex justify-center">
					<Button className="bg-primary hover:bg-primary/90 text-white px-8" onClick={onClose}>
						{type === 'created' ? 'Done' : 'Continue'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SuccessModal;

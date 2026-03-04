'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSignContract } from '../api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { handleClientError } from '@/lib/utils';
import { FileText, CheckCircle } from 'lucide-react';

const SectionContract = () => {
	const { artist, dispatch } = useAuthContext();
	const contract = artist?.contractDetails;
	const sigCanvas = useRef<SignatureCanvas>(null);
	const [agreed, setAgreed] = useState(false);
	const { mutateAsync, isPending } = useSignContract();

	if (!contract?.contract) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<FileText className="h-16 w-16 text-muted-foreground mb-4" />
				<h3 className="text-lg font-semibold mb-2">No Contract Available</h3>
				<p className="text-muted-foreground">No contract has been uploaded yet. Please check back later.</p>
			</div>
		);
	}

	const isSigned = contract.status === 'ACTIVE' && contract.signedAt;

	const handleSign = async () => {
		if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
			toast.error('Please draw your signature before signing.');
			return;
		}

		try {
			const canvas = sigCanvas.current.getCanvas();
			const dataUrl = canvas.toDataURL('image/png');
			const res = await fetch(dataUrl);
			const blob = await res.blob();
			const updatedArtist = await mutateAsync(blob);
			toast.success('Contract signed successfully!');
			dispatch({ type: 'ARTISTE_LOGIN_SUCCESS', payload: updatedArtist });
		} catch (error) {
			console.log(error);
			handleClientError(error);
		}
	};

	const clearSignature = () => {
		sigCanvas.current?.clear();
	};

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
				<div>
					<p className="text-sm text-muted-foreground">Start Date</p>
					<p className="font-medium">{new Date(contract.startDate).toLocaleDateString()}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">End Date</p>
					<p className="font-medium">{new Date(contract.endDate).toLocaleDateString()}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Status</p>
					<p className="font-medium">{contract.status}</p>
				</div>
			</div>

			<div className="border rounded-lg overflow-hidden">
				<iframe src={contract.contract} className="w-full h-[500px]" title="Contract Document" />
			</div>

			{isSigned ? (
				<div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
					<CheckCircle className="h-5 w-5 text-green-600" />
					<p className="text-green-800 dark:text-green-200 font-medium">Signed on {new Date(contract.signedAt!).toLocaleDateString()}</p>
				</div>
			) : (
				<>
					<label className="flex items-start gap-3 cursor-pointer">
						<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300" />
						<span className="text-sm">I have read and agree to the terms of this contract</span>
					</label>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium">Your Signature</p>
							<button type="button" onClick={clearSignature} className="text-xs text-muted-foreground hover:text-foreground underline">
								Clear
							</button>
						</div>
						<div className="border rounded-lg bg-white">
							<SignatureCanvas
								ref={sigCanvas}
								canvasProps={{
									className: 'w-full h-40',
									style: { width: '100%', height: '160px' }
								}}
								penColor="black"
							/>
						</div>
					</div>

					<Button onClick={handleSign} disabled={!agreed || isPending} isLoading={isPending} size="lg" className="w-full sm:w-auto">
						Sign Contract
					</Button>
				</>
			)}
		</div>
	);
};

export default SectionContract;

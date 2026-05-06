/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef } from 'react';
import { Button, Card } from '@/components/ui';
import { toast } from 'sonner';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useFugaMutations, useGetFugaCodeStats } from '@/app/admin/(main)/fuga/api/fugaApi';
import { FileUp, File, X } from 'lucide-react';

const CodesTab = () => {
	const { data: stats, isLoading } = useGetFugaCodeStats();
	const { uploadCodesMutation } = useFugaMutations();

	const [upcFile, setUpcFile] = useState<File | null>(null);
	const [isrcFile, setIsrcFile] = useState<File | null>(null);

	const upcInputRef = useRef<HTMLInputElement>(null);
	const isrcInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (type: 'UPC' | 'ISRC') => {
		const file = type === 'UPC' ? upcFile : isrcFile;
		if (!file) {
			toast.error(`Please select a CSV file for ${type} codes.`);
			return;
		}

		try {
			const formData = new FormData();
			formData.append('type', type);
			formData.append('file', file);

			const result = await uploadCodesMutation.mutateAsync(formData as any);
			toast.success(`Successfully uploaded ${result.added} codes. ${result.skipped} were duplicates.`);

			if (type === 'UPC') {
				setUpcFile(null);
				if (upcInputRef.current) upcInputRef.current.value = '';
			} else {
				setIsrcFile(null);
				if (isrcInputRef.current) isrcInputRef.current.value = '';
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to upload codes');
		}
	};

	if (isLoading) {
		return (
			<div className="h-64 flex items-center justify-center">
				<LoadingBox size={40} />
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* UPC Section */}
				<Card className="p-6 border-admin-border flex flex-col justify-between">
					<div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">UPC Codes</h3>
							<div className="text-sm">
								<span className="text-green-500 font-bold">{stats?.upc?.available || 0}</span> available /<span className="text-muted-foreground ml-1">{stats?.upc?.used || 0}</span> used
							</div>
						</div>

						<div className="border-2 border-dashed border-admin-border rounded-lg p-8 flex flex-col items-center justify-center mb-4 min-h-[160px] bg-admin-secondary/20">
							{upcFile ? (
								<div className="flex flex-col items-center text-center">
									<div className="bg-primary/20 p-3 rounded-full mb-3">
										<File className="w-8 h-8 text-primary" />
									</div>
									<p className="font-medium text-sm mb-1">{upcFile.name}</p>
									<p className="text-xs text-muted-foreground mb-4">{(upcFile.size / 1024).toFixed(1)} KB</p>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setUpcFile(null);
											if (upcInputRef.current) upcInputRef.current.value = '';
										}}
									>
										<X className="w-4 h-4 mr-2" /> Remove File
									</Button>
								</div>
							) : (
								<div className="flex flex-col items-center text-center">
									<FileUp className="w-10 h-10 text-muted-foreground mb-3" />
									<p className="text-sm font-medium mb-1">Upload CSV File</p>
									<p className="text-xs text-muted-foreground mb-4">File should contain UPC codes</p>
									<Button variant="secondary" size="sm" onClick={() => upcInputRef.current?.click()}>
										Browse Files
									</Button>
								</div>
							)}
							<input type="file" accept=".csv" className="hidden" ref={upcInputRef} onChange={e => setUpcFile(e.target.files?.[0] || null)} />
						</div>
					</div>
					<Button className="w-full mt-auto" onClick={() => handleUpload('UPC')} disabled={uploadCodesMutation.isPending || !upcFile}>
						{uploadCodesMutation.isPending && upcFile ? 'Uploading...' : 'Upload UPCs'}
					</Button>
				</Card>

				{/* ISRC Section */}
				<Card className="p-6 border-admin-border flex flex-col justify-between">
					<div>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold">ISRC Codes</h3>
							<div className="text-sm">
								<span className="text-green-500 font-bold">{stats?.isrc?.available || 0}</span> available /<span className="text-muted-foreground ml-1">{stats?.isrc?.used || 0}</span> used
							</div>
						</div>

						<div className="border-2 border-dashed border-admin-border rounded-lg p-8 flex flex-col items-center justify-center mb-4 min-h-[160px] bg-admin-secondary/20">
							{isrcFile ? (
								<div className="flex flex-col items-center text-center">
									<div className="bg-primary/20 p-3 rounded-full mb-3">
										<File className="w-8 h-8 text-primary" />
									</div>
									<p className="font-medium text-sm mb-1">{isrcFile.name}</p>
									<p className="text-xs text-muted-foreground mb-4">{(isrcFile.size / 1024).toFixed(1)} KB</p>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											setIsrcFile(null);
											if (isrcInputRef.current) isrcInputRef.current.value = '';
										}}
									>
										<X className="w-4 h-4 mr-2" /> Remove File
									</Button>
								</div>
							) : (
								<div className="flex flex-col items-center text-center">
									<FileUp className="w-10 h-10 text-muted-foreground mb-3" />
									<p className="text-sm font-medium mb-1">Upload CSV File</p>
									<p className="text-xs text-muted-foreground mb-4">File should contain ISRC codes</p>
									<Button variant="secondary" size="sm" onClick={() => isrcInputRef.current?.click()}>
										Browse Files
									</Button>
								</div>
							)}
							<input type="file" accept=".csv" className="hidden" ref={isrcInputRef} onChange={e => setIsrcFile(e.target.files?.[0] || null)} />
						</div>
					</div>
					<Button className="w-full mt-auto" onClick={() => handleUpload('ISRC')} disabled={uploadCodesMutation.isPending || !isrcFile}>
						{uploadCodesMutation.isPending && isrcFile ? 'Uploading...' : 'Upload ISRCs'}
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default CodesTab;

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback, DragEvent, FC } from 'react';
import { streamingPlatformsList } from '@/utils/stores';

// Define a type for the JSON data for better type safety
type JsonData = Record<string, any>;

// Helper function to format individual values for display
const formatValue = (key: string, value: any): string => {
	if (value === null) {
		return '<span class="text-gray-500">null</span>';
	}
	if (typeof value === 'string') {
		// Check if the key suggests it's a date/time string
		if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
			const date = new Date(value);
			// Check if the date is valid before formatting
			if (!isNaN(date.getTime())) {
				return `<span class="text-yellow-400">${date.toLocaleString()}</span>`;
			}
		}
		// Check for URLs
		if (value.startsWith('http')) {
			return `<a href="${value}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline break-all">${value}</a>`;
		}
		return `<span class="text-green-400">"${value}"</span>`;
	}
	if (typeof value === 'number') {
		return `<span class="text-orange-400">${value}</span>`;
	}
	if (typeof value === 'boolean') {
		return `<span class="text-purple-400">${value}</span>`;
	}

	console.log(value.length);
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';
		// Format each item in the array
		if (key === 'streamingPlatforms' && value.length === streamingPlatformsList.length) {
			return `[<div class="pl-4">All Platforms</div>]`;
		}
		const items = value.map(item => `<div class="ml-4"><span class="text-green-400">"${item}"</span></div>`).join('');
		return `[<div class="pl-4">${items}</div>]`;
	}
	return String(value);
};

/**
 * This is the main page for the JSON Viewer application.
 * It sets up the overall page layout and renders the interactive viewer component.
 * To resolve the previous import error, the JsonViewer component logic has been
 * integrated directly into this page file.
 */
const JsonBeautifier: FC = () => {
	const [fileName, setFileName] = useState<string | null>(null);
	const [outputHtml, setOutputHtml] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleFile = useCallback((file: File) => {
		if (file.type !== 'application/json') {
			setError('Invalid file type. Please upload a .json file.');
			setFileName(null);
			return;
		}

		setError(null);
		setFileName(`File: ${file.name}`);
		const reader = new FileReader();
		reader.onload = e => {
			try {
				const text = e.target?.result as string;
				const jsonData: JsonData = JSON.parse(text);

				const keysToExclude = ['_id', 'artistId', '__v'];
				let html = '<div class="space-y-2">';
				for (const key in jsonData) {
					if (Object.hasOwnProperty.call(jsonData, key) && !keysToExclude.includes(key)) {
						const value = jsonData[key];
						html += `
                            <div class="flex flex-col sm:flex-row sm:items-start">
                                <span class="text-cyan-400 font-semibold w-full sm:w-1/3 flex-shrink-0">"${key}":</span>
                                <div class="pl-4 sm:pl-0 sm:w-2/3 break-words">${formatValue(key, value)}</div>
                            </div>
                        `;
					}
				}
				html += '</div>';
				setOutputHtml(html);
			} catch (err) {
				setError(`Error parsing JSON: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
				setOutputHtml(null);
			}
		};
		reader.readAsText(file);
	}, []);

	const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setIsDragOver(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setIsDragOver(false);
	}, []);

	const handleDrop = useCallback(
		(e: DragEvent<HTMLLabelElement>) => {
			e.preventDefault();
			setIsDragOver(false);
			const files = e.dataTransfer.files;
			if (files.length) {
				handleFile(files[0]);
			}
		},
		[handleFile]
	);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (files && files.length) {
				handleFile(files[0]);
			}
		},
		[handleFile]
	);

	const handleClear = useCallback(() => {
		setFileName(null);
		setOutputHtml(null);
		setError(null);
	}, []);

	const handleCopy = useCallback(async () => {
		if (!outputHtml) return;
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = outputHtml;
		await navigator.clipboard.writeText(tempDiv.innerText);

		const copyButton = document.getElementById('copy-btn');
		if (copyButton) {
			copyButton.textContent = 'Copied!';
			setTimeout(() => {
				copyButton.textContent = 'Copy Text';
			}, 2000);
		}
	}, [outputHtml]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background text-gray-200">
			<div className="w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden border border-border">
				<header className="p-6 border-b border-border">
					<h1 className="text-2xl font-bold text-white">Release Data Viewer</h1>
					<p className="text-gray-400 mt-1">Upload a JSON file to view its contents in a readable format.</p>
				</header>

				<div className="p-6">
					{!outputHtml && !error ? (
						<div>
							<label htmlFor="file-upload" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-gray-700 transition-colors duration-300 ${isDragOver ? 'border-cyan-400 bg-gray-700' : 'border-border'}`}>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg className="w-10 h-10 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
									</svg>
									<p className="mb-2 text-sm text-gray-400">
										<span className="font-semibold text-primary">Click to upload</span> or drag and drop
									</p>
									<p className="text-xs text-gray-500">{fileName || 'No file selected'}</p>
								</div>
								<input id="file-upload" type="file" className="hidden" accept=".json" onChange={handleFileChange} />
							</label>
						</div>
					) : (
						<div className="mt-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-white">Formatted Data</h2>
								<div>
									<button id="copy-btn" onClick={handleCopy} className="bg-custom-primary hover:bg-cyan-500 hover:text-gray-900 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 mr-2">
										Copy Text
									</button>
									<button onClick={handleClear} className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300">
										Clear
									</button>
								</div>
							</div>
							<div className="font-mono text-sm bg-gray-800 p-6 rounded-lg overflow-x-auto max-h-[60vh] custom-scrollbar border border-border">{error ? <div className="text-red-400">{error}</div> : <div dangerouslySetInnerHTML={{ __html: outputHtml || '' }} />}</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};
export default JsonBeautifier;

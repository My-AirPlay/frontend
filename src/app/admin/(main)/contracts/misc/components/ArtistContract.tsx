
import React from 'react';
import { SingleDatePicker } from '@/components/ui';

const ArtistContract: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SingleDatePicker
                    label='Start Date'
                    value={new Date()}
                />
                <SingleDatePicker
                    label='End Date'
                    value={new Date()}
                />

            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-medium">Upload Artist Contract</h2>
                <div className="border-2 border-dashed border-admin-primary/50 rounded-md p-8">
                    <div className="text-center">
                        <div className="mx-auto h-20 w-20 text-admin-muted mb-4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm">Upload or <span className="text-admin-primary">Browse</span></p>
                            <p className="text-xs text-admin-muted">Supported formats: PDF, MSDOC</p>
                            <p className="text-xs text-admin-muted">File Size: Not more tha 40MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistContract;

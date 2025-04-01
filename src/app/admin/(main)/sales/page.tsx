'use client'
import React, { useState } from 'react';
import { ArrowLeftRight, ArrowRight, ChevronDown, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AmountInput, FileUploader, Input } from '@/components/ui';

import MatchedArtistsTable, { MatchedArtist } from './misc/components/MatchedArtistsTable';
import UnmatchedArtistsTable from './misc/components/UnmatchedArtistsTable';
import MatchArtistForm from './misc/components/MatchArtistForm';
import CreateArtistForm from './misc/components/CreateArtistForm';
import SuccessModal from './misc/components/SuccessModal';

type SalesStep = 'exchange-rate' | 'csv-upload' | 'processing' | 'artist-records' | 'match-artist' | 'create-artist';

const Sales: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<SalesStep>('exchange-rate');
    const [showExchangeRates, setShowExchangeRates] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState<'created' | 'matched' | null>(null);
    const [csvUploaded, setCsvUploaded] = useState(false);
    const [processingComplete, setProcessingComplete] = useState(false);

    // Exchange rate values
    const [euroRate, setEuroRate] = useState<string>('2300');
    const [usdRate, setUsdRate] = useState<string>('1800');
    const [processingSteps, setProcessingSteps] = useState({
        uploadSuccessful: false,
        sortingInformation: false,
        collectionFromBackend: false,
        completed: false
    });

    // Mock data for artists
    const [matchedArtists, setMatchedArtists] = useState<MatchedArtist[]>([
        { id: '1', name: 'Nina', realName: 'Nina Dobrev', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'completed' },
        { id: '2', name: 'Nina', realName: 'Nina Dobrev', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'completed' },
        { id: '3', name: 'Nina', realName: 'Nina Dobrev', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'completed' },
    ]);

    const [unmatchedArtists, setUnmatchedArtists] = useState<MatchedArtist[]>([
        { id: '4', name: 'Nina', realName: '', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'pending' },
        { id: '5', name: 'Nina', realName: '', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'pending' },
        { id: '6', name: 'Nina', realName: '', uploadedDate: '24 Feb 2025', revenue: 'N2,300', status: 'pending' },
    ]);

    const [selectedUnmatchedArtist, setSelectedUnmatchedArtist] = useState<string | null>(null);

    const navigateToNextStep = () => {
        if (currentStep === 'exchange-rate') {
            setCurrentStep('csv-upload');
            setShowExchangeRates(false);
        } else if (currentStep === 'csv-upload' && csvUploaded) {
            setCurrentStep('processing');
            startProcessing();
        } else if (currentStep === 'processing' && processingComplete) {
            setCurrentStep('artist-records');
        }
    };

    const navigateToPreviousStep = () => {
        if (currentStep === 'csv-upload') {
            setCurrentStep('exchange-rate');
            setShowExchangeRates(true);
        } else if (currentStep === 'processing') {
            setCurrentStep('csv-upload');
        } else if (currentStep === 'artist-records') {
            setCurrentStep('processing');
        } else if (currentStep === 'match-artist') {
            setCurrentStep('artist-records');
            setSelectedUnmatchedArtist(null);
        } else if (currentStep === 'create-artist') {
            setCurrentStep('match-artist');
        }
    };

    const handleFileSelected = (file: File) => {
        console.log('File selected:', file.name);
        setCsvUploaded(true);
    };

    const startProcessing = () => {
        setProcessingSteps({
            uploadSuccessful: true,
            sortingInformation: false,
            collectionFromBackend: false,
            completed: false
        });

        // Simulate processing steps with delays
        setTimeout(() => {
            setProcessingSteps(prev => ({ ...prev, sortingInformation: true }));

            setTimeout(() => {
                setProcessingSteps(prev => ({ ...prev, collectionFromBackend: true }));

                setTimeout(() => {
                    setProcessingSteps(prev => ({ ...prev, completed: true }));
                    setProcessingComplete(true);
                }, 700);
            }, 1500);
        }, 1000);
    };

    const handleArtistMatch = (artistId: string) => {
        setSelectedUnmatchedArtist(artistId);
        setCurrentStep('match-artist');
    };

    const handleCreateNewArtist = () => {
        setCurrentStep('create-artist');
    };

    const handleMatchArtist = (artistId: string) => {
        console.log('Matched with artist ID:', artistId);
        // Here we would call an API to match the artist
        setShowSuccessModal('matched');
    };

    const handleSaveArtist = (artistData: any) => {
        console.log('New artist data:', artistData);
        // Here we would call an API to create the artist
        setShowSuccessModal('created');
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(null);
        setCurrentStep('artist-records');

        // Update the lists to simulate the match/create was successful
        if (selectedUnmatchedArtist) {
            const updatedUnmatched = unmatchedArtists.filter(artist => artist.id !== selectedUnmatchedArtist);
            setUnmatchedArtists(updatedUnmatched);

            const artistToMove = unmatchedArtists.find(artist => artist.id === selectedUnmatchedArtist);
            if (artistToMove) {
                const updatedArtist = {
                    ...artistToMove,
                    realName: 'Updated Name',
                    status: 'completed' as const
                };
                setMatchedArtists([...matchedArtists, updatedArtist]);
            }
        }

        setSelectedUnmatchedArtist(null);
    };

    const getProgressPercentage = () => {
        const steps = Object.values(processingSteps);
        const completedSteps = steps.filter(step => step).length;
        return (completedSteps / steps.length) * 100;
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-background text-foreground border-border"
                    onClick={navigateToPreviousStep}
                >
                    Previous Page
                </Button>
            </div>

            <h1 className="text-2xl font-semibold">Sales</h1>

            <div className="py-6">
                {
                    currentStep === 'exchange-rate' || currentStep === 'csv-upload' ? (
                        <>
                            <p className="mb-2">You are required to upload a Csv file to be able to access and match artists. This will help you give access to artist payouts</p>
                            <p className="text-primary mb-6">* Kindly follow these steps below.</p>
                        </>
                    ) : null
                }

                {showExchangeRates && (
                    <>
                        <h2 className="text-lg font-medium mb-4">Input Exchange Rate</h2>


                        <div className="p-6 rounded-md mb-6 bg-[#272727] max-w-3xl">
                            <div className="">
                                {currentStep === 'exchange-rate' ? (
                                    <>
                                        <div className="space-y-6 ">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex flex-col items-start gap-2">
                                                    <span className="text-sm">From</span>
                                                    <div className="flex items-center space-x-2 bg-secondary rounded-full py-1">
                                                        <div className="bg-white text-background rounded-full w-6 h-6 flex items-center justify-center">€</div>
                                                        <span>Euro</span>
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-primary">
                                                        <ArrowLeftRight className=" " size={24} />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-start space-x-2">
                                                    <span className="text-sm">To</span>
                                                    <div className="flex items-center space-x-2 bg-secondary rounded-full py-1">
                                                        <div className="bg-white text-background rounded-full w-6 h-6 flex items-center justify-center">₦</div>
                                                        <span>Naira</span>
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>
                                            </div>

                                            <AmountInput
                                                value={euroRate}
                                                onChange={(e) => setEuroRate(e.target.value)}
                                                className="w-full rounded-md h-[4rem] text-center border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm">From</span>
                                                    <div className="flex items-center space-x-2 bg-secondary rounded-full py-1">
                                                        <div className="bg-white text-background rounded-full w-6 h-6 flex items-center justify-center">$</div>
                                                        <span>USD</span>
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                                                        <ArrowLeftRight className="text-primary fill-primary" size={24} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm">To</span>
                                                    
                                                    <div className="flex items-center space-x-2 bg-secondary rounded-full py-1">
                                                        <div className="bg-white text-background rounded-full w-6 h-6 flex items-center justify-center">₦</div>
                                                        <span>Naira</span>
                                                        <ChevronDown size={14} />
                                                    </div>
                                                </div>
                                            </div>

                                            <AmountInput
                                                value={usdRate}
                                                onChange={(e) => setUsdRate(e.target.value)}
                                                className="w-full rounded-md h-[4rem] text-center border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">€</div>
                                                <span className="text-lg">1</span>
                                            </div>
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-4 h-4 text-muted">⇄</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">₦</div>
                                                <span className="text-lg text-primary">{euroRate}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">$</div>
                                                <span className="text-lg">1</span>
                                            </div>
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-4 h-4 text-muted">⇄</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">₦</div>
                                                <span className="text-lg text-primary">{usdRate}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="link"
                                            className="text-primary p-0 h-auto"
                                            onClick={() => setShowExchangeRates(true)}
                                        >
                                            Edit Rate
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {currentStep === 'exchange-rate' && (
                                <div className="flex justify-center mt-8 ">
                                    <Button
                                        className=" flex items-center gap-2 rounded-full"
                                        size="lg"
                                        onClick={navigateToNextStep}
                                    >
                                        Submit <ArrowRight size={16} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {currentStep === 'processing' && (
                    <>
                        <h2 className="text-lg font-medium mb-4">CSV Status</h2>

                        <div className="bg-background p-6 rounded-md">
                            <h3 className="text-md font-medium mb-4">Progress Bar</h3>

                            <div className="space-y-4">
                                <div className="w-full bg-accent rounded-sm h-2 overflow-hidden">
                                    <div
                                        className="bg-primary h-full transition-all duration-500"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-muted">{getProgressPercentage()}% complete</p>

                                <div className="space-y-3 mt-6">
                                    <div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
                                        <div className={`w-5 h-5 rounded-full ${processingSteps.uploadSuccessful ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>
                                            {processingSteps.uploadSuccessful && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span>Upload Successful</span>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
                                        <div className={`w-5 h-5 rounded-full ${processingSteps.sortingInformation ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>
                                            {processingSteps.sortingInformation && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span>Sorting Information</span>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
                                        <div className={`w-5 h-5 rounded-full ${processingSteps.collectionFromBackend ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>
                                            {processingSteps.collectionFromBackend && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span>Collection from Back-end</span>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
                                        <div className={`w-5 h-5 rounded-full ${processingSteps.completed ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>
                                            {processingSteps.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span>Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {currentStep === 'csv-upload' && (
                    <div className="mt-8 mb-4 max-w-3xl">
                        <h2 className="text-lg font-medium mb-4">Upload CSV</h2>

                        <FileUploader
                            onFileSelected={handleFileSelected}
                            supportedFormats={['CSV']}
                            icon={<Upload size={24} className="text-muted" />}
                            id='csv-upload'
                        />
                    </div>
                )}

                {currentStep === 'artist-records' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Artists Records</h2>

                        <MatchedArtistsTable artists={matchedArtists} />

                        <UnmatchedArtistsTable
                            artists={unmatchedArtists}
                            onArtistMatch={handleArtistMatch}
                        />
                    </div>
                )}

                {currentStep === 'match-artist' && (
                    <MatchArtistForm
                        onMatch={handleMatchArtist}
                        onCreateNew={handleCreateNewArtist}
                        unmatchedArtistName={unmatchedArtists.find(a => a.id === selectedUnmatchedArtist)?.name}
                    />
                )}

                {currentStep === 'create-artist' && (
                    <CreateArtistForm onSave={handleSaveArtist} />
                )}

                {(currentStep === 'csv-upload' || currentStep === 'processing' || currentStep === 'artist-records') && (
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            className="bg-background border-border text-foreground"
                            onClick={navigateToPreviousStep}
                        >
                            Back
                        </Button>

                        <Button
                            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                            onClick={navigateToNextStep}
                            disabled={(currentStep === 'csv-upload' && !csvUploaded) ||
                                (currentStep === 'processing' && !processingComplete) ||
                                (currentStep === 'artist-records' && unmatchedArtists.length === 0)}
                        >
                            Proceed <ArrowRight size={16} />
                        </Button>
                    </div>
                )}
            </div>

            {showSuccessModal && (
                <SuccessModal
                    type={showSuccessModal}
                    onClose={handleCloseSuccessModal}
                />
            )}
        </div>
    );
};

export default Sales;

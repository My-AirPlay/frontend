
import { Input, SelectSimple } from '@/components/ui';
import React from 'react';

const ArtistOverview: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <Input
                    label="Name"
                    value="Amaraea "
                    readOnly
                />

                <Input
                    label="Alternative Name"
                    value="Amaraea Cole"
                    readOnly
                />

                <SelectSimple
                    label="Currency"
                    options={[
                        { value: 'USD', label: 'USD' },
                        { value: 'EUR', label: 'EUR' },
                        { value: 'GBP', label: 'GBP' },
                        { value: 'NGN', label: 'NGN' },
                    ]}
                    valueKey='value'
                    labelKey='label'
                    placeholder="Select an option"
                    onChange={() => { }}

                />

                <Input
                    label="Payment Email"
                    value="amaraea.cole@gmail.com"
                    readOnly
                    type="email"
                />

                <SelectSimple
                    label="Payment Currency"
                    options={[
                        { value: 'USD', label: 'USD' },
                        { value: 'EUR', label: 'EUR' },
                        { value: 'GBP', label: 'GBP' },
                        { value: 'NGN', label: 'NGN' },
                    ]}
                    valueKey='value'
                    labelKey='label'
                    placeholder="Select an option"
                    onChange={() => { }}

                />

            </div>

            <div className="space-y-6">

                <Input
                    label="Bank Name"
                    value="22 Ademola Jones, Ikeja"
                    readOnly
                />
                <Input
                    label="Bank Address"
                    value="First Bank"
                    readOnly
                />


                <div className="space-y-4">
                    <label className="text-sm text-admin-muted block">Auto Payment</label>
                    <div className="flex items-start space-x-3">
                        <div className="flex items-center h-5 mt-1">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-admin-border bg-admin-accent text-admin-primary focus:ring-admin-primary"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Generate Auto Payment</label>
                            <p className="text-xs text-admin-muted mt-1">
                                Use the payments below to configure when an auto payment should take place, this should be no instance when producers or a third party should only be paid when other contract is recouped
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-1 md:col-span-2">
                <div className="admin-card">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium mb-4">Terms</h3>
                        <button className="focus:outline-none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-sm text-admin-primary mb-4">
                        This section is to state how the percentage will be shared between artist and label.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <SelectSimple
                            label="Deal Type"
                            options={[
                                { value: 'Net Receipts', label: 'Net Receipts' },
                                { value: 'Gross Receipts', label: 'Gross Receipts' },
                            ]}
                            valueKey='value'
                            labelKey='label'
                            placeholder="Select an option"
                            onChange={() => { }}

                        />

                        <Input
                            label="Rate %"
                            value="80"
                            readOnly
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistOverview;

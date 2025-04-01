/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { DataTable } from '@/components/ui';

interface ArtistTransactionsProps {
  artistId: number;
}

interface TransactionData {
  id: number;
  description: string;
  date: string;
  amount: string;
  type: 'credit' | 'debit';
}

const ArtistTransactions: React.FC<ArtistTransactionsProps> = ({  }) => {
  // Mock transaction data
  const creditTransactions: TransactionData[] = [
    { id: 1, description: 'Royalty Payment for Youtube', date: '12 Feb 2023', amount: '₦4,000,000', type: 'credit' },
    { id: 2, description: 'Payment Downloads for Apple Music', date: '12 Feb 2023', amount: '₦4,000,000', type: 'credit' },
    { id: 3, description: 'Payment Downloads for Apple Music', date: '12 Feb 2023', amount: '₦4,000,000', type: 'credit' },
  ];
  
  const debitTransactions: TransactionData[] = [
    { id: 4, description: 'Royalty Payment for Youtube', date: '12 Feb 2023', amount: '₦4,000,000', type: 'debit' },
    { id: 5, description: 'Payment Downloads for Apple Music', date: '12 Feb 2023', amount: '₦4,000,000', type: 'debit' },
    { id: 6, description: 'Payment Downloads for Apple Music', date: '12 Feb 2023', amount: '₦4,000,000', type: 'debit' },
  ];
  
  const creditColumns = [
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: (info: any) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info: any) => <span className="text-primary">{info.getValue()}</span>
    },
  ];
  
  const debitColumns = [
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      cell: (info: any) => <span className="font-medium">{info.getValue()}</span>
    },
    {
      id: 'date',
      header: 'Date',
      accessorKey: 'date',
    },
    {
      id: 'amount',
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info: any) => <span className="text-red-500">{info.getValue()}</span>
    },
  ];
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
            Transactions History
          </h3>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            + Withdraw
          </Button>
        </div>
        
        {/* Credit Transactions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Credit Transactions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs border-border">
                <Filter size={14} className="mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="text-xs border-border">
                Show All
              </Button>
            </div>
          </div>
          
          <DataTable 
            data={creditTransactions}
            columns={creditColumns}
            pagination={false}
            className="bg-secondary/30"
          />
        </div>
        
        {/* Debit Transactions */}
        <div className="space-y-4 mt-8">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Debit Transactions</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs border-border">
                <Filter size={14} className="mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="text-xs border-border">
                Show All
              </Button>
            </div>
          </div>
          
          <DataTable 
            data={debitTransactions}
            columns={debitColumns}
            pagination={false}
            className="bg-secondary/30"
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistTransactions;

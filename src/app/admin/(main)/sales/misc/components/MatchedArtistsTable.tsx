
import React from 'react';
import { DataTable } from '@/components/ui';

export interface MatchedArtist {
  id: string;
  name: string;
  realName: string;
  uploadedDate: string;
  revenue: string;
  status: 'completed' | 'pending';
}

interface MatchedArtistsTableProps {
  artists: MatchedArtist[];
}

const MatchedArtistsTable: React.FC<MatchedArtistsTableProps> = ({ artists }) => {
  const columns = [
    {
      id: 'name',
      header: 'Artist Name',
      accessorKey: 'name',
    },
    {
      id: 'realName',
      header: 'Artist Real Name',
      accessorKey: 'realName',
    },
    {
      id: 'uploadedDate',
      header: 'Month Uploaded',
      accessorKey: 'uploadedDate',
    },
    {
      id: 'revenue',
      header: 'Revenue Generated',
      accessorKey: 'revenue',
    },
    {
      id: 'status',
      header: 'Status',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => (
        <div className={`${info.row.original.status === 'completed'
            ? 'status-badge-completed'
            : 'status-badge-pending'
          }`}>
          {info.row.original.status === 'completed' ? 'Completed' : 'Pending'}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Matched Artists</h3>
      <DataTable
        data={artists}
        columns={columns}
        pagination={true}
        defaultRowsPerPage={3}

      />
    </div>
  );
};

export default MatchedArtistsTable;

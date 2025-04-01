
import React from 'react';
import {DataTable} from '@/components/ui';
import { MatchedArtist } from './MatchedArtistsTable';

interface UnmatchedArtistsTableProps {
  artists: MatchedArtist[];
  onArtistMatch: (artistId: string) => void;
}

const UnmatchedArtistsTable: React.FC<UnmatchedArtistsTableProps> = ({ 
  artists,
  onArtistMatch
}) => {
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
      cell: (info: any) => <span>{info.getValue() || '--'}</span>,
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
      cell: (info: any) => (
        <div className="status-badge-pending">
          Pending
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-medium">Unmatched Artists</h3>
      <DataTable 
        data={artists}
        columns={columns}
        pagination={true}
        defaultRowsPerPage={3}
        onRowClick={(row) => onArtistMatch(row.id)}
      />
    </div>
  );
};

export default UnmatchedArtistsTable;

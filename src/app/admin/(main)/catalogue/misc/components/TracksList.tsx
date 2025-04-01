
import React from 'react';
import Link from 'next/link';
import { DataTable } from '@/components/ui';

interface TracksListProps {
  albumId: string;
}

const TracksList: React.FC<TracksListProps> = ({ }) => {
  const tracks = [
    { id: 1, title: 'One Chance', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
    { id: 2, title: 'My Party Mix 1', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
    { id: 3, title: 'My Party Mix 2', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
    { id: 4, title: 'My Party Mix 3', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
    { id: 5, title: 'My Party Mix 4', version: '', artist: 'DJ Sloppy', isrc: 'RS6753271H', created: 'Feb 12, 2025' },
  ];
  const trackColumns = [
    {
      id: 'title',
      header: 'Title',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => (
        <Link href={`/admin/catalogue/tracks/${info.row.original.id}`} className="text-primary hover:underline">
          {info.row.original.title}
        </Link>
      ),
    },
    {
      id: 'version',
      header: 'Version',
      accessorKey: 'version',
    },
    {
      id: 'artist',
      header: 'Artist',
      accessorKey: 'artist',
    },
    {
      id: 'isrc',
      header: 'ISRC',
      accessorKey: 'isrc',
    },
    {
      id: 'created',
      header: 'Created',
      accessorKey: 'created',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Tracks</h2>

      <DataTable
        data={tracks}
        columns={trackColumns}
        showCheckbox={true}
        pagination={true}
        defaultRowsPerPage={10}
      />

    </div>
  );
};

export default TracksList;

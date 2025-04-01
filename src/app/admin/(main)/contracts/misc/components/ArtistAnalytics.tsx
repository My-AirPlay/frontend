'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { DataTable } from '@/components/ui';

// Sample data for the analytics
const uploads = [
  { id: 1, name: 'Song Bird', category: 'Album', releaseDate: '12 Feb 2023', copyright: '12 Feb 2023' },
  { id: 2, name: 'Song Bird', category: 'EP', releaseDate: '12 Feb 2023', copyright: '12 Feb 2023' },
  { id: 3, name: 'Song Bird', category: 'Track', releaseDate: '12 Feb 2023', copyright: '12 Feb 2023' },
];

const revenueData = [
  { month: 'Jan', current: 10000, previous: 8000 },
  { month: 'Feb', current: 15000, previous: 10000 },
  { month: 'Mar', current: 25000, previous: 12000 },
  { month: 'Apr', current: 18000, previous: 15000 },
  { month: 'May', current: 30000, previous: 20000 },
  { month: 'Jun', current: 22000, previous: 18000 },
  { month: 'Jul', current: 28000, previous: 22000 },
  { month: 'Aug', current: 32000, previous: 25000 },
  { month: 'Sep', current: 35000, previous: 28000 },
  { month: 'Oct', current: 30000, previous: 30000 },
  { month: 'Nov', current: 31000, previous: 32000 },
  { month: 'Dec', current: 15070, previous: 10983 },
];

const ArtistAnalytics: React.FC = () => {
  const uploadColumns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
    },
    {
      id: 'releaseDate',
      header: 'Release Date',
      accessorKey: 'releaseDate',
    },
    {
      id: 'copyright',
      header: 'Copyright',
      accessorKey: 'copyright',
    },
    {
      id: 'status',
      header: 'Status',
      cell: () => (
        <button>
          <ChevronDown size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Uploads</h2>
        <DataTable 
          data={uploads}
          columns={uploadColumns}
          pagination={true}
          defaultRowsPerPage={3}
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Revenue</h2>
        <div className="admin-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Weekly Comparison</h3>
              <ChevronDown size={16} className="text-admin-muted" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-admin-primary rounded-full"></div>
                <span className="text-sm">This week</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm">Last week</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#8E9196" />
                <YAxis stroke="#8E9196" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#FF5500"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="#8E9196"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-right">
              <div className="text-lg font-bold text-admin-primary">₦31,350</div>
              <div className="text-xs text-admin-muted">Earnings</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">₦16,800</div>
              <div className="text-xs text-admin-muted">Previous</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">₦15,070</div>
              <div className="text-xs text-admin-muted">Change</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">₦13,821</div>
              <div className="text-xs text-admin-muted">Average</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-red-500">₦10,983</div>
              <div className="text-xs text-admin-muted">Expenses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistAnalytics;

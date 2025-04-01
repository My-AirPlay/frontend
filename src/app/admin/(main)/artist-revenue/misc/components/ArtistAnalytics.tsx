
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ArtistAnalyticsProps {
  artistId: number;
}

interface WeeklyComparisonProps {
  title: string;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const WeeklyComparison: React.FC<WeeklyComparisonProps> = ({ data }) => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-md font-medium">Weekly Comparison</h3>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>This week</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
            <span>Last week</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="thisWeek" 
              stroke="#FF6B00" 
              strokeWidth={2}
              activeDot={{ r: 8 }} 
              dot={{ stroke: '#FF6B00', strokeWidth: 2, r: 4, fill: '#1A1C1F' }}
            />
            <Line 
              type="monotone" 
              dataKey="lastWeek" 
              stroke="#777777" 
              strokeWidth={2}
              dot={{ stroke: '#777777', strokeWidth: 2, r: 4, fill: '#1A1C1F' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-5 gap-4 text-right">
        <div className="text-left">
          <span className="text-xs text-muted">Annual</span>
        </div>
        <div>
          <p className="text-primary font-medium">₦31,350</p>
          <p className="text-xs text-muted">Best so far</p>
        </div>
        <div>
          <p className="font-medium">₦18,800</p>
          <p className="text-xs text-muted">Second best</p>
        </div>
        <div>
          <p className="font-medium">₦15,070</p>
          <p className="text-xs text-muted">Third</p>
        </div>
        <div>
          <p className="font-medium">₦13,621</p>
          <p className="text-xs text-muted">Average</p>
        </div>
      </div>
    </div>
  );
};

const ArtistAnalytics: React.FC<ArtistAnalyticsProps> = ({  }) => {
  // Mock data for streaming analytics
  const streamingData = [
    { month: 'Jan', thisWeek: 4000, lastWeek: 2400 },
    { month: 'Feb', thisWeek: 3000, lastWeek: 1398 },
    { month: 'Mar', thisWeek: 2000, lastWeek: 9800 },
    { month: 'Apr', thisWeek: 2780, lastWeek: 3908 },
    { month: 'May', thisWeek: 1890, lastWeek: 4800 },
    { month: 'Jun', thisWeek: 2390, lastWeek: 3800 },
    { month: 'Jul', thisWeek: 3490, lastWeek: 4300 },
    { month: 'Aug', thisWeek: 2000, lastWeek: 2400 },
    { month: 'Sep', thisWeek: 2780, lastWeek: 1908 },
    { month: 'Oct', thisWeek: 3490, lastWeek: 2300 },
    { month: 'Nov', thisWeek: 2390, lastWeek: 3800 },
    { month: 'Dec', thisWeek: 3490, lastWeek: 4300 },
  ];
  
  // Mock data for downloads analytics (same data for simplicity)
  const downloadsData = [...streamingData];
  
  return (
    <div className="space-y-8">
      {/* Streaming Analytics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
            Streaming
          </h3>
          <Button variant="ghost" size="sm" className="text-xs text-muted">
            View All <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        
        <WeeklyComparison title="Streaming" data={streamingData} />
      </div>
      
      {/* Downloads Analytics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
            Downloads
          </h3>
          <Button variant="ghost" size="sm" className="text-xs text-muted">
            View All <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        
        <WeeklyComparison title="Downloads" data={downloadsData} />
      </div>
    </div>
  );
};

export default ArtistAnalytics;

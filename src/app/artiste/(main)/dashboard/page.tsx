'use client'
import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, 
} from 'recharts';
import { Cloud, Users, BarChart2, AlertCircle } from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, LinkButton } from '@/components/ui';
import { RoyaltiesChart } from './misc/components';



// Mock mockData (will be replaced by API mockData)
const mockData = {
  totalEarnings: 50000,
  userProfiles: [
    { id: 1, color: "#4CAF50" },
    { id: 2, color: "#F44336" },
    { id: 3, color: "#2196F3" },
    { id: 4, color: "#FF9800" },
    { id: 5, color: "#9E9E9E" }
  ],
  uploads: {
    total: 500,
    used: 35,
    capacity: 100,
    growth: 55
  },
  users: {
    total: 12000,
  },
  demographics: {
    male: 10000,
    female: 10000,
    total: 20000
  },
  geoData: {
    countries: 50,
    topCountries: ["USA", "UK", "GER"]
  },
  ageDistribution: {
    range: "18-35 Years",
    total: 4443
  },
  royalties: [
    { month: "Jan", spotify: 15, youtube: 12, appleMusic: 10 },
    { month: "Feb", spotify: 20, youtube: 15, appleMusic: 12 },
    { month: "Mar", spotify: 18, youtube: 20, appleMusic: 15 },
    { month: "Apr", spotify: 25, youtube: 18, appleMusic: 20 },
    { month: "May", spotify: 22, youtube: 25, appleMusic: 18 },
    { month: "Jun", spotify: 30, youtube: 22, appleMusic: 25 },
    { month: "Jul", spotify: 25, youtube: 30, appleMusic: 28 },
    { month: "Aug", spotify: 28, youtube: 25, appleMusic: 22 }
  ]
};

const MusicDashboard = () => {
  // In a real application, you would use the custom hook here
  // const { mockData, isLoading, error } = useDashboardData();

  // For demonstration, we're using the mock mockData directly
  const isLoading = false;
  const error = null;
  const [currency, setCurrency] = useState("USD");

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 mt-10 bg-gray-900 p-6">
      <AlertCircle size={48} className="mx-auto mb-4" />
      <h2 className="text-xl font-bold">Error loading dashboard mockData</h2>
      <p>Please try again later or contact support.</p>
    </div>
  );

  const pieData = [
    { name: 'Male', value: mockData.demographics.male, color: '#FF9800' },
    { name: 'Female', value: mockData.demographics.female, color: '#FFFFFF' }
  ];



  return (
    <div className=" text-white container mx-auto">
      {/* Header */}
      <header className="border-b border px-6 py-4 flex justify-between items-center mb-5">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              className="bg-custom-gradient border border-gray-700 rounded px-3 py-1 appearance-none pr-8 text-white"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
              </svg>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary text-white px-4 py-2 rounded flex items-center">
            <BarChart2 size={16} className="mr-2" />
            View Analytics
          </button>
        </div>
      </header>

      <main className=" lg:p-4 xl:p-6 items-center space-y-6 ">
        <section className='md:grid grid-cols-3 2xl:flex max-md:flex-col items-stretch gap-5'>
          <div className="flex-1 bg-custom-gradient rounded-xl p-6 2xl:min-w-[450px] max-w-[500px] lg:min-h-[275px]">
            <div className="flex items-center mb-4 gap-2">
              <Icon icon="fa-solid:coins" height={36} width={36} className="text-white" />
              <h2 className="text-xl xl:text-2xl font-bold">Total Earnings</h2>
            </div>
            <div className="text-4xl font-bold mb-4">₦{mockData.totalEarnings.toLocaleString()}</div>
            <div className="flex mt-4">
              {mockData.userProfiles.map((profile, index) => (
                <div
                  key={profile.id}
                  className="w-8 h-8 rounded-full border-2 border-secondary"
                  style={{
                    backgroundColor: profile.color,
                    marginLeft: index > 0 ? '-8px' : '0'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 bg-custom-gradient rounded-xl p-6 2xl:min-w-[450px] max-w-[500px] xl:min-h-[275px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="ep:upload-filled" height={36} width={36} className="text-white" />
                <h2 className="text-2xl font-extrabold">Recent Uploads</h2>
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-4">{mockData.uploads.total}</div>
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <Cloud size={16} className="mr-2" />
              <span>Storage</span>
              <span className="ml-auto text-green-500">+{mockData.uploads.growth}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-gradient-to-r from-primary to-red-500 h-2 rounded-full"
                style={{ width: `${(mockData.uploads.used / mockData.uploads.capacity) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400">
              {mockData.uploads.used}/{mockData.uploads.capacity} GB Used
            </div>
          </div>


          <div
            className="rounded-xl p-6 w-full max-w-[350px] !max-h-[220px] my-auto"
            style={{
              background: "radial-gradient(circle, #FE69021A, #FE690233)",
            }}
          >
            <div className="text-center">
              <h2 className="text-5xl font-bold">12K</h2>
              <p className="text-gray-400 mb-4">happy users</p>
              <div className="flex justify-center mb-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <img
                    key={idx}
                    src={"/images/avatars/1.png"}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full -ml-2"
                  />
                ))}
              </div>
              <LinkButton href="/artiste/upload" size="lg">
                Upload Music
              </LinkButton>
            </div>
          </div>
        </section>


        <section className="grid xl:grid-cols-3 gap-5">

          <div className="bg-custom-gradient rounded-xl p-6 col-span-1 xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold">Report Summary</h2>
                <p className="text-xs text-gray-400">Visual representation of demographics</p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              {/* Pie Chart */}
              <div className="relative w-48 h-48 mb-6 md:mb-0">
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <span className="text-2xl font-bold">20k</span>
                  <span className="text-xs text-gray-400">Total Audience</span>
                </div>
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieData}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    labelLine={false}
                  // label={null}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <div className="ml-6 space-y-6 w-full">
                <div className="flex items-center gap-5">
                  <div className="flex items-center">
                    <div className="size-4 rounded-sm bg-primary mr-2"></div>
                    <span className="text-2xl font-bold">10k</span>
                    <span className="text-xs text-gray-400 ml-2">Male</span>
                  </div>
                  <div className="flex items-center">
                    <div className="size-4 rounded-sm bg-white mr-2"></div>
                    <span className="text-2xl font-bold">10k</span>
                    <span className="text-xs text-gray-400 ml-2">Female</span>
                  </div>
                </div>

                <Button size="lg" className="text-sm">
                  View Report
                </Button>

                <section className='border-t border-dashed border-white grid xl:grid-cols-2 gap-8 mt-6 pt-6'>

                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="p-2 rounded bg-white mr-3">
                        <Icon icon={"tdesign:location-filled"} height={20} className="text-background size-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Location</div>
                        <div className="text-xs text-gray-400">{mockData.geoData.countries} Countries</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {mockData.geoData.topCountries.map((country, idx) => (
                        <div key={idx} className="text-[0.7rem] bg-gray-700 rounded px-1.5 py-0.5 mr-1">
                          {country}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <div className="flex items-start">
                      <div className="p-2 rounded bg-white mr-3">
                        <Users size={20} className="text-background" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Age Distribution</div>
                        <div className="text-xs text-gray-400">{mockData.ageDistribution.range}</div>
                      </div>
                    </div>

                    <div className="text-primary font-medium">
                      {mockData.ageDistribution.total.toLocaleString()}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <RoyaltiesChart />
        </section>
      </main>


    </div>
  );
};

export default MusicDashboard;
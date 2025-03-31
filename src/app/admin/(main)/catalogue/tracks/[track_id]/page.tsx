'use client'

import React from 'react';
import {Trash2, Copy, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import { Input, PreviousPageButton, SelectSimple, Textarea } from '@/components/ui';
import { TRUE_OR_FALSE_OPTIONS } from '@/constants';

const TrackDetails: React.FC = () => {
  const { track_id } = useParams<{ track_id: string }>();
  console.log(track_id);

  return (
    <div className="space-y-6">
      <PreviousPageButton />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Track Details</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-secondary text-foreground border-border">
            <Trash2 size={16} className="mr-2" />
            <span>Delete</span>
          </Button>
          <Button variant="outline" className="bg-secondary text-foreground border-border">
            <Copy size={16} className="mr-2" />
            <span>Copy</span>
          </Button>
          <Button className="admin-button-primary">
            <Save size={16} className="mr-2" />
            <span>Save</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="others"
            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
          >
            Others
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">


              <Input
                label="Song Title"
                value="The Good Book"
              />
              <Input
                label="Artist Name"
                value="Hannah"
              />
              <Input
                label="Publisher (Artist Real Name)"
                value="Hannah Tae"
              />

              <Input
                label="Genre"
                value="Pop"
              />

              <Input
                label="Release Date"
                value="26 February 2025"
              />


            </div>

            <div className="space-y-6">

              <Input
                label="Record Label"
                value="Migos"
              />

              <div className="space-y-4">
                <label className="text-sm text-foreground font-medium block">Instrument Played</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="guitar" />
                    <label htmlFor="guitar" className="text-sm">Guitar</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="drums" />
                    <label htmlFor="drums" className="text-sm">Drums</label>
                  </div>
                </div>
              </div>

              <Textarea
                label="Description/Notes"
                value="This Is A Beautiful Song"
                className="min-h-[120px]"
              />

            </div>
          </div>
        </TabsContent>

        <TabsContent value="others" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <SelectSimple
                label="Explicit Content"
                options={TRUE_OR_FALSE_OPTIONS}
                value={true}
                labelKey='name'
                valueKey='value'
                placeholder="Select an option"
                onChange={() => {
                  //
                }}
              />
              <Input
                label="Universal product code(UPC) and ISRC(international standard recording code)"
                value="E4671572"
              />
              <Input
                label="Release Version"
                value="Pop"
              />
              <Input
                label="Copyright"
                value="26 February 2025"
              />

              <Input
                label="Copyright"
                value="26 February 2025"
              />


            </div>

            <Textarea
              label="Lyrics (Paste in lyrics box)"
              value="This Is A Beautiful Song"
              className="min-h-[300px]"
            />

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackDetails;

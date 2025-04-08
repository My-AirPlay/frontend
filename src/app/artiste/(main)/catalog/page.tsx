'use client'
import React from 'react'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { Folder, Musicnote, Video } from 'iconsax-react';
import { SectionAlbums, SectionAudios, SectionVideos } from './misc/components';

const Catalogue = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "music"
  return (
    <div className="grid grid-rows-[max-content_1fr] space-y-6 flex-1">
      <h1 className="text-xl md:text-2xl font-semibold">
        My Catalog
      </h1>


      <Tabs defaultValue={section} value={section} className="flex flex-col h-full overflow-hidden">
        <TabsList className="bg-transparent border-b border-border w-full justify-start mb-4">
          <Link href={`./catalog?section=music`} replace>
            <TabsTrigger
              value="music"
              className="flex gap-3 group/audios data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
            >
              <Musicnote size={18} variant="Bold" className='fill-white group-data-[state=active]/audios:fill-primary' />
              Music
            </TabsTrigger>
          </Link>

          <Link href={`./catalog?section=videos`} replace>
            <TabsTrigger
              value="videos"
              className="flex gap-3 group/videos data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
            >
              <Video size={18} variant="Bold" className='fill-white group-data-[state=active]/videos:fill-primary' />

              Videos
            </TabsTrigger>
          </Link>
          <Link href={`./catalog?section=albums`} replace>

            <TabsTrigger
              value="albums"
              className="flex gap-3 group/albums data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
            >
              <Folder size={18} variant="Bold" className='fill-white group-data-[state=active]/albums:fill-primary' />
              Albums
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value="music" className="grow ">
          <SectionAudios />
        </TabsContent>

        <TabsContent value="videos" className="grow">
          <SectionVideos />
        </TabsContent>
        
        <TabsContent value="albums" className="flex-1">
          <SectionAlbums />
        </TabsContent>


      </Tabs>
    </div>
  )
}

export default Catalogue
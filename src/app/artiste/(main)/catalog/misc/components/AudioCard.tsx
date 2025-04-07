import React from 'react'
import { TArtistMedia } from '../api/getArtisteMedias'
import Image from 'next/image'
import { Button, ReusableDropdownMenu } from '@/components/ui'
import { Ellipsis, Eye, Trash } from 'lucide-react'

const AudioCard = ({ audio }: { audio: TArtistMedia }) => {



    return (
        <article className="flex flex-col gap-4 rounded-xl cursor-pointer">
            <header>
                <ReusableDropdownMenu
                    trigger={
                        <Button variant="ghost" size="icon">
                            <Ellipsis size={16} className="text-muted-foreground" />
                        </Button>
                    }
                    items={[
                        {
                            label: "View",
                            icon: <Eye />,
                            onClick: () => console.log("Profile clicked"),
                        },
                        {
                            label: "Delete",
                            icon: <Trash />,
                            onClick: () => console.log("Settings clicked"),
                        },
                    ]}
                    contentProps={{ className: "w-56" }}
                />
            </header>
            <div className='relative max-h-[200px] aspect-square'>
                <Image
                    src={audio.mediaUrl || audio.mediaCoverArtUrl || '/images/placeholder.png'}
                    alt={audio.title}
                    className="object-cover rounded-xl"
                    priority={true}
                    fill

                />
            </div>
            <footer className="px-2">
                <h6>
                    {audio.title}
                </h6>
            </footer>

        </article>
    )
}

export default AudioCard
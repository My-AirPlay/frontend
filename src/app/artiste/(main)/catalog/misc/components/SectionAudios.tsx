import React from 'react'
import { useGetAudios } from '../api/getArtisteMedias';
import AudioCard from './AudioCard';

const SectionAudios = () => {
    const { data } = useGetAudios({});

    return (
        <div className="h-full overflow-hidden">
            <header>

            </header>


            <section className='flex-1 overflow-y-auto'>
                <div className="grid [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))] gap-4 p-4">
                    {data?.data.map((audio) => (
                        <AudioCard
                            key={audio._id}
                            audio={audio}
                        />
                    ))}
                </div>

            </section>
        </div>
    )
}

export default SectionAudios
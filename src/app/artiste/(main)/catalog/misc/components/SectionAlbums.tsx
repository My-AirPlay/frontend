import React from 'react'
import { useGetAlbums } from '../api'

const SectionAlbums = () => {

    const { data } = useGetAlbums({});
console.log(data)
    return (
        <div>SectionAlbums</div>
    )
}

export default SectionAlbums
import React from "react";

import Image, { StaticImageData } from "next/image";
interface ArtistHomeCard {
  artist: StaticImageData;
  title: string;
  description: string;
}
const ArtistHomeCard = ({ artist, description, title }: ArtistHomeCard) => {
  return (
    <article className="flex flex-col gap-5">
      <div className="grid-stack items-end">
        <figure>
          <Image src={artist} alt={title} />
        </figure>
        <div className="glass-morphism px-6 pt-5 pb-4 border-t-4 border-t-custom-primary">
          <p
            className="font-plus-jakarta-sans text-white
           font-semibold text-2xl"
          >
            {title}
          </p>
          <p
            className="font-plus-jakarta-sans text-white
           font-semibold text-2xl"
          >
            {description}
          </p>
        </div>
      </div>
      <button className="w-full max-w-[250px] h-[50px] flex items-center justify-center rounded-full shadow-inner font-plus-jakarta-sans bg-custom-primary mx-auto font-medium  text-xl text-white">
        Read More
      </button>
    </article>
  );
};

export default ArtistHomeCard;

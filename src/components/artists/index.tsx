import React from "react";

import ArtistHomeCard from "@/components/artist-home-card";
import individual from "@/app/assets/artist/individual.png";
import management from "@/app/assets/artist/mangement.png";
import owners from "@/app/assets/artist/owners.png";
const ArtistsSection = () => {
  return (
    <section className="flex flex-col gap-14 mb-40">
      <div className="flex justify-center">
        <h2 className="capitalize bg-gradient-to-r from-white to-custom-primary text-transparent inline-block bg-clip-text max-w-[818px] font-plus-jakarta-sans font-semibold text-[40px] text-center mx-auto">
          Our exclusive offer is targeted towards these users
        </h2>
      </div>
      <section className="flex justify-center gap-5">
        <ArtistHomeCard
          artist={individual}
          description="Control your narrative"
          title="Individual Artists."
        />
        <ArtistHomeCard
          artist={management}
          description="Grow your artists brand"
          title="Artist Management."
        />
        <ArtistHomeCard
          artist={owners}
          title="Management Owners."
          description="Analyse royalties & reports "
        />
      </section>
    </section>
  );
};

export default ArtistsSection;

import Image from "next/image";
import tulus from "@/app/assets/artist/tulus.png";
import rasia from "@/app/assets/artist/raisa.png";
import judika from "@/app/assets/artist/judika.png";
import budi from "@/app/assets/artist/budi.png";
import andmesh from "@/app/assets/artist/andmesh.png";
import andriana from "@/app/assets/artist/andriana.png";
import citra from "@/app/assets/artist/citra.png";
import fals from "@/app/assets/artist/fals.png";
import iwan from "@/app/assets/artist/iwan.png";
const images = [
  tulus,
  rasia,
  judika,
  budi,
  andmesh,
  andriana,
  citra,
  fals,
  iwan,
];
const ExploreSection = () => {
  return (
    <section className="grid grid-cols-2 container mx-auto gap-9 items-center mb-60">
      <div>
        <h2 className="font-plus-jakarta-sans text-6xl text-white font-bold mb-12">
          Explore your Music with{" "}
          <span className="bg-gradient-to-r from-white to-custom-primary text-transparent bg-clip-text">
            Air Play
          </span>{" "}
          Today
        </h2>
        <p className="font-plus-jakarta-sans font-normal text-xl text-white  mb-20">
          Tap into the power of global radio and streaming platforms to ensure
          your music gets the recognition it deserves. Don’t just create—be
          heard. Start your journey with Airplay Today and make every beat
          count!&quot;
        </p>
        <button className="w-full max-w-[250px] h-[50px] flex items-center justify-center rounded-full shadow-inner font-plus-jakarta-sans bg-custom-primary  font-medium  text-xl text-white">
          Read More
        </button>
      </div>
      <div className="grid grid-cols-3 gap-y-24 gap-x-20">
        {images.map((image, i) => (
          <figure key={i}>
            <Image src={image} alt="" />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;

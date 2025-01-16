import HeroSection from "@/components/hero";
// import LandingPageFooter from "@/components/footer";
// import ArtistsSection from "@/components/artists";
// import ExploreSection from "@/components/explore";
import AuthHeader from "@/components/auth-header/auth-header";
import platformImg from "@/app/assets/platform.png";
import { artistsImages, urls } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoveRight, PlayCircle } from "lucide-react";
import FeaturesSection from "@/components/features";
import testimonialImg from "@/app/assets/testimonial.png";
import testimonialArt1 from "@/app/assets/testimonial-art-1.svg";
import testimonialArt2 from "@/app/assets/testimonial-art-2.svg";
import testimonialArt3 from "@/app/assets/testimonial-art-3.svg";
import testimonialArt4 from "@/app/assets/testimonial-art-4.svg";
import quoteIcon from "@/app/assets/quote-icon.svg";
import videonBanner from "@/app/assets/video-banner.png";
import logoSm from "@/app/assets/logo.svg";
export default function Home() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-svh pb-[19px] bg-custom-page-bg overflow-hidden font-poppins ">
      <div className="max-w-page mx-auto px-3 relative">
        <AuthHeader />
        <main>
          <HeroSection />
          <section className="mb-7">
            <div className="flex items-center justify-between mb-16">
              <div className="flex flex-col gap-9">
                <h2 className="font-medium text-60 text- max-w-[761.56px] text-white">
                  <span className="text-custom-primary">AirPlay</span> the most
                  reliable platform to manage music royalties.
                </h2>
                <p className="font-normal text-xl text-white max-w-[537.81px]">
                  “We empower artists and or their management teams with an
                  intuitive platform for music distribution and analytics,
                  enhancing visibility and control over their creative work
                  while maximising revenue opportunities”.
                </p>
              </div>
              <div className="flex flex-col gap-14">
                <p className="flex flex-col items-end font-semibold text-custom-primary text-80">
                  550,300
                  <small className="font-normal text-2xl text-white">
                    Paid music distribution & royalties
                  </small>
                </p>
                <p className="flex flex-col items-end font-semibold text-white text-80">
                  500,000
                  <small className="font-normal text-2xl text-white">
                    Global managed music artists
                  </small>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-8">
              {artistsImages.map((artist, i) => (
                <figure key={i}>
                  <Image src={artist} alt="" />
                </figure>
              ))}
            </div>
            <Button variant={"authBtn"} className="max-w-72 h-auth-btn mx-auto">
              <Link href={urls.register} className="flex items-center gap-2">
                Create an Account{" "}
                <MoveRight
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Link>
            </Button>
          </section>
          <section className="flex items-center justify-between mb-12">
            <figure>
              <Image src={platformImg} alt="platform" />
            </figure>
            <div>
              <h2 className="max-w-[524px] text-white font-bold text-50 mb-2">
                A Platform Built for the Needs of the Music Business
              </h2>
              <p className="text-white max-w-[500px] font-normal text-28 mb-11">
                Good value for your work, we understand tha making music
                requires a lot of creativity. We want you to enjoy a lifetime of
                value.
              </p>
              <Link
                className="text-custom-primary font-plus-jakarta-sans font-semibold text-xl"
                href={urls.register}
              >
                Request Demo
              </Link>
            </div>
          </section>
          <FeaturesSection />
          <section className="mb-24">
            <small className="mb-2 block text-center font-bold text-sm  text-custom-primary">
              Testimonials
            </small>
            <h2 className="text-white text-center text-40 font-bold">
              Trusted by our clients
            </h2>
            <div className="flex gap-8 ">
              <div
                className="w-fit grid-stack pt-12 pb-14 px-14"
                style={{
                  backgroundImage: `url(${testimonialArt1.src}),
                   url(${testimonialArt2.src}), 
                   url(${testimonialArt3.src}),
                   url(${testimonialArt4.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition:
                    "top left,80% 0%, bottom right, bottom center",
                }}
              >
                <figure>
                  <Image src={testimonialImg} alt="" />
                </figure>
                <div className="flex items-center justify-between px-5">
                  <Button className="w-[60px] hover:bg-white h-[60px] rounded-full bg-white grid items-center text-custom-dark-blue">
                    <ChevronLeft
                      style={{
                        width: 26,
                        height: 15,
                      }}
                    />
                  </Button>
                  <Button className="w-[60px] h-[60px] rounded-full bg-white hover:bg-white grid items-center text-custom-dark-blue">
                    <ChevronRight
                      style={{
                        width: 26,
                        height: 15,
                      }}
                    />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-12">
                <figure>
                  <Image src={quoteIcon} alt="" />
                </figure>
                <p className="text-xl text-white -tracking-wider font-medium max-w-[574px] mb-4">
                  Tracking royalties used to be a nightmare, but now it&apos;s
                  simple and transparent. The detailed insights have helped me
                  plan better and understand the true value of my work. This
                  platform has streamlined our entire process, saving us time
                  and ensuring everyone gets their fair share.
                </p>
                <div className="flex flex-col">
                  <small className="font-bold text-white text-xl">
                    Noah Band
                  </small>
                  <small className="text-custom-error font-medium text-base">
                    Group Music
                  </small>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex mb-4 gap-8 justify-between">
              <div className="flex flex-col gap-2">
                <small className="uppercase text-lg font-bold text-custom-primary">
                  Join Us today!
                </small>
                <h2 className="text-5xl text-white max-w-[429px] font-bold">
                  Become a part of our community
                </h2>
              </div>
              <p className="font-normal text-xl text-white max-w-[860px] p-[10px]">
                When you become part of our community, you’re joining a network
                of passionate artists, producers, and music professionals who
                are dedicated to fair and transparent royalty management. We
                believe every creator deserves to be recognized and compensated
                for their work — and together, we’re making that a reality.
                <br />
                <br /> Gain exclusive access to expert insights, helpful
                resources, and peer support to maximize your earnings and
                protect your creative rights. Whether you&apos;re an independent
                artist or part of a label, you belong here.
                <br />
                <br /> Let&apos;s build a future where your music truly pays
                off.{" "}
                <Link
                  href={urls.register}
                  className="font-semibold text-custom-primary"
                >
                  Join us today!
                </Link>
              </p>
            </div>
            <div className="grid-stack mb-4">
              <figure>
                <Image src={videonBanner} alt="" />
              </figure>
              <div className="grid place-items-center  text-white">
                <button>
                  <PlayCircle className="w-20" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mb-14">
              <button className="w-6 h-6 rounded-full bg-custom-dot border border-dot"></button>
              <button className="w-6 h-6 rounded-full  border border-dot"></button>
              <button className="w-6 h-6 rounded-full  border border-dot"></button>
            </div>
            <Link
              href={urls.register}
              className="flex items-center justify-center gap-1 bg-custom-primary h-auth-btn font-rubik font-semibold text-white text-lg max-w-[275px] mx-auto rounded-full"
            >
              Create an Account <MoveRight />
            </Link>
          </section>
        </main>
      </div>
      <footer className="pt-28 pb-6 mb-[29px]">
        <section className="flex gap-[70px] max-w-page mx-auto">
          <div className="max-w-[546px] flex flex-col">
            <figure>
              <Image src={logoSm} alt="" />
            </figure>
            <p className="text-white/50 font-normal text-[22px] leading-10 tracking-[0.15%]">
              Our platform is designed to empower artists, producers, and rights
              holders by simplifying the way music royalties are tracked,
              managed, and distributed. With intuitive tools and real-time
              analytics, we ensure you get the royalties you’ve earned —
              accurately and on time.
            </p>
          </div>
          <nav className="flex gap-[71px]">
            <div className="flex flex-col gap-9">
              <h3 className="font-manrope font-bold text-white text-lg">
                About
              </h3>
              <ul className="flex flex-col gap-[18px]">
                <li className="text-white font-manrope font-medium text-base">
                  About Us
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Careers
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Blog
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-9">
              <h3 className="font-manrope font-bold text-white text-lg">
                Features
              </h3>
              <ul className="flex flex-col gap-[18px]">
                <li className="text-white font-manrope font-medium text-base">
                  Distribution
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Distribution
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Distribution
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-9">
              <h3 className="font-manrope font-bold text-white text-lg">
                Royalties
              </h3>
              <ul className="flex flex-col gap-[18px]">
                <li className="text-white font-manrope font-medium text-base">
                  Music
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Video
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  Promo Card
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-9">
              <h3 className="font-manrope font-bold text-white text-lg">
                Suport
              </h3>
              <ul className="flex flex-col gap-[18px]">
                <li className="text-white font-manrope font-medium text-base">
                  suppory@airplay.com
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  +23489208039
                </li>
                <li className="text-white font-manrope font-medium text-base">
                  FAQ
                </li>
              </ul>
            </div>
          </nav>
        </section>
        <div className="border-t border-t-custom-footer-stroke mt-[22px] mb-[19px]" />
        <section className="max-w-page mx-auto flex justify-between items-center">
          <nav>
            <ul className="flex items-center gap-4">
              <li className="text-white font-medium text-xs">
                Copyright &copy; {year} Airplay
              </li>
              <li className="text-white font-medium text-xs">
                <Link href={"#"}>Privacy Policy </Link>
              </li>
              <li className="text-white font-medium text-xs">
                <Link href={"#"}>Terms of Services </Link>
              </li>
            </ul>
          </nav>
          <small className="text-white font-medium text-xs">
            Supported by AirPlay
          </small>
        </section>
      </footer>
    </div>
  );
}

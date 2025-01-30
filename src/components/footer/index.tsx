import React from "react";

const LandingPageFooter = () => {
  return (
    <footer className="container mx-auto">
      <div>
        <div className="flex justify-between w-full max-w-[808px]">
          <div>
            <h2 className="font-plus-jakarta-sans font-bold text-xl text-white mb-4">
              Features
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Royalties
              </p>
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Distribution
              </p>
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Reports and Analytics
              </p>
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Music Upload
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-plus-jakarta-sans font-bold text-xl text-white mb-4">
              About Us
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Our Team
              </p>
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                Our Partners
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-plus-jakarta-sans font-bold text-xl text-white mb-4">
              Contact Us
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                +44-8293-92029
              </p>
              <p className="font-plus-jakarta-sans font-normal text-lg text-custom-link">
                contact@airplay.com
              </p>
            </div>
          </div>
        </div>
        <figure></figure>
      </div>
    </footer>
  );
};

export default LandingPageFooter;

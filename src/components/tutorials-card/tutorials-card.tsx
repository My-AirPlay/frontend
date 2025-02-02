import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import FaqCardWrapper from "../faq-card-wrapper/faq-card-wrapper";

const TutorialsCard = () => {
  return (
    <FaqCardWrapper>
      <Icon icon={"tabler:message"} className="w-6 h-6 text-white" />
      <h3 className="text-white font-semibold font-plus-jakarta-sans text-xl my-2">
        Music Uploads
      </h3>
      <p className="font-normal font-plus-jakarta-sans text-white text-sm leading-5">
        Ensure your music file is in an accepted format (e.g., MP3, WAV). Check
        the file size limit and compress if necessary.
      </p>
      <p className="font-normal font-plus-jakarta-sans text-white text-sm leading-5 ">
        You can{" "}
        <button className="font-medium italic text-custom-primary">
          read more
        </button>
      </p>
    </FaqCardWrapper>
  );
};

export default TutorialsCard;

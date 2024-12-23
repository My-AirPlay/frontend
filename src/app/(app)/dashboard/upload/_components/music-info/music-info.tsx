import React from "react";

const MusicInfo = () => {
  return (
    <div>
      <h2 className="p-[10px] w-fit mx-auto font-inter font-semibold text-xl text-custom-primary mb-2">
        Music Info
      </h2>
      <p className="font-plus-jakarta-sans font-normal text-base text-white max-w-[990px] mx-auto">
        Please use your real name and data. It will be used for security
        purposes to make sure you and only you have access to your account
        including withdrawals (if applicable).{" "}
        <span className="text-custom-primary">
          * All fields are mandatory unless specified otherwise.
        </span>
      </p>
    </div>
  );
};

export default MusicInfo;

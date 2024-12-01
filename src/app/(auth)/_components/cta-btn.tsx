import React from "react";

const CtaBtns = () => {
  return (
    <div className="flex items-center gap-9">
      <button className="border border-custom-primary rounded-full h-10 flex items-center justify-center font-plus-jakarta-sans font-bold text-white px-5 text-base">
        Request a Demo
      </button>
      <button className=" bg-custom-primary rounded-full h-10 flex items-center justify-center font-plus-jakarta-sans font-bold text-white px-5 text-base">
        Get Started
      </button>
    </div>
  );
};

export default CtaBtns;

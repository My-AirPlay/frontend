"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const FaqItem = () => {
  const [show, setShow] = useState(false);
  return (
    <article className="border-b border-b-custom-faq-border">
      <div className="py-5 flex justify-between items-center ">
        <p className="font-plus-jakarta-sans text-white text-base font-bold">
          Lorem ipsum dolor sit ame
        </p>
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? (
            <Minus width={24} height={24} color="#fff" />
          ) : (
            <Plus width={24} height={24} color="#fff" />
          )}
        </button>
      </div>
      {show ? (
        <p className="pb-4 text-custom-faq-text font-plus-jakarta-sans text-base font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      ) : null}
    </article>
  );
};

export default FaqItem;

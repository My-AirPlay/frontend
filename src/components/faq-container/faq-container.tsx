import React from "react";
import FaqItem from "../faq-item/faq-item";

interface FaqContainerProps {
  title: string;
}
const FaqContainer = ({ title }: FaqContainerProps) => {
  return (
    <section>
      <h3 className="text-custom-registration_link font-normal text-25 font-plus-jakarta-sans mb-6">
        {title}
      </h3>
      <div>
        <FaqItem />
        <FaqItem />
        <FaqItem />
        <FaqItem />
      </div>
    </section>
  );
};

export default FaqContainer;

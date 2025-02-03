"use client";
import FaqCardWrapper from "@/components/faq-card-wrapper/faq-card-wrapper";
import FaqContainer from "@/components/faq-container/faq-container";
import TutorialsCard from "@/components/tutorials-card/tutorials-card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Modal from "@/components/modal/modal";
import ContactModal from "./_components/contact-modal/contact-modal";
import EnquiryModal from "./_components/enquiry-modal/enquiry-modal";
import SupportWrapper from "./_components/support-wrapper/support-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";

const SupportClientPage = () => {
  const [showContact, setShowContact] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  return (
    <SupportWrapper>
      <section className="mb-28">
        <div className="flex items-center justify-between mb-20">
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            FAQs
          </h2>
          <div className="flex gap-4">
            <Link href={urls.reportIssue}>
              <Button
                variant={"smBtn"}
                className="bg-transparent border border-white"
              >
                <Icon
                  icon={"mingcute:question-line"}
                  width={21}
                  height={21}
                  className="p-1"
                />
                <span className="font-plus-jakarta-sans text-sm font-semibold">
                  Report an issue
                </span>
              </Button>
            </Link>
            <Button variant={"smBtn"} onClick={() => setShowEnquiry(true)}>
              <Icon
                icon={"mingcute:question-line"}
                width={21}
                height={21}
                className="p-1"
              />
              <span className="font-plus-jakarta-sans text-sm font-semibold">
                Ask Question
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <FaqContainer title="General Enquires" />
          <FaqContainer title="Account Setup" />
          <FaqContainer title="Payment" />
        </div>
      </section>
      <section className="mb-44">
        <h2 className="font-plus-jakarta-sans text-2xl mb-16 text-white font-semibold">
          Help Articles & Tutorials
        </h2>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-3">
          <TutorialsCard />
          <TutorialsCard />
          <TutorialsCard />
        </div>
      </section>
      <section className="mb-44">
        <div className="flex items-center justify-between mb-20">
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            Contact Us
          </h2>
          <div className="flex gap-4">
            <Button variant={"smBtn"} onClick={() => setShowContact(true)}>
              <Icon
                icon={"mingcute:question-line"}
                width={21}
                height={21}
                className="p-1"
              />
              <span className="font-plus-jakarta-sans text-sm font-semibold">
                Contact Us
              </span>
            </Button>
          </div>
        </div>

        <FaqCardWrapper>
          <p className="text-sm font-plus-jakarta-sans text-white leading-5">
            For help and more information about AiPlay send us an email{" "}
            <button className="font-medium italic text-custom-primary">
              here
            </button>{" "}
            or click the here to drop your enquires. Email:{" "}
            <button className="font-medium italic text-custom-primary">
              contact@airplay.com
            </button>{" "}
          </p>
        </FaqCardWrapper>
      </section>
      <section className="mb-44">
        <div className="flex items-center justify-between mb-20">
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            Terms and Conditions
          </h2>
        </div>

        <FaqCardWrapper>
          <p className="text-sm font-plus-jakarta-sans text-white leading-5">
            Read our terms and conditions here :{" "}
            <button className="font-medium italic text-custom-primary">
              terms and conditions
            </button>
          </p>
        </FaqCardWrapper>
      </section>
      <section>
        <div className="flex items-center justify-between mb-20">
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            Privacy Policy
          </h2>
        </div>

        <FaqCardWrapper>
          <p className="text-sm font-plus-jakarta-sans text-white leading-5">
            Read our privacy policy here :{" "}
            <button className="font-medium italic text-custom-primary">
              privacy Policy
            </button>
          </p>
        </FaqCardWrapper>
      </section>

      <Modal show={showContact} close={() => setShowContact(false)}>
        <ContactModal />
      </Modal>
      <Modal show={showEnquiry} close={() => setShowEnquiry(false)}>
        <EnquiryModal />
      </Modal>
    </SupportWrapper>
  );
};

export default SupportClientPage;

"use client";
import React from "react";
import SupportWrapper from "../../_components/support-wrapper/support-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomSelect from "@/components/custom-dropdown/custom-select";
import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import Uploader from "@/components/uploader/uploader";
import { MoveRight } from "lucide-react";

const ReportClientPage = () => {
  return (
    <SupportWrapper>
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <div>
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            Report an Issue
          </h2>
          <p className=" md:hidden font-plus-jakarta-sans text-white font-normal text-lg">
            Kindly drop your complaint here and our customer representative will
            attend to it.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"#"}>
            <Button variant={"smBtn"}>
              <Icon
                icon={"mingcute:question-line"}
                width={21}
                height={21}
                className="p-1"
              />
              <span className="font-plus-jakarta-sans text-sm font-semibold">
                View All Issues
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <p className="hidden md:block font-plus-jakarta-sans text-white font-normal text-lg mb-16">
        Kindly drop your complaint here and our customer representative will
        attend to it.
      </p>

      <form onClick={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-12 mb-20">
          <fieldset className="flex flex-col gap-9">
            <label
              htmlFor="category"
              className="font-plus-jakarta-sans font-semibold text-base text-white"
            >
              Complaint Category
            </label>
            <CustomSelect placeholder="Select an option" options={[]} />
          </fieldset>
          <fieldset className="flex flex-col gap-9">
            <label
              htmlFor="category"
              className="font-plus-jakarta-sans font-semibold text-base text-white"
            >
              Complaint Category
            </label>
            <TextareaWrapper placeholder="What is your complain?" />
          </fieldset>
          <fieldset className="flex flex-col gap-9">
            <label
              htmlFor="category"
              className="font-plus-jakarta-sans font-semibold text-base text-white"
            >
              Share a screenshot (Optional)
            </label>
            <Uploader />
          </fieldset>
        </div>
        <Button className="mx-auto" type="submit" variant={"authBtn"}>
          Submit <MoveRight />
        </Button>
      </form>
    </SupportWrapper>
  );
};

export default ReportClientPage;

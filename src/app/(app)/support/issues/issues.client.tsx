"use client";

import React from "react";
import SupportWrapper from "../_components/support-wrapper/support-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ISSUE_STATUS, urls } from "@/lib/constants";

import IssueCardWrapper from "./_components/issue-card-wrapper/issue-card-wrapper";

const IssuesClientPage = () => {
  return (
    <SupportWrapper>
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <div>
          <h2 className="font-plus-jakarta-sans text-2xl font-semibold text-white">
            All Issues
          </h2>
        </div>
        <div className="flex gap-4">
          <Link href={urls.support}>
            <Button variant={"smBtn"}>
              <Icon
                icon={"mingcute:question-line"}
                width={21}
                height={21}
                className="p-1"
              />
              <span className="font-plus-jakarta-sans text-sm font-semibold">
                Go Back
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 ">
        <IssueCardWrapper title="Pending" status={ISSUE_STATUS.PENDING} />
        <IssueCardWrapper
          title="In Progress"
          status={ISSUE_STATUS.IN_PROGRESS}
        />
        <IssueCardWrapper title="Completed" status={ISSUE_STATUS.RESOLVED} />
      </div>
    </SupportWrapper>
  );
};

export default IssuesClientPage;

import { dummyIssues, ISSUE_STATUS } from "@/lib/constants";
import React from "react";
import IssueHeader from "../issues-header/issue-header";
import IssueCard from "../issue-card/issue-card";

interface IssueCardWrapperProps {
  title: string;
  status: ISSUE_STATUS;
}
const IssueCardWrapper = ({ title, status }: IssueCardWrapperProps) => {
  return (
    <div className="border border-custom-issues-border bg-custom-issues-border rounded-lg">
      <IssueHeader title={title} status={status} />
      <div className="px-[10px] py-4 flex flex-col gap-[10px]">
        {dummyIssues.pending.map((issue, index) => (
          <IssueCard {...issue} key={index} status={status} />
        ))}
      </div>
    </div>
  );
};

export default IssueCardWrapper;

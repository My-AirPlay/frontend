import { ISSUE_STATUS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";

interface IssueHeaderProps {
  status: ISSUE_STATUS;
  title: string;
}
const IssueHeader = ({ status, title }: IssueHeaderProps) => {
  const styles = {
    [ISSUE_STATUS.IN_PROGRESS]: "bg-custom-primary",
    [ISSUE_STATUS.PENDING]: "bg-custom-error",
    [ISSUE_STATUS.RESOLVED]: "bg-custom-success",
  };
  return (
    <div
      className={cn(
        "bg-custom-error py-2 grid place-items-center rounded-t-lg font-plus-jakarta-sans text-white font-medium text-sm",
        styles[status]
      )}
    >
      {title}
    </div>
  );
};

export default IssueHeader;

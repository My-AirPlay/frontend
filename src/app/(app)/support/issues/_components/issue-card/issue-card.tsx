import { ISSUE_STATUS } from "@/lib/constants";
import React from "react";

interface IssueCardProps {
  status: ISSUE_STATUS;
  title: string;
  isImageAttached?: boolean;
  description: string;
}
const IssueCard = ({
  description,
  status,
  title,
  isImageAttached,
}: IssueCardProps) => {
  return (
    <article className="bg-custom-issues-card border border-custom-issues-card-border p-4 rounded-md flex flex-col gap-3">
      <div className="flex items-center gap-[10px]">
        {status !== ISSUE_STATUS.RESOLVED ? (
          <>
            <small className="block w-fit bg-[#2A2A2A] px-1 py-[2px] rounded font-plus-jakarta-sans font-normal text-xs text-white">
              {!isImageAttached && "No "} Image attached
            </small>
            {status === ISSUE_STATUS.IN_PROGRESS && (
              <small className="block w-fit bg-custom-primary px-1 py-[2px] rounded font-plus-jakarta-sans font-normal text-sm text-white">
                Email sent
              </small>
            )}
          </>
        ) : (
          <small className="block w-fit bg-custom-success px-1 py-[2px] rounded font-plus-jakarta-sans font-normal text-sm text-white">
            Resolved via mail
          </small>
        )}
      </div>
      <h3 className="text-white font-plus-jakarta-sans text-base font-medium">
        {title}
      </h3>
      <p className="text-[#C6C6C6]  text-xs font-plus-jakarta-sans font-normal">
        {description}
      </p>
    </article>
  );
};

export default IssueCard;

import React from "react";
import EngagementTableItem from "../engagement-table-item/engagement-table-item";

const EngagementTable = () => {
  return (
    <div className="px-6">
      <table className="max-w-full w-full hidden md:table">
        <thead className="text-start">
          <tr>
            <th className="font-plus-jakarta-sans font-normal text-base text-white w-[50.96px] h-[64px]">
              <div className="flex items-start h-full pt-2">No</div>
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white text-start  max-w-[170.92px] ">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>Music Name</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Search
                </small>
              </div>
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white  text-start">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>User Engagements</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Amount of Shares
                </small>
              </div>
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white  text-start ">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>User Engagements</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Number of Listens
                </small>
              </div>
            </th>

            <th className="font-plus-jakarta-sans font-normal text-base text-white  text-start ">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>User Engagements</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Number of Saved
                </small>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/[1%]">
          <EngagementTableItem />
          <EngagementTableItem />
          <EngagementTableItem />
          <EngagementTableItem />
          <EngagementTableItem />
        </tbody>
      </table>
    </div>
  );
};

export default EngagementTable;

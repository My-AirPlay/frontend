import React from "react";
import UploadTableItem from "../upload-table-item/upload-table-item";

const UploadTable = () => {
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
            <th className="font-plus-jakarta-sans font-normal text-base text-white text-start  max-w-[170.92px] h-[64px] ">
              <div className="flex items-start h-full pt-2">
                <small>Upload Type</small>
              </div>
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white  text-start">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>Performance</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Search
                </small>
              </div>
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white  text-start ">
              <div className="px-3 py-[6px] flex flex-col gap-1">
                <small>Duration</small>
                <small className="font-plus-jakarta-sans text-custom-footer_border font-normal text-sm">
                  Duration on chart
                </small>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/[1%]">
          <UploadTableItem />
          <UploadTableItem />
          <UploadTableItem />
          <UploadTableItem />
          <UploadTableItem />
        </tbody>
      </table>
    </div>
  );
};

export default UploadTable;

import React from "react";
import EarningTableItem from "../earning-table-row/earning-table-row";

const EarningTable = () => {
  return (
    <div className="px-6">
      <table className="max-w-full w-full hidden md:table">
        <thead className="text-start">
          <tr>
            <th className="font-plus-jakarta-sans font-normal text-base text-white w-[50.96px] pb-11">
              No
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white text-start pb-11 max-w-[170.92px] ">
              Platform
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white pb-11 text-start">
              Status
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white pb-11 text-start">
              Music Name
            </th>
            <th className="font-plus-jakarta-sans font-normal text-base text-white pb-11 text-start">
              Earning USD
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/[1%]">
          <EarningTableItem />
          <EarningTableItem />
          <EarningTableItem />
          <EarningTableItem />
        </tbody>
      </table>
    </div>
  );
};

export default EarningTable;

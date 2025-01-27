import React from "react";
import EarningMobileCard from "../earning-mobile-item/earning-mobile-card";

const EarningMobileTable = () => {
  return (
    <section className="flex flex-col gap-5 md:hidden  px-2">
      <EarningMobileCard />
      <EarningMobileCard />
      <EarningMobileCard />
      <EarningMobileCard />
      <EarningMobileCard />
      <EarningMobileCard />
    </section>
  );
};

export default EarningMobileTable;

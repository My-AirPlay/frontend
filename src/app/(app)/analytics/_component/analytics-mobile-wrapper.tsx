import React, { ReactNode } from "react";

const AnalyticsMobileWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-5 md:hidden  px-2">
      {children}
    </section>
  );
};

export default AnalyticsMobileWrapper;

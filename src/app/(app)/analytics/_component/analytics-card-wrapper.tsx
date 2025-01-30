import React, { ReactNode } from "react";

const AnalyticsTableCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <article className="border border-custom-input_dark rounded-lg py-4">
      {children}
    </article>
  );
};

export default AnalyticsTableCardWrapper;

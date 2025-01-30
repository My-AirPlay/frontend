import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode } from "react";

const AnalyticsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-white font-plus-jakarta-sans font-semibold md:text-30 text-2xl">
          Analytics Overview
        </h1>
        <div>
          <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-[130px] flex items-center justify-center gap-2 hover:bg-custom-primary">
            <Icon icon="bytesize:download" width="20" height="20" />
            Download
          </Button>
        </div>
      </div>
      {children}
    </section>
  );
};

export default AnalyticsWrapper;

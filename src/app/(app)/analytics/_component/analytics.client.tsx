"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const AnalyticsClient = () => {
  return (
    <section className="mt-[88px]">
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-white font-plus-jakarta-sans font-semibold text-30">
          Analytics Overview
        </h1>
        <div>
          <Button className="h-10 bg-custom-primary rounded-lg w-full max-w-[130px] flex items-center justify-center gap-2 hover:bg-custom-primary">
            <Icon icon="bytesize:download" width="20" height="20" />
            Download
          </Button>
        </div>
      </div>
      <div className=""></div>
    </section>
  );
};

export default AnalyticsClient;

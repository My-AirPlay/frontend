import { LinkButton } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/constants";
import React from "react";

const CtaBtns = () => {
  return (
    <div className="flex items-center lg:gap-9 gap-4">
      <Button className="text-base text-white font-medium border border-custom-dot w-full max-w-[120px] grid place-items-center rounded-md" size="lg" variant="outline">
        Video Demo
      </Button>
      <LinkButton
        href={urls.register}
        className="text-base flex-1 text-white font-medium  rounded-md w-full max-w-[180px] grid place-items-center px-4"
        size="lg"
      >
        Create an Acount
      </LinkButton>
    </div>
  );
};

export default CtaBtns;

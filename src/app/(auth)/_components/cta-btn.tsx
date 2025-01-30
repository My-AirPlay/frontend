import { Button } from "@/components/ui/button";
import { urls } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const CtaBtns = () => {
  return (
    <div className="flex items-center lg:gap-9 gap-4">
      <Button className="text-base text-white font-medium border border-custom-dot w-full max-w-[120px] h-[58px] grid place-items-center rounded-md">
        Video Demo
      </Button>
      <Link
        href={urls.register}
        className="text-base flex-1 text-white font-medium bg-custom-primary rounded-md w-full max-w-[180px] h-[58px] grid place-items-center px-4"
      >
        Create an Acount
      </Link>
    </div>
  );
};

export default CtaBtns;

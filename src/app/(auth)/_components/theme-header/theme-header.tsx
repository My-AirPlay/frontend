import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import React from "react";

const ThemeHeader = () => {
  return (
    <div className="mb-10 container mx-auto flex justify-end">
      <Button className="border border-custom-icon-btn-border h-9 w-9 grid place-items-center rounded shadow-none bg-transparent hover:bg-transparent">
        <Sun />
      </Button>
    </div>
  );
};

export default ThemeHeader;

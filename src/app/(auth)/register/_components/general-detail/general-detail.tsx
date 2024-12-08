import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { CircleCheck, MoveRight } from "lucide-react";
import React from "react";
interface GeneralDetailFormProps {
  onNext: () => void;
}
const GeneralDetailForm = ({ onNext }: GeneralDetailFormProps) => {
  return (
    <form className="flex flex-col gap-6">
      <InputWrapper placeholder="Email Address" />
      <InputWrapper placeholder="Password" type="password" />

      <div className="flex items-center gap-5">
        <CircleCheck className="text-custom-primary  bg-clip-content" />
        <p className="font-extralight text-base text-white italic">
          Minimum of 8 characters (uppercase, lowercase, numbers and special
          characters)
        </p>
      </div>
      <InputWrapper placeholder="Confirm Password" type="password" />
      <Button variant={"authBtn"} className="mb-4">
        <span>CONTINUE</span>

        <MoveRight size={"24px"} />
      </Button>
    </form>
  );
};

export default GeneralDetailForm;

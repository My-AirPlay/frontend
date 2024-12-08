import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { Circle, MoveRight } from "lucide-react";
import React from "react";

const BankDetailForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <h2 className="text-custom-primary px-4 py-[14px] font-bold text-2xl">
        What kind of user are you?
      </h2>
      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="bg-transparent hover:bg-transparent font-bold text-base px-5 h-16 flex items-center justify-center rounded text-white border-custom-primary"
        >
          I am a Basic User
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-transparent hover:bg-transparent font-bold text-base px-5 h-16 flex items-center justify-center rounded text-white "
        >
          I am an Admin
        </Button>
      </div>
      <h2 className="text-white px-4 py-[14px] font-bold text-2xl">
        What kind of user are you?
      </h2>
      <InputWrapper placeholder="Bank Name" />
      <InputWrapper placeholder="Account Number" />
      <InputWrapper placeholder="Account Name" />
      <div className="flex items-center gap-5">
        <Circle className="text-custom-primary  bg-clip-content" />
        <p className="font-normal text-base text-white italic">
          I accept the{" "}
          <span className="font-bold"> terms and conditions, privacy </span>{" "}
          agreement
        </p>
      </div>
      <Button type="submit" variant={"authBtn"} className="mb-4">
        <span>Sign me Up</span>

        <MoveRight size={"24px"} />
      </Button>
    </form>
  );
};

export default BankDetailForm;

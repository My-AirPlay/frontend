import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
interface OTPInputProps {
  value: string;
  onChange: (a: string) => void;
}
const OTPInput = ({ value, onChange }: OTPInputProps) => {
  const inputs = new Array(5).fill(0);
  return (
    <div className="flex items-center justify-center my-4">
      <InputOTP
        maxLength={5}
        className="w-fit mx-auto flex items-center justify-center "
        value={value}
        onChange={onChange}
      >
        <InputOTPGroup className="">
          {inputs.map((val, i) => (
            <InputOTPSlot
              className="md:w-20 text-white aspect-square md:h-20 text-xl h-10 w-10"
              index={i}
              key={val + i}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OTPInput;

import { ArrowLeft, Earth, LifeBuoy } from "lucide-react";
import React, { ReactNode } from "react";
interface AuthWrapperProps {
  children: ReactNode;
}
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <section className="bg-custom-darkBg w-full h-full flex flex-col px-5 py-3">
      <button className="text-white">
        <ArrowLeft />
      </button>
      {children}

      <div className="flex justify-center items-center gap-6">
        <button className="text-custom-primary flex items-center gap-1 ">
          <Earth />
          <span className="font-medium text-sm">English</span>
        </button>
        <button className="text-custom-primary flex items-center gap-1 ">
          <LifeBuoy />
          <span className="font-medium text-sm">Support</span>
        </button>
      </div>
    </section>
  );
};

export default AuthWrapper;

import React, { ReactNode } from "react";
interface AuthWrapperProps {
  children: ReactNode;
  linkText?: ReactNode;
  title: string;
  description: string | ReactNode;
}
const AuthWrapper = ({
  children,
  linkText,
  description,
  title,
}: AuthWrapperProps) => {
  return (
    <div className="max-w-auth-card font-plus-jakarta-sans w-full grid items-center mx-auto flex-1">
      <div
        className="bg-custom-banner_bg/10 rounded px-6
      py-7 mb-3 auth-card-shadow"
      >
        <h1 className="font-black text-white text-center md:text-4xl text-2xl  mb-10">
          {title}
        </h1>
        <p className="font-plus-jakarta-sans font-medium md:text-xl text-sm mb-10 max-w-[542px] text-custom-footer_border ">
          {description}
        </p>
        {children}
      </div>
      {linkText}
    </div>
  );
};

export default AuthWrapper;

import React, { ReactNode } from "react";
interface AuthWrapperProps {
  children: ReactNode;
  linkText?: ReactNode;
}
const AuthWrapper = ({ children, linkText }: AuthWrapperProps) => {
  return (
    <main className="max-w-auth-card w-full grid items-center mx-auto flex-1">
      <div
        className="bg-custom-banner_bg rounded px-6
      py-7 mb-3"
      >
        {children}
      </div>
      {linkText}
    </main>
  );
};

export default AuthWrapper;

import React, { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="bg-custom-background min-h-svh">{children}</div>;
};

export default AuthLayout;

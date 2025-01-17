import CustomAppLayout from "@/components/app-layout/app-layout";
import React, { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <CustomAppLayout showIcons>{children}</CustomAppLayout>;
};

export default AuthLayout;

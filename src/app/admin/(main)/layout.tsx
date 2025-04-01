import { ReactNode } from "react";
import { AdminLayout } from "./misc/components";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = async ({ children }: AppLayoutProps) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AppLayout;

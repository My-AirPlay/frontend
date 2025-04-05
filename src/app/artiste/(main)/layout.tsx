import { ReactNode } from "react";
import { ArtisteLayout } from "./misc/components";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = async ({ children }: AppLayoutProps) => {
  return <ArtisteLayout>{children}</ArtisteLayout>;
};

export default AppLayout;

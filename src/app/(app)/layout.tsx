import React from "react";
import Sidebar from "./_components/sidebar/sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-svh flex px-7 pt-10 bg-custom-page-bg ">
      <Sidebar />
      <main className="flex-1"></main>
    </div>
  );
};

export default AppLayout;

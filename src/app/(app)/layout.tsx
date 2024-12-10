import React from "react";
import Sidebar from "./_components/sidebar/sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-svh flex bg-gradient-to-tr from-custom-primary/15 bg-fixed to-[#F1C94C]/40 bg-[#2F363E]">
      <Sidebar />
      <main className="flex-1"></main>
    </div>
  );
};

export default AppLayout;

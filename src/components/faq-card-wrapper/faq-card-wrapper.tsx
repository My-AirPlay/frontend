import React, { ReactNode } from "react";

const FaqCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <article className="bg-custom-tutorial-card rounded-[10px] p-5 border-2 border-custom-tutorial-border">
      {children}
    </article>
  );
};

export default FaqCardWrapper;

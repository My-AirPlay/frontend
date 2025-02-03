import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode } from "react";
import ChatBot from "../chat-bot/chat-bot";

const SupportWrapper = ({
  children,
  showChatbot = true,
}: {
  children: ReactNode;
  showChatbot?: boolean;
}) => {
  return (
    <section>
      <div className="text-white flex items-center gap-1 mb-12">
        <Icon
          icon={"mingcute:question-line"}
          width={32}
          height={32}
          className="p-1"
        />
        <h1 className="font-plus-jakarta-sans text-30 font-bold">
          Help and Support
        </h1>
      </div>
      {children}

      {showChatbot ? <ChatBot /> : null}
    </section>
  );
};

export default SupportWrapper;

import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ChatBot = () => {
  return (
    <div className="fixed bottom-3 right-4 z-50 ">
      <button className="w-[60px] aspect-square rounded-full border- border-custom-primary bg-white grid place-items-center">
        <Icon
          icon={"material-symbols-light:support-agent-sharp"}
          className="text-custom-primary w-10 h-10"
        />
      </button>
    </div>
  );
};

export default ChatBot;

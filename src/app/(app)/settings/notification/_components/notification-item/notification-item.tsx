import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { X } from "lucide-react";
import React from "react";
const notificationsColors = {
  error: "text-custom-error",
  success: "text-custom-success",
  normal: "text-custom-primary",
};
const NotificationItem = ({
  type = "normal",
}: {
  type?: keyof typeof notificationsColors;
}) => {
  return (
    <article className="flex items-center w-full py-6 px-4 bg-custom-input_dark rounded-2xl justify-between">
      <div className="flex gap-3 items-center ">
        <Icon
          className={notificationsColors[type] || "text-custom-primary"}
          icon="lucide:bell-ring"
          width="24"
          height="24"
        />
        <div>
          <h3
            className={cn(
              "text-custom-primary font-plus-jakarta-sans font-semibold text-base ",
              notificationsColors[type]
            )}
          >
            Pending Payment
          </h3>
          <p className="font-plus-jakarta-sans font-medium text-base text-custom-footer_border">
            Your royalties payment is still in process
          </p>
        </div>
      </div>
      <button className="text-custom-notification-close">
        <X className="w-6 h-6" />
      </button>
    </article>
  );
};

export default NotificationItem;

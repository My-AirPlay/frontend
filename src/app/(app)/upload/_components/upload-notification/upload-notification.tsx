import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

interface UploadNotificationProps {
  title: string;
  desc: string;
  onCancel: () => void;
  onContinue: () => void;
  primaryText: string;
  secondaryText: string;
  status?: "success" | "error";
}
const UploadNotification = ({
  desc,
  onCancel,
  onContinue,
  primaryText,
  secondaryText,
  title,
  status = "success",
}: UploadNotificationProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="bg-black/80 fixed z-[99999] top-0 left-0 w-svw h-screen grid place-items-center ">
      <div className="rounded-t-2xl bg-custom-notification-bg max-w-[462px] overflow-hidden pb-6 w-full">
        <div
          className={cn(
            "w-full h-7 bg-custom-primary mb-7",
            status === "error" && "bg-custom-error"
          )}
        />
        <h2 className="font-bold text-white font-plus-jakarta-sans text-2xl text-center mb-8">
          {title}
        </h2>

        <p className="text-lg font-plus-jakarta-sans text-custom-footer_border font-medium mb-11 max-w-[362px] mx-auto ">
          {desc}
        </p>
        <div className="ml-10 mr-4 flex justify-between items-center">
          <Button
            className="bg-transparent"
            variant={"prodBtn"}
            onClick={onCancel}
          >
            {secondaryText}
          </Button>
          <Button variant={"prodBtn"} onClick={onContinue}>
            {primaryText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadNotification;

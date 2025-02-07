import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface DeleteMediaProps {
  show?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
}
const DeleteMedia = ({ show, onCancel, onDelete }: DeleteMediaProps) => {
  if (!show) return null;
  return (
    <section className="fixed z-[999999999] top-0 left-0 w-full h-full bg-black/80 grid place-items-center">
      <div className="max-w-[608px] rounded-lg w-full rounded-3 overflow-hidden bg-custom-media-modal relative px-4 py-6">
        <button
          onClick={onCancel}
          className="text-white absolute top-4 right-4"
        >
          <X size={16} />
        </button>
        <h2 className="text-white font-plus-jakarta-sans font-semibold text-xl mb-4 ">
          Are you sure about this?
        </h2>
        <p className="text-white/80 font-plus-jakarta-sans text-base leading-6 mb-6">
          This action cannot be undone. This will permanently delete your media
          and remove it from our servers.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"smBtn"}
            className="bg-transparent border border-white"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant={"smBtn"}
            className="bg-custom-error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeleteMedia;

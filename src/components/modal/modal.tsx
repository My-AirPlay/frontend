import { X } from "lucide-react";
import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  show: boolean;
  close: () => void;
}

const Modal = ({ children, show, close }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [show]);
  return show ? (
    <section className="fixed w-svw h-screen bg-custom-page-bg  inset-0 py-16 px-10 overflow-y-auto z-[99999999]">
      <div className="container mx-auto">
        <div className="flex justify-end mb-24">
          <button onClick={close} className="text-[#A6A6A6]  w-fit">
            <X width={24} height={24} />
          </button>
        </div>
      </div>
      {children}
    </section>
  ) : null;
};

export default Modal;

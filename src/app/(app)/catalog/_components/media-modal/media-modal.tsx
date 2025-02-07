import albumCover from "@/app/assets/album-cover.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import MediaModalSub from "../media-modal-sub/media-modal-sub";
import { X } from "lucide-react";
interface MediaModalProps {
  onClose: () => void;
  show: boolean;
}
const MediaModal = ({ onClose, show }: MediaModalProps) => {
  return show ? (
    <section className="fixed z-[999999999] top-0 left-0 w-full h-full bg-black/80 grid place-items-center">
      <div className="max-w-[736px] w-full bg-custom-media-modal px-10 py-6 grid place-items-center rounded-[20px] relative">
        <button
          onClick={onClose}
          className="text-white absolute top-10 right-6"
        >
          <X size={16} />
        </button>
        <div className="max-w-[338px] w-full rounded-[22px] overflow-hidden">
          <div className="bg-gradient-to-b from-[#232323] to-[#1D1D1D] p-4 flex gap-2 items-start">
            <div className="flex gap-4 items-center">
              <figure className="w-full max-w-[105px] rounded-[6px] overflow-hidden">
                <Image src={albumCover} alt="" />
              </figure>
              <div className="flex flex-col gap-3">
                <small className="font-plus-jakarta-sans font-normal text-[11px] text-custom-primary">
                  Released • Jan 31 2025
                </small>
                <h2
                  className="font-plus-jakarta-sans font-medium
              text-sm text-white"
                >
                  Then the Stories Collide
                </h2>
                <div className="bg-custom-media-time px-[10px] py-2 rounded-full font-plus-jakarta-sans font-medium text-15 text-white flex items-center gap-[6px] w-fit">
                  <Icon icon="line-md:play-filled" width="24" />
                  <span>4m</span>
                </div>
              </div>
            </div>
            <Icon icon="vaadin:music" width="16" color="white" />
          </div>
          <div className="p-4 bg-gradient-to-b from-[#181818] to-[#141414] ">
            <h3 className="text-custom-primary font-plus-jakarta-sans font-normal text-[11px] mb-3">
              Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <MediaModalSub title="Artist Name" description="G6" />
              <MediaModalSub title="Publisher Name" description="Grace Audu" />
              <MediaModalSub title="Genre" description="Soul/House" />
              <MediaModalSub title="Record Label" description="Young Money" />
              <MediaModalSub title="Explicit" description="Rated 18" />
              <MediaModalSub title="Artist Name" description="Grace Audu" />
              <MediaModalSub title="Instruments" description="None" />
              <MediaModalSub title="Copyright" description="Yes" />
              <div className="col-span-2">
                <MediaModalSub
                  title="Description"
                  description="This is a work of art, I want my song to toucht he world and make a meaning in the lives of my fans"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default MediaModal;

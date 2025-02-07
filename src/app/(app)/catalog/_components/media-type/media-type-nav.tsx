"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import MediaCard from "../media-card/media-card";
import { MEDIAS } from "@/lib/constants";
import MediaModal from "../media-modal/media-modal";
import DeleteMedia from "../delete-media/delete-media";
import { toast } from "sonner";

const MediaType = () => {
  const [catalogType, setCatalogType] = useState<"music" | "video">("music");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <section>
      <nav className="border-b border-b-[#fcfcfc] mb-8">
        <ul className="max-w-2xl mx-auto flex justify-between">
          <li className="flex gap-[10px] flex-col">
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent flex gap-[5px] items-center  font-plus-jakarta-sans font-bold text-xl shadow-none border-none text-[#7B7B7B]",
                catalogType === "music" && "text-custom-primary"
              )}
              onClick={() => setCatalogType("music")}
            >
              <Icon icon="mdi:music" width="24" height="24" />
              Music
            </Button>
            {catalogType === "music" && (
              <div className="w-full h-1 rounded-tr-[20px] rounded-tl-[20px] bg-white" />
            )}
          </li>
          <li className="flex gap-[10px] flex-col">
            <Button
              className={cn(
                "bg-transparent hover:bg-transparent flex gap-[5px] items-center  font-plus-jakarta-sans font-bold text-xl shadow-none border-none text-[#7B7B7B]",
                catalogType === "video" && "text-custom-primary"
              )}
              onClick={() => setCatalogType("video")}
            >
              <Icon icon="solar:camera-square-outline" width="24" height="24" />
              Video
            </Button>
            {catalogType === "video" && (
              <div className="w-full h-1 rounded-tr-[20px] rounded-tl-[20px] bg-white" />
            )}
          </li>
        </ul>
      </nav>
      <div className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 grid gap-[14px]">
        {MEDIAS[catalogType]?.map((mediaInfo) => (
          <MediaCard
            onView={() => setShowModal(true)}
            {...mediaInfo}
            key={mediaInfo.title}
            onDelete={() => setShowDelete(true)}
          />
        ))}
      </div>
      <MediaModal show={showModal} onClose={() => setShowModal(false)} />
      <DeleteMedia
        show={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => {
          toast.success("Media deleted successfully");
          setShowDelete(false);
        }}
      />
    </section>
  );
};

export default MediaType;

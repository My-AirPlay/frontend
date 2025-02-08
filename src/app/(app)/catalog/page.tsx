"use client";
import { urls } from "@/lib/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";
import MediaTypeNav from "./_components/media-type/media-type-nav";
import MediaToast from "./_components/media-toast/media-toast";

const CatalogPage = () => {
  const [showNotification, setShowNotifcation] = useState(true);
  return (
    <section>
      {showNotification && (
        <MediaToast onClose={() => setShowNotifcation(false)} />
      )}
      <div className="flex justify-between items-center md:my-20 my-14">
        <h1 className="font-plus-jakarta-sans text-white font-semibold text-[30px]">
          My Catalog
        </h1>
        <Link
          href={urls.uploadMusic}
          className="md:flex hidden text-custom-primary font-plus-jakarta-sans font-bold text-25 items-center gap-[5px]"
        >
          <span> + </span>Add Album
        </Link>
      </div>

      <div className="flex gap-[5px] items-center mb-8">
        <Icon icon="gravity-ui:folder" width="24" height="24" color="white" />
        <h2 className="font-plus-jakarta-sans text-white font-bold text-25">
          Uploads
        </h2>
      </div>

      <MediaTypeNav />
    </section>
  );
};

export default CatalogPage;

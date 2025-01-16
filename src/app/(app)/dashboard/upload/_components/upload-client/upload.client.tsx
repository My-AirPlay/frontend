"use client";
import { useState } from "react";
import MusicTypeModal from "../music-type-modal/music-type-modal";
import UploadFlow from "../upload-flow/upload-flow";

const UploadMusicClient = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <UploadFlow />

      {showModal && <MusicTypeModal onContinue={() => setShowModal(false)} />}
    </div>
  );
};

export default UploadMusicClient;

"use client";
import MusicTypeModal from "../music-type-modal/music-type-modal";
import { useRouter } from "nextjs-toploader/app";
import useUploadMusicStore from "@/stores/upload-music.store";
import { UPLOAD_TYPE, urls } from "@/lib/constants";
const UploadMusicClient = () => {
  const { replace } = useRouter();
  const uploadType = useUploadMusicStore((s) => s.uploadType);
  return (
    <MusicTypeModal
      onContinue={() =>
        replace(
          uploadType === UPLOAD_TYPE.ALBUM
            ? urls.uploadAlbum
            : `${urls.uploadMusic}/music`
        )
      }
    />
  );
};

export default UploadMusicClient;

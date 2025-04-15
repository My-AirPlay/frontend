import { useMutation, useQueryClient } from '@tanstack/react-query';
import APIAxios from '@/utils/axios';
import { UploadAlbumPayload, UploadTrackPayload } from '../types';
import { MediaUploadInfo } from '../store/media';



export const uploadSingleTrack = async (payload: UploadTrackPayload) => {
  const formData = new FormData();


  Object.entries(payload).forEach(([key, value]) => {
    if (key !== 'media' && key !== 'coverArt' && key !== 'streamingPlatforms') {
      formData.append(key, value || '');
    }
  });

  if (Array.isArray(payload.streamingPlatforms)) {
    payload.streamingPlatforms.forEach((platform, i) => {
      formData.append(`streamingPlatforms[${i}]`, platform);
    });
  } else {
    formData.append("streamingPlatforms", payload.streamingPlatforms as unknown as string);
  }

  formData.append("coverArt", payload.coverArt);
  formData.append("media", payload.media);

  const response = await APIAxios.post(`/media/create-media`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};








export const uploadAlbum = async (payload: UploadAlbumPayload) => {
  const formData = new FormData();

  formData.append("albumCover", payload.albumCover);

  formData.append("description", payload.description);
  formData.append("title", payload.title);
  formData.append("artistName", payload.artistName);
  formData.append("mainGenre", payload.mainGenre);
  formData.append("releaseDate", payload.releaseDate);
  formData.append("recordLabel", payload.recordLabel || '');
  formData.append("publisher", payload.publisher);
  formData.append("explicitContent", payload.explicitContent);
  formData.append("universalProductCode", payload.universalProductCode);
  formData.append("releaseVersion", payload.releaseVersion);
  formData.append("copyright", payload.copyright);

  if (payload.secondaryGenres?.length) {
    payload.secondaryGenres.forEach((genre, i) => {
      formData.append(`secondaryGenres[${i}]`, genre);
    });
  }

  if (payload.instruments?.length) {
    payload.instruments.forEach((instrument, i) => {
      formData.append(`instruments[${i}]`, instrument);
    });
  }

  if (payload.streamingPlatforms?.length) {
    payload.streamingPlatforms.forEach((platform, i) => {
      formData.append(`streamingPlatforms[${i}]`, platform);
    });
  }

  // Add media files
  if (payload.mediaFiles?.length) {
    payload.mediaFiles.forEach(file => {
      formData.append("mediaFiles", file);
    });
  }

  // Add track info for each track
  if (payload.media?.length) {
    payload.media.forEach((track, i) => {
      Object.entries(track).forEach(([key, value]) => {
        if (key == "fileId") return;
        if (!Array.isArray(value)) {
          formData.append(`media[${i}][${key}]`, value || '');
        } else if (key === 'secondaryGenres' || key === 'instruments' || key === 'streamingPlatforms') {
          value.forEach((item, j) => {
            formData.append(`media[${i}][${key}][${j}]`, item);
          });
        }
      });
    });
  }

  console.log(formData.getAll('media'));

  const response = await APIAxios.post(`/media/create-album`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const useUploadTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadSingleTrack,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getArtistAlbums"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getArtistMedias"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getArtistVideos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getArtistAllMedia"],
      });
    },
    onError: (error) => {
      console.error("Failed to upload track:", error);
    }
  });
};

export const useUploadAlbum = () => {
  return useMutation({
    mutationFn: uploadAlbum,
    onError: (error) => {
      console.error("Failed to upload album:", error);
    }
  });
};



export function createMediaPayloadFromStore(
  info: MediaUploadInfo,
  mediaFile: File,
  coverArtFile: File,
  enabledPlatforms: string[]
): UploadTrackPayload {
  return {
    artistName: info.artistName,
    copyright: info.copyright,
    explicitContent: info.explicitContent,
    fileType: mediaFile.type.includes('audio') ? 'audio' : 'video',
    lyrics: info.lyrics || '',
    mainGenre: info.mainGenre,
    originalReleaseDate: info.originalReleaseDate || info.releaseDate,
    publisher: info.publisher,
    recordLabel: info.recordLabel || '',
    releaseVersion: info.releaseVersion,
    streamingPlatforms: enabledPlatforms,
    universalProductCode: info.universalProductCode,
    description: info.description,
    releaseDate: info.releaseDate,
    title: info.title,
    media: mediaFile,
    coverArt: coverArtFile
  };
}

export function createAlbumPayloadFromStore(/* same parameters */) {
  // Implementation remains the same
  // ...
}
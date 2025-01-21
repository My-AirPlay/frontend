import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { InferType } from "yup";
import { musicInfoSchema } from "./schemas";
import { PreviewTableProps } from "@/components/preview-table/preview-table";
import { formatDate } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFileSize(size: number) {
  const mb = 1000 * 1024;
  const kb = 1024;

  if (size >= mb) {
    return `${(size / mb).toFixed(2)} MB`;
  }
  if (size >= kb) {
    return `${(size / kb).toFixed(2)} KB`;
  }
  return `${(size / 1024).toFixed(2)} KB`;
}

export const generateMusicUploadPreview = (
  musicInfo: InferType<typeof musicInfoSchema>
): PreviewTableProps["previewData"] => {
  const date = new Date(musicInfo.release_date);
  const shortDate = formatDate(date, "dd MMM, yyyy");

  return [
    [
      {
        title: "Song Title",
        value: musicInfo.song_title,
      },
      {
        title: "Artist Name",
        value: musicInfo.publisher,
      },
      {
        title: "Release Date",
        value: shortDate,
      },
      {
        title: "Genre",
        value: musicInfo.genre,
      },
    ],

    [
      {
        title: "Release Year",
        value: date.getFullYear().toString(),
      },
      {
        title: "Music Description",
        value: musicInfo.description,
      },
    ],
  ];
};

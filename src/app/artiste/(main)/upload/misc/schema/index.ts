
import { z } from "zod";

export const mediaTypeSchema = z.enum([
  'Track', 
  'Video', 
  'Album', 
  'ExtendedPlaylist', 
  'MixTape', 
  'PlayBack'
]);

export const albumTypeSchema = z.enum([
  'Album',
  'ExtendedPlaylist',
  'MixTape'
]);

export const mediaInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artistName: z.string().min(1, { message: "Artist name is required" }),
  mainGenre: z.string().min(1, { message: "Genre is required" }),
  releaseDate: z.string().min(1, { message: "Release date is required" }),
  originalReleaseDate: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  recordLabel: z.string().optional(),
  publisher: z.string().min(1, { message: "Publisher is required" }),
  copyright: z.string().min(1, { message: "Copyright information is required" }),
  explicitContent: z.string().optional(),
  lyrics: z.string(),
  universalProductCode: z.string().min(1, { message: "UPC is required" }),
  releaseVersion: z.string().min(1, { message: "Release version is required" }),
  // streamingPlatforms: z.array(z.string()).min(1, { message: "At least one platform must be selected" })
});

export const albumInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artistName: z.string().min(1, { message: "Artist name is required" }),
  mainGenre: z.string().min(1, { message: "Genre is required" }),
  secondaryGenres: z.array(z.string()).optional(),
  releaseDate: z.string().min(1, { message: "Release date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  recordLabel: z.string().optional(),
  publisher: z.string().min(1, { message: "Publisher is required" }),
  instruments: z.array(z.string()).optional(),
  explicitContent: z.string().optional(),
  universalProductCode: z.string().min(1, { message: "UPC is required" }),
  releaseVersion: z.string().min(1, { message: "Release version is required" }),
  copyright: z.string().min(1, { message: "Copyright information is required" }),
  // streamingPlatforms: z.array(z.string()).min(1, { message: "At least one platform must be selected" })
});

export const trackInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  artistName: z.string().min(1, { message: "Artist name is required" }),
  mainGenre: z.string().min(1, { message: "Genre is required" }),
  secondaryGenres: z.array(z.string()).optional(),
  releaseDate: z.string().min(1, { message: "Release date is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  recordLabel: z.string().optional(),
  publisher: z.string().min(1, { message: "Publisher is required" }),
  instruments: z.array(z.string()).optional(),
  lyrics: z.string().optional(),
  explicitContent: z.string().optional(),
  universalProductCode: z.string().min(1, { message: "UPC is required" }),
  releaseVersion: z.string().min(1, { message: "Release version is required" }),
  copyright: z.string().min(1, { message: "Copyright information is required" }),
  fileType: z.string(),
  streamingPlatforms: z.array(z.string()).optional()
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: "File is required" })
});

export type MediaInfoFormValues = z.infer<typeof mediaInfoSchema>;
export type AlbumInfoFormValues = z.infer<typeof albumInfoSchema>;
export type TrackInfoFormValues = z.infer<typeof trackInfoSchema>;
export type FileUploadFormValues = z.infer<typeof fileUploadSchema>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export type AlbumType = z.infer<typeof albumTypeSchema>;
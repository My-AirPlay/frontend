import { z } from 'zod';

export const mediaTypeSchema = z.enum(['Track', 'Video', 'Album', 'ExtendedPlaylist', 'MixTape', 'PlayBack']);

export const albumTypeSchema = z.enum(['Album', 'ExtendedPlaylist', 'MixTape']);

export const mediaInfoSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	artistName: z.string().min(1, { message: 'Artist name is required' }),
	primaryArtist2: z.string().optional(),
	featuredArtists: z.string().optional(),
	mainGenre: z.string().min(1, { message: 'Genre is required' }),
	releaseDate: z.string().min(1, { message: 'Release date is required' }),
	originalReleaseDate: z.string().optional(),
	description: z.string().optional(),
	recordLabel: z.string().min(1, { message: 'Record Label is required' }),
	publisher: z.string().min(1, { message: 'Publisher is required' }),
	writer: z.string().min(1, { message: 'Writer (full legal name) is required' }),
	producer: z.string().min(1, { message: 'Producer is required' }),
	copyright: z.string().min(1, { message: 'Copyright information is required' }),
	explicitContent: z.string().optional(),
	// lyrics: z.string().min(20, { message: "Your lyrics should be longer than that" }),
	lyrics: z.string(),
	// universalProductCode: z.string().min(1, { message: "UPC is required" }),
	universalProductCode: z.string(),
	// releaseVersion: z.string().min(1, { message: "Release version is required" }),
	releaseVersion: z.string()
	// streamingPlatforms: z.array(z.string()).min(1, { message: "At least one platform must be selected" })
});

export const albumInfoSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	artistName: z.string().min(1, { message: 'Artist name is required' }),
	primaryArtist2: z.string().optional(),
	featuredArtists: z.string().optional(),
	mainGenre: z.string().min(1, { message: 'Genre is required' }),
	secondaryGenres: z.array(z.string()).optional(),
	releaseDate: z.string().min(1, { message: 'Release date is required' }),
	description: z.string().optional(),
	// Required by the API (@IsNotEmpty on CreateAlbumDto, `required: true` on
	// MediaDirectory) and starred in the form, but optional here: a blank label
	// passed step 1 and failed on the server at the end of the whole upload.
	recordLabel: z.string().min(1, { message: 'Record Label is required' }),
	publisher: z.string().min(1, { message: 'Publisher is required' }),
	// Album-level credits are defaults that pre-fill each track via the
	// "same as album" checkboxes in step 2. A record can have a different
	// writer and producer on every track, so the required version of these
	// lives on the track, not here.
	writer: z.string().optional(),
	producer: z.string().optional(),
	instruments: z.array(z.string()).optional(),
	explicitContent: z.string().optional(),
	universalProductCode: z.string().optional(),
	releaseVersion: z.string().optional(),
	copyright: z.string().min(1, { message: 'Copyright information is required' })
	// streamingPlatforms: z.array(z.string()).min(1, { message: "At least one platform must be selected" })
});

export const trackInfoSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	artistName: z.string().min(1, { message: 'Artist name is required' }),
	primaryArtist2: z.string().optional(),
	featuredArtists: z.string().optional(),
	mainGenre: z.string().min(1, { message: 'Genre is required' }),
	secondaryGenres: z.array(z.string()).optional(),
	releaseDate: z.string().min(1, { message: 'Release date is required' }),
	description: z.string().optional(),
	recordLabel: z.string().optional(),
	publisher: z.string().min(1, { message: 'Publisher is required' }),
	writer: z.string().min(1, { message: 'Writer (full legal name) is required' }),
	producer: z.string().min(1, { message: 'Producer is required' }),
	instruments: z.array(z.string()).optional(),
	lyrics: z.string().optional(),
	explicitContent: z.string().optional(),
	universalProductCode: z.string().optional(),
	releaseVersion: z.string().optional(),
	copyright: z.string().min(1, { message: 'Copyright information is required' }),
	fileType: z.string(),
	// Platforms are one album-wide decision, made in step 4 — after the tracks
	// are added in step 2. Requiring them per track here blocked the flow
	// before the picker had ever been shown. uploadAlbum gives any track
	// without its own selection the album's.
	streamingPlatforms: z.array(z.string()).optional()
});

export const fileUploadSchema = z.object({
	file: z.instanceof(File, { message: 'File is required' })
});

export type MediaInfoFormValues = z.infer<typeof mediaInfoSchema>;
export type AlbumInfoFormValues = z.infer<typeof albumInfoSchema>;
export type TrackInfoFormValues = z.infer<typeof trackInfoSchema>;
export type FileUploadFormValues = z.infer<typeof fileUploadSchema>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export type AlbumType = z.infer<typeof albumTypeSchema>;

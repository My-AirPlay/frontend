export interface UploadTrackPayload {
    artistName: string;
    copyright: string;
    explicitContent: string;
    fileType: string;
    lyrics: string;
    mainGenre: string;
    originalReleaseDate: string;
    publisher: string;
    recordLabel: string;
    releaseVersion: string;
    streamingPlatforms: string[];
    universalProductCode: string;
    description: string;
    releaseDate: string;
    title: string;
    media: File;
    coverArt: File;
  }
  
  export interface AlbumTrackInfo {
    description: string;
    title: string;
    fileType: string;
    artistName: string;
    mainGenre: string;
    secondaryGenres?: string[];
    releaseDate: string;
    recordLabel: string;
    publisher: string;
    instruments?: string[];
    lyrics?: string;
    explicitContent: string;
    universalProductCode: string;
    releaseVersion: string;
    copyright: string;
    streamingPlatforms: string[];
  }
  
  export interface UploadAlbumPayload {
    mediaFiles: File[];
    albumCover: File;
    description: string;
    title: string;
    artistName: string;
    mainGenre: string;
    secondaryGenres?: string[];
    releaseDate: string;
    recordLabel: string;
    publisher: string;
    instruments?: string[];
    explicitContent: string;
    universalProductCode: string;
    releaseVersion: string;
    copyright: string;
    streamingPlatforms: string[];
    media: AlbumTrackInfo[];
  }
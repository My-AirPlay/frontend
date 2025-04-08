// IndexedDB utility for single media uploads (Track, Video, PlayBack)
import { openDB, type DBSchema, type IDBPDatabase } from "idb"

// Define the database schema for media uploads
interface MediaUploadDB extends DBSchema {
  mediaFile: {
    key: string
    value: {
      id: string
      file: File
      arrayBuffer?: ArrayBuffer
      mediaType: "Track" | "Video" | "PlayBack"
    }
  }
  coverArt: {
    key: string
    value: {
      id: string
      file: File
      arrayBuffer?: ArrayBuffer
    }
  }
  mediaInfo: {
    key: string
    value: {
      id: string
      [key: string]: any
    }
  }
}

// Database name and version
const DB_NAME = "mediaUploadDB"
const DB_VERSION = 1

// Database instance
let dbPromise: Promise<IDBPDatabase<MediaUploadDB>> | null = null

// Initialize the database
export const initMediaDB = async (): Promise<boolean> => {
  try {
    dbPromise = openDB<MediaUploadDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains("mediaFile")) {
          db.createObjectStore("mediaFile", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("coverArt")) {
          db.createObjectStore("coverArt", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("mediaInfo")) {
          db.createObjectStore("mediaInfo", { keyPath: "id" })
        }
      },
    })

    return true
  } catch (error) {
    console.error("Failed to initialize Media IndexedDB:", error)
    return false
  }
}

// Get the database instance
const getDB = async () => {
  if (!dbPromise) {
    await initMediaDB()
  }
  return dbPromise
}

// Store a media file
export const storeMediaFile = async (
  id: string,
  file: File,
  mediaType: "Track" | "Video" | "PlayBack",
): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    const arrayBuffer = await file.arrayBuffer()
    await db.put("mediaFile", { id, file, arrayBuffer, mediaType })
    return true
  } catch (error) {
    console.error("Error storing media file:", error)
    return false
  }
}

// Get a media file by ID
export const getMediaFile = async (id: string | null): Promise<File | null> => {
    if (!id) return null;
  try {
    const db = await getDB()
    if (!db) return null

    const entry = await db.get("mediaFile", id)
    return entry?.file || null
  } catch (error) {
    console.error("Error getting media file:", error)
    return null
  }
}

// Delete a media file
export const deleteMediaFile = async (id: string | null): Promise<boolean> => {
    if (!id) return false
  try {
    const db = await getDB()
    if (!db) return false

    await db.delete("mediaFile", id)
    return true
  } catch (error) {
    console.error("Error deleting media file:", error)
    return false
  }
}

// Store cover art
export const storeMediaCoverArt = async (id: string | null, file: File): Promise<boolean> => {
    if (!id) return false
  try {
    const db = await getDB()
    if (!db) return false

    const arrayBuffer = await file.arrayBuffer()
    await db.put("coverArt", { id, file, arrayBuffer })
    return true
  } catch (error) {
    console.error("Error storing cover art:", error)
    return false
  }
}

// Get cover art
export const getMediaCoverArt = async (id: string | null): Promise<File | null> => {
    if (!id) return null
  try {
    const db = await getDB()
    if (!db) return null

    const entry = await db.get("coverArt", id)
    return entry?.file || null
  } catch (error) {
    console.error("Error getting cover art:", error)
    return null
  }
}

// Store media info
export const storeMediaInfo = async (id: string, info: any): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    await db.put("mediaInfo", { id, ...info })
    return true
  } catch (error) {
    console.error("Error storing media info:", error)
    return false
  }
}

// Get media info
export const getMediaInfo = async (id: string): Promise<any | null> => {
  try {
    const db = await getDB()
    if (!db) return null

    return await db.get("mediaInfo", id)
  } catch (error) {
    console.error("Error getting media info:", error)
    return null
  }
}

// Clear all data
export const clearMediaDatabase = async (): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    const tx = db.transaction(["mediaFile", "coverArt", "mediaInfo"], "readwrite")
    await Promise.all([
      tx.objectStore("mediaFile").clear(),
      tx.objectStore("coverArt").clear(),
      tx.objectStore("mediaInfo").clear(),
      tx.done,
    ])

    return true
  } catch (error) {
    console.error("Error clearing media database:", error)
    return false
  }
}

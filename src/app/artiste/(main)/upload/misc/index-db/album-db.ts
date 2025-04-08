/* eslint-disable @typescript-eslint/no-explicit-any */


import { openDB, type DBSchema, type IDBPDatabase } from "idb"

// Define the database schema for album uploads
interface AlbumUploadDB extends DBSchema {
  mediaFiles: {
    key: string
    value: {
      id: string
      file: File
      arrayBuffer?: ArrayBuffer
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
  albumInfo: {
    key: string
    value: {
      id: string
      [key: string]: any
    }
  }
  trackInfo: {
    key: string
    value: {
      id: string
      fileId?: string
      [key: string]: any
    }
  }
}

const DB_NAME = "albumUploadDB"
const DB_VERSION = 1
let dbPromise: Promise<IDBPDatabase<AlbumUploadDB>> | null = null

// Initialize the database
export const initAlbumDB = async (): Promise<boolean> => {
  try {
    dbPromise = openDB<AlbumUploadDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains("mediaFiles")) {
          db.createObjectStore("mediaFiles", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("coverArt")) {
          db.createObjectStore("coverArt", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("albumInfo")) {
          db.createObjectStore("albumInfo", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains("trackInfo")) {
          db.createObjectStore("trackInfo", { keyPath: "id" })
        }
      },
    })

    return true
  } catch (error) {
    console.error("Failed to initialize Album IndexedDB:", error)
    return false
  }
}


const getDB = async () => {
  if (!dbPromise) {
    await initAlbumDB()
  }
  return dbPromise
}

export const storeAlbumTrackFile = async (id: string | null, file: File): Promise<boolean> => {
    if (!id || !file) return false
  try {
    const db = await getDB()
    if (!db) return false

    const arrayBuffer = await file.arrayBuffer()
    await db.put("mediaFiles", { id, file, arrayBuffer })
    return true
  } catch (error) {
    console.error("Error storing album track file:", error)
    return false
  }
}

export const getAlbumTrackFile = async (id: string | null): Promise<File | null> => {
    if (!id) return null
  try {
    const db = await getDB()
    if (!db) return null

    const entry = await db.get("mediaFiles", id)
    return entry?.file || null
  } catch (error) {
    console.error("Error getting album track file:", error)
    return null
  }
}

export const deleteAlbumTrackFile = async (id: string | null): Promise<boolean> => {
    if (!id) return false
  try {
    const db = await getDB()
    if (!db) return false

    await db.delete("mediaFiles", id)
    return true
  } catch (error) {
    console.error("Error deleting album track file:", error)
    return false
  }
}

// Get all media files
export const getAllAlbumTrackFiles = async (): Promise<Array<{ id: string; file: File }>> => {
  try {
    const db = await getDB()
    if (!db) return []

    const entries = await db.getAll("mediaFiles")
    return entries.map((entry) => ({ id: entry.id, file: entry.file }))
  } catch (error) {
    console.error("Error getting all album track files:", error)
    return []
  }
}

// Store cover art
export const storeAlbumCoverArt = async (id: string, file: File): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    const arrayBuffer = await file.arrayBuffer()
    await db.put("coverArt", { id, file, arrayBuffer })
    return true
  } catch (error) {
    console.error("Error storing album cover art:", error)
    return false
  }
}

export const getAlbumCoverArt = async (id: string | null): Promise<File | null> => {
    if (!id) return null
  try {
    const db = await getDB()
    if (!db) return null

    const entry = await db.get("coverArt", id)
    return entry?.file || null
  } catch (error) {
    console.error("Error getting album cover art:", error)
    return null
  }
}

export const storeAlbumInfo = async (id: string, info: any): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    await db.put("albumInfo", { id, ...info })
    return true
  } catch (error) {
    console.error("Error storing album info:", error)
    return false
  }
}

// Get album info
export const getAlbumInfo = async (id: string): Promise<any | null> => {
  try {
    const db = await getDB()
    if (!db) return null

    return await db.get("albumInfo", id)
  } catch (error) {
    console.error("Error getting album info:", error)
    return null
  }
}

// Store track info
export const storeTrackInfo = async (id: string, info: any): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    await db.put("trackInfo", { id, ...info })
    return true
  } catch (error) {
    console.error("Error storing track info:", error)
    return false
  }
}

// Get track info
export const getTrackInfo = async (id: string): Promise<any | null> => {
  try {
    const db = await getDB()
    if (!db) return null

    return await db.get("trackInfo", id)
  } catch (error) {
    console.error("Error getting track info:", error)
    return null
  }
}

// Get all track info
export const getAllTrackInfo = async (): Promise<any[]> => {
  try {
    const db = await getDB()
    if (!db) return []

    return await db.getAll("trackInfo")
  } catch (error) {
    console.error("Error getting all track info:", error)
    return []
  }
}

// Clear all data
export const clearAlbumDatabase = async (): Promise<boolean> => {
  try {
    const db = await getDB()
    if (!db) return false

    const tx = db.transaction(["mediaFiles", "coverArt", "albumInfo", "trackInfo"], "readwrite")
    await Promise.all([
      tx.objectStore("mediaFiles").clear(),
      tx.objectStore("coverArt").clear(),
      tx.objectStore("albumInfo").clear(),
      tx.objectStore("trackInfo").clear(),
      tx.done,
    ])

    return true
  } catch (error) {
    console.error("Error clearing album database:", error)
    return false
  }
}

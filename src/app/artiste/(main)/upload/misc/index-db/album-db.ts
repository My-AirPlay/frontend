/* eslint-disable @typescript-eslint/no-explicit-any */

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

// Define the database schema for album uploads
interface AlbumUploadDB extends DBSchema {
	mediaFiles: {
		key: string;
		value: {
			id: string;
			file: File;
			arrayBuffer?: ArrayBuffer;
		};
	};
	coverArt: {
		key: string;
		value: {
			id: string;
			file: File;
			arrayBuffer?: ArrayBuffer;
		};
	};
	albumInfo: {
		key: string;
		value: {
			id: string;
			[key: string]: any;
		};
	};
	trackInfo: {
		key: string;
		value: {
			id: string;
			fileId?: string;
			[key: string]: any;
		};
	};
}

const DB_NAME = 'albumUploadDB';
const DB_VERSION = 1;
let dbPromise: Promise<IDBPDatabase<AlbumUploadDB>> | null = null;

// Initialize the database
export const initAlbumDB = async (): Promise<boolean> => {
	try {
		dbPromise = openDB<AlbumUploadDB>(DB_NAME, DB_VERSION, {
			upgrade(db) {
				// Create stores if they don't exist
				if (!db.objectStoreNames.contains('mediaFiles')) {
					db.createObjectStore('mediaFiles', { keyPath: 'id' });
				}
				if (!db.objectStoreNames.contains('coverArt')) {
					db.createObjectStore('coverArt', { keyPath: 'id' });
				}
				if (!db.objectStoreNames.contains('albumInfo')) {
					db.createObjectStore('albumInfo', { keyPath: 'id' });
				}
				if (!db.objectStoreNames.contains('trackInfo')) {
					db.createObjectStore('trackInfo', { keyPath: 'id' });
				}
			}
		});

		return true;
	} catch {
		return false;
	}
};

const getDB = async () => {
	if (!dbPromise) {
		await initAlbumDB();
	}
	return dbPromise;
};

export const storeAlbumTrackFile = async (id: string | null, file: File): Promise<boolean> => {
	if (!id || !file) return false;
	try {
		const db = await getDB();
		if (!db) return false;

		const arrayBuffer = await file.arrayBuffer();
		await db.put('mediaFiles', { id, file, arrayBuffer });
		return true;
	} catch {
		return false;
	}
};

export const getAlbumTrackFile = async (id: string | null): Promise<File | null> => {
	if (!id) return null;
	try {
		const db = await getDB();
		if (!db) return null;

		const entry = await db.get('mediaFiles', id);
		return entry?.file || null;
	} catch {
		return null;
	}
};

export const deleteAlbumTrackFile = async (id: string | null): Promise<boolean> => {
	if (!id) return false;
	try {
		const db = await getDB();
		if (!db) return false;

		await db.delete('mediaFiles', id);
		return true;
	} catch {
		return false;
	}
};

// Get all media files
export const getAllAlbumTrackFiles = async (): Promise<Array<{ id: string; file: File }>> => {
	try {
		const db = await getDB();
		if (!db) return [];

		const entries = await db.getAll('mediaFiles');
		return entries.map(entry => ({ id: entry.id, file: entry.file }));
	} catch {
		return [];
	}
};

// Store cover art
export const storeAlbumCoverArt = async (id: string, file: File): Promise<boolean> => {
	try {
		const db = await getDB();
		if (!db) return false;

		const arrayBuffer = await file.arrayBuffer();
		await db.put('coverArt', { id, file, arrayBuffer });
		return true;
	} catch {
		return false;
	}
};

export const getAlbumCoverArt = async (id: string | null): Promise<File | null> => {
	if (!id) return null;
	try {
		const db = await getDB();
		if (!db) return null;

		const entry = await db.get('coverArt', id);
		return entry?.file || null;
	} catch {
		return null;
	}
};

export const storeAlbumInfo = async (id: string, info: any): Promise<boolean> => {
	try {
		const db = await getDB();
		if (!db) return false;

		await db.put('albumInfo', { id, ...info });
		return true;
	} catch {
		return false;
	}
};

// Get album info
export const getAlbumInfo = async (id: string): Promise<any | null> => {
	try {
		const db = await getDB();
		if (!db) return null;

		return await db.get('albumInfo', id);
	} catch {
		return null;
	}
};

// Store track info
export const storeTrackInfo = async (id: string, info: any): Promise<boolean> => {
	try {
		const db = await getDB();
		if (!db) return false;

		await db.put('trackInfo', { id, ...info });
		return true;
	} catch {
		return false;
	}
};

// Get track info
export const getTrackInfo = async (id: string): Promise<any | null> => {
	try {
		const db = await getDB();
		if (!db) return null;

		return await db.get('trackInfo', id);
	} catch {
		return null;
	}
};

// Get all track info
export const getAllTrackInfo = async (): Promise<any[]> => {
	try {
		const db = await getDB();
		if (!db) return [];

		return await db.getAll('trackInfo');
	} catch {
		return [];
	}
};

// Clear all data
export const clearAlbumDatabase = async (): Promise<boolean> => {
	try {
		const db = await getDB();
		if (!db) return false;

		const tx = db.transaction(['mediaFiles', 'coverArt', 'albumInfo', 'trackInfo'], 'readwrite');
		await Promise.all([tx.objectStore('mediaFiles').clear(), tx.objectStore('coverArt').clear(), tx.objectStore('albumInfo').clear(), tx.objectStore('trackInfo').clear(), tx.done]);

		return true;
	} catch {
		return false;
	}
};

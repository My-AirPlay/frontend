// Cover-art dimension rules, mirrored from the backend artwork validator so
// the artist gets the error the moment they pick the image — not after filling
// out the whole upload form.

export const ALLOWED_ARTWORK_SIDES = [1400, 3000];

/** Read an image File's pixel dimensions in the browser. */
export const readImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
	new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new window.Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			resolve({ width: img.naturalWidth, height: img.naturalHeight });
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error('Could not read image'));
		};
		img.src = url;
	});

/**
 * Validate a cover-art File against the dimension rules.
 * Returns an error message string if invalid, or null if it's good.
 */
export const validateArtworkFile = async (file: File): Promise<string | null> => {
	let dims: { width: number; height: number };
	try {
		dims = await readImageDimensions(file);
	} catch {
		return 'Could not read that image. Please upload a valid JPG or PNG.';
	}
	const { width, height } = dims;
	if (width !== height) {
		return `Cover art must be square — yours is ${width}×${height}. Use 1400×1400 or 3000×3000.`;
	}
	if (!ALLOWED_ARTWORK_SIDES.includes(width)) {
		return `Cover art must be exactly 1400×1400 or 3000×3000 — yours is ${width}×${height}.`;
	}
	return null;
};

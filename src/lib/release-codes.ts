import { z } from 'zod';

/**
 * UPC field on upload and edit forms. Optional: left blank, a code is
 * assigned from our pool when the release is delivered. Whatever is typed is
 * delivered as the UPC, so it must be a real one (12 or 13 digits).
 */
export const optionalUpcSchema = z
	.string()
	.trim()
	.refine(v => v === '' || /^\d{12,13}$/.test(v.replace(/[\s-]/g, '')), {
		message: "A UPC is 12 or 13 digits. Leave it blank if you don't have one and we'll assign one."
	})
	.optional();

export const UPC_PLACEHOLDER = "Leave blank if you don't have one";

/**
 * Whether the artist has an account we can pay royalties into. Mirrors
 * utils/bank-details.ts on the server, which refuses uploads without one. The
 * admin "override payment" placeholders ("N/A" / 0) count as missing.
 */
export function hasPayoutAccount(artist?: { bankDetails?: { bankName?: string | null; accountName?: string | null; accountNumber?: string | number | null } | null } | null): boolean {
	const b = artist?.bankDetails;
	const filled = (v: unknown) => {
		const s = String(v ?? '').trim();
		return s !== '' && s.toUpperCase() !== 'N/A' && s !== '0';
	};
	return !!b && filled(b.bankName) && filled(b.accountName) && filled(b.accountNumber);
}

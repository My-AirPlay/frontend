import { NextResponse } from 'next/server';
import { clearArtistTokens } from '@/actions/auth/auth.action';

export async function POST() {
	await clearArtistTokens();

	return NextResponse.json({ success: true });
}

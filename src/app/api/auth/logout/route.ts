import { NextResponse } from 'next/server';
import { clearArtistTokens } from '@/actions/auth/auth.action';

export async function POST() {
  console.log('POST /api/auth/logout called');
  await clearArtistTokens();
  return NextResponse.json({ success: true });
}
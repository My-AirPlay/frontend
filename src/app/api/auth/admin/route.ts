import { NextResponse } from 'next/server';
import { 
  setAdminAccessToken, 
  clearAdminTokens, 
  getAdminProfile 
} from '@/actions/auth/auth.action';

export async function POST(request: Request) {
  const body = await request.json();
  const { access, refresh } = body;
  
  if (!access || !refresh) {
    return NextResponse.json({ success: false, message: 'Missing tokens' }, { status: 400 });
  }
  
  await setAdminAccessToken({ access, refresh });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const profile = await getAdminProfile();
  if (!profile) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, profile });
}

export async function DELETE() {
  await clearAdminTokens();
  return NextResponse.json({ success: true });
}
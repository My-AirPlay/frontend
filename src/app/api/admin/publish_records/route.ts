import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { artistIds } = body;

		if (!artistIds || !Array.isArray(artistIds) || artistIds.some(name => typeof name !== 'string')) {
			return NextResponse.json({ message: 'Invalid input: artistNames must be an array of strings.' }, { status: 400 });
		}

		// For now, we'll just log the artist names
		console.log('Received artist names to publish:', artistIds);

		// In a real application, you would process these artist names,
		// e.g., update their status in the database, trigger notifications, etc.

		return NextResponse.json({ message: 'Artists published successfully', receivedArtisNames: artistNames }, { status: 200 });
	} catch (error) {
		console.error('Error publishing artists:', error);
		let errorMessage = 'Internal Server Error';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return NextResponse.json({ message: 'Failed to publish artists', error: errorMessage }, { status: 500 });
	}
}

import { NextResponse } from 'next/server';

const CORRECT_ANSWER = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Check if the answer was correct
    if (text !== CORRECT_ANSWER) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return the secret
    return NextResponse.json({
      secret: process.env.JWT_SECRET || 'your-secret-key'
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
} 
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

const CORRECT_ANSWER = process.env.CORRECT_ANSWER || 'the-secret-answer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ success: false, error: 'No text provided' }, { status: 400 });
  }

  const isCorrect = text === CORRECT_ANSWER;

  // Create JWT with the input text and whether it's correct
  const token = await new SignJWT({ 
    text,
    isCorrect,
    secret: CORRECT_ANSWER,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return NextResponse.json({
    success: isCorrect,
    token,
  });
} 
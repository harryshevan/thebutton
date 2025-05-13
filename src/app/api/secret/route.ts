import { NextResponse } from 'next/server';
import * as jose from 'jose';

const CORRECT_ANSWER = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Create JWT token with the secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const token = await new jose.SignJWT({ secret: process.env.JWT_SECRET || 'your-secret-key' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    if (!text) {
      return NextResponse.json({ 
        error: 'No text provided',
        secret: token
      }, { status: 400 });
    }

    // Special case for verification
    if (text === 'verify') {
      return NextResponse.json({
        secret: token
      });
    }

    // Check if the answer was correct
    if (text !== CORRECT_ANSWER) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        secret: token
      }, { status: 401 });
    }

    // Return the secret
    return NextResponse.json({
      secret: token
    });
  } catch (error) {
    console.error('Error processing request:', error);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const token = await new jose.SignJWT({ secret: process.env.JWT_SECRET || 'your-secret-key' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);
      
    return NextResponse.json({ 
      error: 'Unauthorized',
      secret: token
    }, { status: 401 });
  }
} 
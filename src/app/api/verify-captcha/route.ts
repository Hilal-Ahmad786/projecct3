// src/app/api/verify-captcha/route.ts
import { NextRequest, NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';
const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || '';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { token, captchaType = 'recaptcha' } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 400 }
      );
    }

    let verificationUrl = '';
    let secretKey = '';

    // Support multiple CAPTCHA providers
    switch (captchaType) {
      case 'recaptcha':
        verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
        secretKey = RECAPTCHA_SECRET_KEY;
        break;
      case 'hcaptcha':
        verificationUrl = 'https://hcaptcha.com/siteverify';
        secretKey = HCAPTCHA_SECRET_KEY;
        break;
      case 'turnstile':
        verificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        secretKey = TURNSTILE_SECRET_KEY;
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid CAPTCHA type' },
          { status: 400 }
        );
    }

    const verifyResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();

    return NextResponse.json({
      success: verifyData.success,
      score: verifyData.score,
      challengeTimestamp: verifyData.challenge_ts,
    });
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
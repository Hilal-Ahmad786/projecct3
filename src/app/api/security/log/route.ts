// src/app/api/security/log/route.ts
import { NextRequest, NextResponse } from 'next/server';

// In production, send to your security monitoring service
// (e.g., Sentry, LogRocket, DataDog, etc.)
export async function POST(request: NextRequest) {
  try {
    const activity = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    const securityLog = {
      ...activity,
      ip: clientIP,
      timestamp: new Date().toISOString(),
    };

    // Log to console (replace with your logging service)
    console.warn('🚨 Security Event:', JSON.stringify(securityLog, null, 2));

    // In production, send to monitoring service:
    // await sendToSentry(securityLog);
    // await sendToDataDog(securityLog);
    // await sendToSlack(securityLog);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Security logging error:', error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
    const timestamp = Math.floor(Date.now() / 1000);
    return NextResponse.json({ status: 'healthy', timestamp: timestamp });
};

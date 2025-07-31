import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

async function checkMongoConnection(): Promise<boolean> {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI, {
                bufferCommands: false,
            });
        }
        return true;
    } catch (error) {
        console.error('[MongoDB] Connection error:', error);
        return false;
    }
};

export async function GET(request: NextRequest) {
    const mongoConnected = await checkMongoConnection();

    const response = NextResponse.json(
        {
            status: mongoConnected ? 'healthy' : 'unhealthy',
            service: mongoConnected ? 'connected' : 'disconnected',
        },
        { status: mongoConnected ? 200 : 500 }
    );

    response.headers.set('Cache-Control', 'no-store');
    return response;
};

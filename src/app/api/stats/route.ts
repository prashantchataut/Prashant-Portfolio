import { NextRequest, NextResponse } from 'next/server';

let totalAttempts = 0;
let correctAttempts = 0;

export async function GET() {
    return NextResponse.json({
        totalAttempts,
        correctAttempts,
        message: "Live count since last deploy. Resets on each deployment.",
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));
        const correct = body?.correct === true;

        totalAttempts += 1;
        if (correct) {
            correctAttempts += 1;
        }

        return NextResponse.json({
            success: true,
            totalAttempts,
            correctAttempts,
        });
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
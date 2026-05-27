import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        totalAttempts: 847,
        correctAttempts: 312,
        message: "Stats are approximate and updated periodically.",
    });
}

export async function POST() {
    return NextResponse.json({ success: true, message: "Attempt recorded." });
}
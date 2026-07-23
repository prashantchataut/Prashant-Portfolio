import { NextRequest, NextResponse } from 'next/server';

const reviews: Array<{ stars: number; text: string; timestamp: number }> = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { stars, text } = body;

        if (!stars || stars < 1 || stars > 5) {
            return NextResponse.json({ error: 'Stars must be 1-5' }, { status: 400 });
        }

        reviews.push({
            stars,
            text: (text || '').slice(0, 500),
            timestamp: Date.now(),
        });

        return NextResponse.json({ success: true, total: reviews.length });
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function GET() {
    const avgStars =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
            : '0';

    return NextResponse.json({
        total: reviews.length,
        avgStars,
    });
}

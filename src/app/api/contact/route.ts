import { NextRequest, NextResponse } from 'next/server';

const submissions: Array<{ name: string; email: string; message: string; timestamp: number }> = [];

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        if (message.trim().length > 2000) {
            return NextResponse.json({ error: 'Message too long (max 2000 characters)' }, { status: 400 });
        }

        submissions.push({
            name: name.trim().slice(0, 100),
            email: email.trim().slice(0, 200),
            message: message.trim().slice(0, 2000),
            timestamp: Date.now(),
        });

        return NextResponse.json({ success: true, message: 'Got it. I\'ll get back to you.' });
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json({ total: submissions.length });
}
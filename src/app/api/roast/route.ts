import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_ROASTS = [
    "You said it like you've never seen the English language before. Did you learn phonics from a microwave manual?",
    "That pronunciation was so wrong, autocorrect filed a harassment complaint.",
    "I've heard better pronunciation from GPS navigation systems. And they say 'recalculating' every 3 seconds.",
    "Bevakoof, that was not even close. My name isn't a suggestion — it's a fact.",
    "Your vocal cords and my name are in two different relationships. They're not even texting.",
];

export async function POST(request: NextRequest) {
    try {
        const { attempt } = await request.json();

        if (!attempt || typeof attempt !== 'string') {
            return NextResponse.json(
                { error: 'Attempt is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            const fallback = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
            return NextResponse.json({ roast: fallback });
        }

        const prompt = `You are a brutally honest, witty roast master who mixes Hindi and English naturally (Hinglish style). Someone just tried to pronounce "Prashant Chataut" (pronounced /pruh-SHAANT chuh-TOUT/) and got it WRONG. Their attempt: "${attempt}". Roast them mercilessly about their pronunciation skills. Be savage, be funny, be creative. Question their education, their ears, their ability to read basic English. Suggest they might need their hearing checked, or that they should stick to pointing at things instead of speaking. Keep it under 3 sentences. Don't hold back. Hindi words and putdowns are welcome (like "bevakoof", "pagal hai kya", "kya bol raha hai"). Make it personal and specific to what they said wrong.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 1.0,
                        maxOutputTokens: 200,
                    },
                }),
            }
        );

        if (!response.ok) {
            const fallback = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
            return NextResponse.json({ roast: fallback });
        }

        const data = await response.json();
        const roast = data.candidates?.[0]?.content?.parts?.[0]?.text
            || FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];

        return NextResponse.json({ roast });
    } catch {
        const fallback = FALLBACK_ROASTS[Math.floor(Math.random() * FALLBACK_ROASTS.length)];
        return NextResponse.json({ roast: fallback });
    }
}
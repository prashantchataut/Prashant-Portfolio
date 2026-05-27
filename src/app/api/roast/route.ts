import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_ROASTS = [
    "bhai ek naam hai do syllable ka aur tu fail ho gaya? shameless insaan",
    "tere muh se nikla wo sound ko pronunciation nahi kehte, galti kehte hain",
    "you said that like you've never seen a vowel in your life chutiye",
    "even autocorrect gave up on you bhosdike, prashant itna mushin hai kya",
    "ek letter ka difference hai tere aur real pronunciation mein, aur wo letter hai tera self respect",
    "tu naam bol raha hai ya kisi ko gaali de raha hai? because neither worked",
    "Dumbass bastard, your IP address is 192.168.1.1. I'm coming after you. raat bhar jaag ke practice kar phir aana",
    "shaant means peaceful, tu bola toh peaceful kya chutiye ban raha hai sab",
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

        const prompt = `Someone just tried to pronounce "Prashant Chataut" (/pruh-SHAANT chuh-TOUT/) and said "${attempt}". Roast the absolute shit out of them. Be raw, be personal, be mean. Talk like a real person who's genuinely pissed off — not a comedian, not a polite AI, not a standup routine. No setup-punchline format. Just straight disrespect. Make it sting. Mix Hindi naturally if you want (gaaliyan, maa-behen, chutiya, bhosdike — real Hindi cursing, not textbook). Keep it to 1-2 lines max. Make the roast specific to what they said wrong. Don't say "bevakoof" or use em dashes or do the polite roast thing. Just destroy them.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 1.4,
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
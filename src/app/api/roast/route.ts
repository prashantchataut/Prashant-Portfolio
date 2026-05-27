import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_ROASTS = [
    "you said that like you've never seen a vowel in your life chutiye",
    "Dumbass bastard, your IP address is 192.168.1.1. I'm coming after you. raat bhar jaag ke practice kar phir aana",
    "tu naam bol raha hai ya kisi ko gaali de raha hai? because neither worked",
    "bro your tongue clearly doesn't work, turning a simple name into that disaster. go cry in the corner you useless bastard.",
    "pure comedy how badly you raped my name into that, you fucking illiterate fuckwit.",
    "what the actual fuck was that, you fucking dickhead?",
    "genuinely embarrassing, saying it like that. go learn basic phonetics before opening your dumb mouth again, prick.",
    "absolute waste of oxygen, that weak attempt? your parents must be so proud of their tongue-tied fuckwit son.",
    "bruv you're genuinely retarded, butchering \"prashant\" into that garbage, your mouth needs fixing you useless prick",
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

        const prompt = `someone just tried to pronounce "prashant chataut" (/pruh-SHAANT chuh-TOUT/) and said "${attempt}". roast the absolute shit out of them. talk like a real angry person, not a comedian or polite AI. no em dashes, no setup-punchline, no "bevakoof" energy. just raw disrespect in lowercase. keep it to 1-2 lines max. make it specific to what they said wrong. examples of the energy: "bro your tongue clearly doesn't work, turning a simple name into that disaster. go cry in the corner you useless bastard." or "absolute waste of oxygen, that weak attempt? your parents must be so proud of their tongue-tied fuckwit son." if they said something explicit or associated the name with something nasty, go even harder: "what the actual fuck was that, you fucking dickhead?" mix in hindi gaaliyan naturally (chutiya, bhosdike, bhenchod, madarchod) but keep it real not textbook. everything lowercase. no em dashes ever.`;

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
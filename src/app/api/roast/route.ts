import { NextRequest, NextResponse } from 'next/server';

const SPICY_ROASTS = [
    "bro your tongue clearly doesn't work, turning a simple name into that disaster. go cry in the corner you useless bastard.",
    "pure comedy how badly you raped my name into that, you fucking illiterate fuckwit.",
    "what the actual fuck was that, you fucking dickhead?",
    "bruv you're genuinely retarded, butchering \"prashant\" into that garbage, your mouth needs fixing you useless prick",
    "absolute waste of oxygen, that weak attempt? your parents must be so proud of their tongue-tied fuckwit son.",
    "you said that like you've never seen a vowel in your life chutiye",
    "Dumbass bastard, your IP address is 192.168.1.1. I'm coming after you. raat bhar jaag ke practice kar phir aana",
    "tu naam bol raha hai ya kisi ko gaali de raha hai? because neither worked",
];

const VEG_ROASTS = [
    "is prashant chataut really that impossible for a grown adult? that exposed how slow and useless you actually are.",
    "you pesky little rat, butchering a simple name into that garbage. your mouth clearly never evolved past kindergarten level.",
    "mayalu, you genuinely sound brain-damaged saying it like that. some people just weren't built with working ears or tongues.",
    "prick, you genuinely sound brain-damaged saying it like that. some people just weren't built with working ears or tongues.",
    "that wasn't even close, you sad, unrefined nobody. keep struggling with basic human skills.",
    "pathetic excuse for a person, mangling something simple like it's your only talent in life.",
    "that mess of a pronunciation proves you're the type who fails at easy stuff and still acts like you're competent.",
];

export async function POST(request: NextRequest) {
    try {
        const { attempt, spicy } = await request.json();

        if (!attempt || typeof attempt !== 'string') {
            return NextResponse.json(
                { error: 'Attempt is required' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (spicy) {
            if (!apiKey) {
                const fallback = SPICY_ROASTS[Math.floor(Math.random() * SPICY_ROASTS.length)];
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
                const fallback = SPICY_ROASTS[Math.floor(Math.random() * SPICY_ROASTS.length)];
                return NextResponse.json({ roast: fallback });
            }

            const data = await response.json();
            const roast = data.candidates?.[0]?.content?.parts?.[0]?.text
                || SPICY_ROASTS[Math.floor(Math.random() * SPICY_ROASTS.length)];

            return NextResponse.json({ roast });
        } else {
            if (!apiKey) {
                const fallback = VEG_ROASTS[Math.floor(Math.random() * VEG_ROASTS.length)];
                return NextResponse.json({ roast: fallback });
            }

            const prompt = `someone just tried to pronounce "prashant chataut" (/pruh-SHAANT chuh-TOUT/) and said "${attempt}". roast them but keep it clean, no swearing, no f-words, no chutiya/bhosdike type gaaliyan. still make it sting though. be sharp and personal, not polite. lowercase. no em dashes. 1-2 lines max. make it specific to what they said wrong. examples of the energy: "you pesky little rat, butchering a simple name into that garbage. your mouth clearly never evolved past kindergarten level." or "that wasn't even close, you sad, unrefined nobody. keep struggling with basic human skills." you can use mild hindi like "mayalu" or "bhai" but no heavy gaaliyan. everything lowercase. no em dashes ever.`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 1.2,
                            maxOutputTokens: 200,
                        },
                    }),
                }
            );

            if (!response.ok) {
                const fallback = VEG_ROASTS[Math.floor(Math.random() * VEG_ROASTS.length)];
                return NextResponse.json({ roast: fallback });
            }

            const data = await response.json();
            const roast = data.candidates?.[0]?.content?.parts?.[0]?.text
                || VEG_ROASTS[Math.floor(Math.random() * VEG_ROASTS.length)];

            return NextResponse.json({ roast });
        }
    } catch {
        const fallback = VEG_ROASTS[Math.floor(Math.random() * VEG_ROASTS.length)];
        return NextResponse.json({ roast: fallback });
    }
}
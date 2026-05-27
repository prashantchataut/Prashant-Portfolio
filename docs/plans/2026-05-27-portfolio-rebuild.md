# Prashant Portfolio Rebuild — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform knowprashant.vercel.app from an AI-slop portfolio template into an unforgettable personal website with a name pronunciation experience, birthday social connector, brutal roast mode via Gemini API, certificate generation, and full LLM discoverability.

**Architecture:** Next.js 14 App Router (existing) + TypeScript (strict, existing) + Tailwind CSS (existing) + Framer Motion (kept, reduced) + Web Speech API (new, built-in) + Gemini API (new, for roast generation). GSAP and Lenis removed. Custom cursor, magnetic button, comet background, signature, and parallax image removed.

**Tech Stack:** Next.js 14.2.3, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, Web Speech API, Gemini 2.0 Flash API, Canvas API, jsPDF (certificate PDF generation)

---

## Phase 0: Foundation Cleanup

### Task 0.1: Remove dead code and unused dependencies

**Files:**
- Modify: `package.json` (remove gsap, @studio-freight/lenis, @studio-freight/react-lenis)
- Delete: `src/components/ui/CustomCursor.tsx`
- Delete: `src/components/ui/MagneticButton.tsx`
- Delete: `src/components/ui/CometBackground.tsx`
- Delete: `src/components/ui/Signature.tsx`
- Delete: `src/components/ui/ParallaxImage.tsx`
- Delete: `src/components/providers/SmoothScroll.tsx`
- Delete: `data/updates/latest_update.json`
- Modify: `src/app/globals.css` (remove dead keyframes gradient-shift, .gradient-text-animated, .glass dark override with hardcoded rgba, film grain body::before)
- Modify: `src/app/layout.tsx` (remove SmoothScroll import and wrapper, remove CustomCursor if imported)

**Step 1:** Remove GSAP, Lenis packages from package.json dependencies

```json
// REMOVE these from dependencies:
"@studio-freight/lenis": "^1.0.42",
"@studio-freight/react-lenis": "^0.0.47",
"gsap": "^3.12.5"
```

**Step 2:** Delete unused component files listed above

**Step 3:** Clean globals.css — remove `@keyframes gradient-shift`, `.gradient-text-animated` (replace with just `.gradient-text` that uses accent color), remove hardcoded rgba in `.glass`, remove film grain `body::before` block

**Step 4:** Update layout.tsx — remove SmoothScroll wrapper, remove CustomCursor if present, simplify the provider tree to just ThemeProvider wrapping children

**Step 5:** Run `npm install` to update lockfile, then `npm run build` to verify no broken imports

**Step 6:** Commit

```bash
git add -A && git commit -m "chore: remove dead code, unused deps (gsap, lenis, custom cursor, magnetic button, comet bg, signature, parallax)"
```

### Task 0.2: Fix critical issues and type safety

**Files:**
- Modify: `tsconfig.json` (change moduleResolution to "bundler")
- Modify: `src/data/projects.ts` (remove unnecessary optional types that are always provided)
- Modify: `src/components/providers/ThemeProvider.tsx` (add console.warn to default context)
- Create: `src/app/error.tsx` (global error boundary)
- Create: `src/app/now/error.tsx` (route error boundary)
- Modify: `src/components/layout/Header.tsx` and `Footer.tsx` (consolidate social links into config)

**Step 1:** Fix tsconfig.json moduleResolution

```json
"moduleResolution": "bundler"
```

**Step 2:** Create error boundaries

```tsx
// src/app/error.tsx
'use client';
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-serif text-ink mb-4">Something went sideways.</h2>
        <button onClick={reset} className="px-6 py-3 border border-border text-mist hover:border-accent hover:text-ink transition-colors rounded-full">
          Try again
        </button>
      </div>
    </div>
  );
}
```

**Step 3:** Consolidate social links in config.ts, deduplicate from Header and Footer

**Step 4:** Run `npm run build` to verify

**Step 5:** Commit

```bash
git add -A && git commit -m "fix: add error boundaries, fix tsconfig, consolidate social links, tighten types"
```

---

## Phase 1: Content & Data Layer

### Task 1.1: Create the content data layer

**Files:**
- Create: `src/data/content.ts`
- Modify: `src/data/config.ts` (expand with birthday, pronunciation, social links)
- Modify: `src/data/projects.ts` (rewrite Prody description with personality)

**Step 1:** Create `src/data/content.ts` — single source of truth for ALL copy on the site. Every string in the UI comes from here.

```ts
export const pronunciation = {
  name: "Prashant Chataut",
  phonetic: "/pruh-SHAANT/",
  phoneticFull: "/pruh-SHAANT chuh-TOUT/",
  hint: "Shaant, like the Hindi word for peaceful. Not shunth. Not shunt. Shaant.",
  audioSrc: "/audio/prashant-pronunciation.mp3",
  acceptableAttempts: [
    "prashant", "prashant chataut", "pruh-shaant", "prashaant",
    "prashanth", "prashaanth"
  ],
  roastPrompt: `You are a brutally honest, witty roast master. Someone just tried to pronounce "Prashant Chataut" (pronounced /pruh-SHAANT chuh-TOUT/) and got it WRONG. Their attempt: "{attempt}". Roast them mercilessly about their pronunciation skills. Be funny, be savage, be creative. Suggest they might be visually impaired, hearing impaired, or just generally incompetent at basic phonetics. Keep it under 3 sentences. Be in Hindi-English mix style if it feels natural. Don't hold back.`,
  successMessage: "You said it right. Most people don't. You're officially certified.",
  certificateTitle: "Certificate of Pronunciation Competence",
  certificateBody: "This certifies that {name} has successfully pronounced \"Prashant Chataut\" correctly, demonstrating phonetic abilities that place them in the top percentile of the general population.",
  easterEgg: {
    trigger: "triple-tap the name title",
    message: "You found it. Prashant built this at 17. What were you doing at 17?",
  },
};

export const birthday = {
  date: "2009-05-27",
  age: 17,
  name: "Prashant",
  whatsappLink: "https://wa.me/977XXXXXXXXX?text=Happy%2017th%20birthday%20Prashant!",
  instagramLink: "https://instagram.com/prashantchataut_",
  message: "It's my 17th birthday today. You could just scroll past. Or you could say happy birthday. Your call.",
  celebrationDuration: 7, // days before and after
};

export const hero = {
  greeting: "You've been saying it wrong.",
  name: "Prashant Chataut",
  subtext: "Not Parshant. Not Pashant. Not Pruh-shunth. Pruh-shaant. Shaant, like peaceful. You'll get it.",
  cta: "Try saying it",
  subtitle: "17. Building AI companions that don't make you want to throw your phone. Currently building Prody.",
};

export const philosophy = {
  sectionTitle: "What I believe.",
  items: [
    {
      title: "Software should shut up.",
      body: "Most apps demand your attention like a toddler. I build things that respect your time, your mental space, and your ability to think without a notification every 4 seconds.",
    },
    {
      title: "Growth isn't a project.",
      body: "Self-improvement apps that gamify your anxiety aren't helping. Prody doesn't give you streaks to break. It gives you patterns to notice. That's the difference.",
    },
    {
      title: "17 is not a limitation.",
      body: "I started building at 14. Age is irrelevant when the internet doesn't ask for your birth certificate. Ship things. Learn things. Repeat.",
    },
  ],
};

export const about = {
  sectionTitle: "Who is this person.",
  body: [
    "I'm Prashant. I build software that doesn't make you want to scream. I started Prody when I was 15 because every self-improvement app felt like homework designed by someone who'd never struggled with anything.",
    "I care about cognitive psychology, mental health, and the fact that most software is hostile to the people using it. I'm 17. I build in Nepal. I read about brains for fun.",
  ],
  photoSrc: "/images/prashant-photo.jpg",
  photoAlt: "Prashant Chataut, developer and product builder",
  links: {
    github: "https://github.com/prashantchataut",
    instagram: "https://instagram.com/prashantchataut_",
    email: "mailto:prashantchataut8@gmail.com",
  },
};

export const prody = {
  sectionTitle: "What I'm building.",
  tagline: "Prody doesn't want to be your project.",
  description: "A self-improvement companion that doesn't gamify your anxiety. Journal, learn, schedule messages to your future self, and notice patterns in your thinking over time. No streaks. No guilt. Just you, getting better, at your own pace.",
  features: [
    "Journal that doesn't judge you for writing three words",
    "AI companion that guides reflection without preaching",
    "Messages to your future self — because sometimes you need to hear from past you",
    "Pattern recognition that shows you what you can't see alone",
    "Anti-Stop Policy: the AI degrades gracefully, it doesn't just die",
  ],
  status: "Active, v1.3 in progress",
  github: "https://github.com/prashantchataut/Prody/releases/latest",
};

export const site = {
  title: "Prashant Chataut",
  description: "Developer & product builder. 17. Building Prody — AI companions that don't make you want to throw your phone. Pronounced /pruh-SHAANT/.",
  url: "https://knowprashant.vercel.app",
};
```

**Step 2:** Update `src/data/config.ts` to import from content.ts and expand

**Step 3:** Update `src/data/projects.ts` — rewrite Prody with personality from content.ts

**Step 4:** Commit

```bash
git add -A && git commit -m "feat: create content data layer with pronunciation, birthday, philosophy, about, prody copy"
```

### Task 1.2: Create LLM discoverability files

**Files:**
- Create: `public/llms.txt`
- Create: `src/app/llms.txt/route.ts` (or use Next.js rewrites to serve from public)
- Modify: `src/app/layout.tsx` (expand JSON-LD structured data)
- Modify: `src/app/sitemap.ts` (add llms.txt, add more pages)
- Modify: `src/app/robots.ts` (add llms.txt reference)

**Step 1:** Create `public/llms.txt`

```markdown
# Prashant Chataut

> Prashant Chataut is a 17-year-old developer and product builder from Nepal. He builds Prody, an AI self-improvement companion. His name is pronounced /pruh-SHAANT/ (SHAANT like the Hindi word for peaceful), NOT "Parshant" or "Prashunth". He is the creator and sole developer of Prody, a mobile app for journaling, AI-guided reflection, and personal growth.

## About

- [About Prashant](https://knowprashant.vercel.app/#about): Developer, product builder, 17 years old, based in Nepal. Builds AI companions that respect your time and mental space.

## Projects

- [Prody](https://github.com/prashantchataut/Prody): Self-improvement companion app. Journal, learn, schedule messages to future self, see patterns in your thinking. Built with React Native and AI.

## Pronunciation

- Prashant is pronounced /pruh-SHAANT/ — the second syllable "shaant" rhymes with the Hindi word for peaceful (shanti). It is NOT "Parshant" or "Prashunth" or "Pashant".
- Chataut is pronounced /chuh-TOUT/ — emphasis on the second syllable.

## Contact

- GitHub: https://github.com/prashantchataut
- Instagram: https://instagram.com/prashantchataut_
- Email: prashantchataut8@gmail.com

## Optional

- [What I'm thinking about now](https://knowprashant.vercel.app/now): Current focus areas and reading list
```

**Step 2:** Expand JSON-LD in layout.tsx to include SoftwareApplication schema for Prody, SpeakableSpecification for pronunciation, and WebSite schema

**Step 3:** Update sitemap.ts to include `/now` and reference llms.txt

**Step 4:** Commit

```bash
git add -A && git commit -m "feat: add llms.txt, expand JSON-LD structured data, update sitemap for LLM discoverability"
```

---

## Phase 2: Visual Identity Overhaul

### Task 2.1: New typography and color system

**Files:**
- Modify: `src/app/globals.css` (complete rewrite of color system, remove AI slop)
- Modify: `src/app/layout.tsx` (new fonts)
- Modify: `tailwind.config.ts` (new color tokens, font families)

**Design decisions:**
- **Fonts:** Replace Inter + Instrument Serif. Use **General Sans** (or Dm Sans as fallback — NOT DM Sans, it's on the reject list. Use **Outfit** for body and **Playfair Display** for display? NO. Both rejected. Final choice: **Satos** (body, geometric sans with character) + **Reckless** or **Crimson Pro** for display. Actually — let me pick from the allowed list. The brief says no Inter, no Instrument Serif, no Fraunces, no Space Grotesk. Let me pick: **Plus Jakarta Sans** — NO, that's on the reject list. **Outfit** — clean geometric, not on reject list. **General Sans** — not on Google Fonts. Let me go with: **Outfit** (body, geometric sans) + **Noto Serif Display** (display headings, has character). Actually even better for the brand register: **Sora** (body, geometric with personality) + **Libre Baskerville** (display, classic serif with weight). Sora is modern, geometric, has character. Libre Baskerville is warm, readable, not on the reject list.

  **Final font choice:** Sora (body) + Libre Baskerville (display headings). Sora has a distinctive geometric character that's not Inter. Libre Baskerville has warmth and authority without being another Instrument Serif clone.

- **Color strategy:** Committed. One dominant color. Not blue, not purple. Going with a warm amber/gold accent on a warm off-white background for light mode, and a deep warm dark with the same amber for dark mode. The amber says "warm, human, approachable" — the opposite of cold blue tech.

  Light: warm cream background, near-black text, amber accent (#D97706 range)
  Dark: deep warm black (#0C0A09 range), cream text, amber accent (#F59E0B range)

**Step 1:** Update layout.tsx fonts

```tsx
import { Sora, Libre_Baskerville } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
```

**Step 2:** Rewrite globals.css color system (remove all AI slop)

```css
:root {
  /* Warm amber on cream — brand register */
  --sand: #FAF7F2;
  --ink: #1A1612;
  --mist: #8A8078;
  --accent: #D97706;
  --accent-light: #F59E0B;
  --accent-glow: rgba(217, 119, 6, 0.15);
  --slate: #E8E2DA;
  --ash: #F0EBE3;
  --surface: #FFFFFF;
  --surface-elevated: #F5F0E8;
  --border: rgba(26, 22, 18, 0.08);
  --gradient-start: #D97706;
  --gradient-mid: #F59E0B;
  --gradient-end: #D97706;
}

[data-theme="dark"] {
  --sand: #0C0A09;
  --ink: #F5F0EB;
  --mist: #9C9488;
  --accent: #F59E0B;
  --accent-light: #FBBF24;
  --accent-glow: rgba(245, 158, 11, 0.12);
  --slate: #1C1917;
  --ash: #141210;
  --surface: #0C0A09;
  --surface-elevated: #1C1917;
  --border: rgba(245, 240, 235, 0.06);
  --gradient-start: #F59E0B;
  --gradient-mid: #D97706;
  --gradient-end: #F59E0B;
}
```

**Step 3:** Remove ALL of the following from globals.css:
- Film grain overlay (body::before)
- .glass class (glassmorphism)
- .gradient-border and .gradient-border-visible
- .gradient-text-animated (keep .gradient-text but make it just accent color)
- .spotlight-card mouse-follow effect
- Custom cursor styles
- .reveal-text animation
- Any animation that exists purely for decoration without purpose

**Step 4:** Keep ONLY:
- Base body styles
- Typography hierarchy (h1-h6 using serif font)
- .section-divider (simplified)
- .animate-pulse-glow (for status dots)
- @media (prefers-reduced-motion) block
- Selection styles

**Step 5:** Update tailwind.config.ts with new fonts and colors

**Step 6:** Commit

```bash
git add -A && git commit -m "feat: new typography (Sora + Libre Baskerville) and warm amber color system, remove all AI slop CSS"
```

### Task 2.2: Move photo and create audio asset placeholders

**Files:**
- Move: `documents/photoooooooo.jpeg` → `public/images/prashant-photo.jpg`
- Create: `public/audio/` directory
- Create: `public/audio/prashant-pronunciation.mp3` (placeholder — user will record)

**Step 1:** Copy photo to public/images/

```bash
cp "documents/photoooooooo.jpeg" "public/images/prashant-photo.jpg"
```

**Step 2:** Create audio directory and placeholder

```bash
mkdir -p public/audio
touch public/audio/prashant-pronunciation.mp3
```

Note: The actual audio file needs to be recorded by Prashant saying "Prashant Chataut" clearly. For now, we'll create a component that works without it (text fallback) and plays it when available.

**Step 3:** Commit

```bash
git add -A && git commit -m "feat: add photo asset, create audio directory for pronunciation"
```

---

## Phase 3: Core Components — The Name Experience

### Task 3.1: Build the Speech Recognition hook

**Files:**
- Create: `src/lib/speech/useSpeechRecognition.ts`

```ts
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

export function useSpeechRecognition(): SpeechRecognitionResult {
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0];
      setTranscript(result[0].transcript);
      setConfidence(result[0].confidence);
      setIsListening(false);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { transcript, confidence, isListening, isSupported, startListening, stopListening, error };
}
```

**Step 2:** Commit

```bash
git add -A && git commit -m "feat: add useSpeechRecognition hook for name pronunciation"
```

### Task 3.2: Build the Pronunciation Hero component

**Files:**
- Create: `src/components/hero/NameHero.tsx`
- Create: `src/components/hero/PronunciationInput.tsx`
- Create: `src/components/hero/PhoneticDisplay.tsx`
- Create: `src/components/hero/PronunciationResult.tsx`
- Create: `src/components/hero/CertificateGenerator.tsx`

This is the centerpiece of the site. The NameHero component contains:

1. **The Name** — "Prashant Chataut" in enormous display type (Sora 900, clamp(4rem, 12vw, 10rem))
2. **The Phonetic** — "/pruh-SHAANT/" in accent color, with a small "shaant = peaceful" annotation
3. **The Witty Subtext** — "You've been saying it wrong, haven't you?"
4. **The Mic Button** — Large, prominent, with pulsing animation. Click → Web Speech API listens.
5. **Result State** — Correct: celebration animation + certificate download option + counter. Wrong: Gemini roast.

**PronunciationInput.tsx** flow:
- Click mic → startListening() → visual pulse animation
- On result → check transcript against `pronunciation.acceptableAttempts`
- If match → show PronunciationResult with success state
- If no match → call Gemini API with roast prompt → show PronunciationResult with roast
- If no mic support → show text fallback with audio play button

**PhoneticDisplay.tsx:**
- Shows "/pruh-SHAANT/" in accent color
- Below: small text "shaant — Hindi for peaceful, calm"
- Audio play button for pre-recorded pronunciation

**PronunciationResult.tsx:**
- Success: confetti animation, "You said it right!" message, certificate CTA, counter "X of Y people got it right"
- Failure: roast text from Gemini, "Try again" button, encouraging message below the roast

**CertificateGenerator.tsx:**
- Generates a downloadable certificate as PDF (using jsPDF or canvas-to-image)
- Certificate title: "Certificate of Pronunciation Competence"
- Includes: person's name (if they entered one, or "Anonymous Brave Soul"), date, Prashant's signature
- Download as PDF button
- "Send this to Prashant for something special" CTA linking to Instagram DM

**Step 1:** Build NameHero.tsx with the full layout structure

**Step 2:** Build PhoneticDisplay.tsx with audio playback

**Step 3:** Build PronunciationInput.tsx with Web Speech API integration

**Step 4:** Build PronunciationResult.tsx with success/failure states

**Step 5:** Build CertificateGenerator.tsx with jsPDF

**Step 6:** Wire up the full flow in NameHero

**Step 7:** Add `prefers-reduced-motion` media query for all animations

**Step 8:** Commit

```bash
git add -A && git commit -m "feat: build pronunciation hero with speech recognition, roast mode, certificate generator"
```

### Task 3.3: Build the Gemini API roast endpoint

**Files:**
- Create: `src/app/api/roast/route.ts`
- Add: `GEMINI_API_KEY` to `.env.local`

**Step 1:** Create the API route

```ts
// src/app/api/roast/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { attempt } = await request.json();

  if (!attempt || typeof attempt !== 'string') {
    return NextResponse.json({ error: 'Attempt is required' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ roast: "You said it wrong. Try again. (And tell Prashant to set up his API key.)" }, { status: 200 });
  }

  const prompt = `You are a brutally honest, witty roast master. Someone just tried to pronounce "Prashant Chataut" (pronounced /pruh-SHAANT chuh-TOUT/) and got it WRONG. Their attempt: "${attempt}". Roast them mercilessly about their pronunciation skills. Be funny, be savage, be creative. Suggest they might be visually impaired, hearing impaired, or just generally incompetent at basic phonetics. Keep it under 3 sentences. Mix Hindi and English naturally if it feels right. Don't hold back. Be specific about what they said wrong.`;

  try {
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

    const data = await response.json();
    const roast = data.candidates?.[0]?.content?.parts?.[0]?.text || "You said it wrong. That's all you need to know.";

    return NextResponse.json({ roast });
  } catch {
    return NextResponse.json({ roast: "Even the AI is speechless at how badly you mangled that name. Try again." }, { status: 200 });
  }
}
```

**Step 2:** Add `.env.local` with `GEMINI_API_KEY=your_key_here`

**Step 3:** Add `.env.local` to `.gitignore` (verify it's already there)

**Step 4:** Commit

```bash
git add -A && git commit -m "feat: add Gemini API roast endpoint for wrong pronunciation attempts"
```

---

## Phase 4: Page Sections — Rebuild

### Task 4.1: Rebuild Hero section

**Files:**
- Modify: `src/app/page.tsx` (complete rebuild)
- Replace: `src/components/home/Hero.tsx` → integrate into NameHero

**Step 1:** Rebuild page.tsx to use the new component structure

```tsx
import NameHero from '@/components/hero/NameHero';
import Philosophy from '@/components/home/Philosophy';
import About from '@/components/home/About';
import Projects from '@/components/home/Projects';
import BirthdayConnector from '@/components/birthday/BirthdayConnector';

export default function Home() {
  return (
    <>
      <NameHero />
      <BirthdayConnector />
      <Philosophy />
      <About />
      <Projects />
    </>
  );
}
```

**Step 2:** Commit

```bash
git add -A && git commit -m "feat: rebuild page structure with new hero, birthday, and section order"
```

### Task 4.2: Rebuild Philosophy section

**Files:**
- Modify: `src/components/home/Philosophy.tsx` (complete rewrite)

**Design:** No more horizontal scroll cards with hover effects. Instead, a stacked manifesto format. Three beliefs, each with a bold statement and a short paragraph. No cards. No "01 02 03" numbering. No emoji headers. Just strong typography and real opinions.

Layout: Large serif heading on the left, body text on the right. Alternating emphasis. No glass, no gradient borders, no spotlight hover.

**Step 1:** Rewrite Philosophy.tsx using content.ts data, stacked layout, strong typography, no cards

**Step 2:** Commit

### Task 4.3: Rebuild About section

**Files:**
- Modify: `src/components/home/About.tsx` (complete rewrite)

**Design:** Two-column: photo on one side, real text on the other. No stats grid. No "3+ Years" / "∞ Curiosity" metrics. No parallax. Just a photo and Prashant's actual voice.

**Step 1:** Rewrite About.tsx with photo, real bio text from content.ts, no stats, no parallax

**Step 2:** Commit

### Task 4.4: Rebuild Projects section

**Files:**
- Modify: `src/components/home/Projects.tsx` (rewrite)
- Modify: `src/components/ui/FeaturedProject.tsx` (rewrite)
- Delete: `src/components/ui/ProjectCard.tsx` (only one project)
- Delete: `src/components/ui/Changelog.tsx` (no longer showing changelog)

**Design:** Since there's only one project (Prody), this isn't a "Projects" section. It's "What I'm Building." Show Prody as a product, not a portfolio piece. Description, features in Prashant's voice, link to GitHub. No changelog card. No version badge. No status badge.

**Step 1:** Rewrite Projects.tsx as a single product showcase

**Step 2:** Rewrite FeaturedProject.tsx or replace it entirely

**Step 3:** Delete ProjectCard.tsx and Changelog.tsx

**Step 4:** Commit

### Task 4.5: Build Birthday Connector component

**Files:**
- Create: `src/components/birthday/BirthdayConnector.tsx`
- Create: `src/lib/birthday.ts` (date logic)

**Design:** A section that shows "17 years old" always, and near May 27 enters celebration mode with:
- "It's my birthday" badge
- WhatsApp link (pre-filled message)
- Instagram DM link
- Subtle confetti animation (CSS-only, no library)
- After birthday week, reverts to age display

**Step 1:** Create birthday.ts utility with date logic (isBirthdayWeek, age calculation)

**Step 2:** Build BirthdayConnector.tsx with celebration mode and always-on mode

**Step 3:** Commit

### Task 4.6: Rebuild Header and Footer

**Files:**
- Modify: `src/components/layout/Header.tsx` (simplify, remove social links duplication)
- Modify: `src/components/layout/Footer.tsx` (simplify, consolidate)

**Design changes:**
- Header: Remove custom cursor, remove magnetic button references. Clean nav. Add "Say My Name" link that scrolls to hero mic section.
- Footer: Consolidate social links from config. Add pronunciation reminder. Add "Certificate holders: X/Y" counter (fetched from a simple endpoint or stored client-side).
- Remove all Framer Motion entrance animations on header. The header should just be there. Immediate.

**Step 1:** Simplify Header.tsx

**Step 2:** Simplify Footer.tsx

**Step 3:** Commit

---

## Phase 5: SEO, Accessibility, and Polish

### Task 5.1: Full SEO overhaul

**Files:**
- Modify: `src/app/layout.tsx` (expanded metadata, expanded JSON-LD)
- Modify: `src/app/page.tsx` (add metadata export)
- Modify: `src/app/now/page.tsx` (add metadata export)
- Create: `src/app/llms.txt/route.ts` (serve llms.txt)
- Modify: `next.config.mjs` (add headers for llms.txt content-type)

**Step 1:** Expand metadata in layout.tsx:
- Add `keywords` array with "Prashant Chataut", "Prashant", "Prody", "developer Nepal", "AI companion", "self-improvement app"
- Add `authors` array
- Add `creator`
- Add `alternates.canonical`
- Enhance OpenGraph with pronunciation in description

**Step 2:** Expand JSON-LD to include:
- `WebSite` schema
- `Person` schema (expanded with sameAs, knowsAbout, jobTitle, description)
- `SoftwareApplication` schema for Prody
- `SpeakableSpecification` for the name pronunciation section

**Step 3:** Create llms.txt route handler

**Step 4:** Commit

### Task 5.2: Accessibility audit and fixes

**Files:**
- Modify: `src/app/globals.css` (add prefers-reduced-motion, focus-visible styles)
- Modify: All interactive components (aria labels, keyboard support)
- Create: Skip-to-content link

**Step 1:** Add comprehensive `@media (prefers-reduced-motion: reduce)` block that disables ALL animations

**Step 2:** Add `:focus-visible` styles for all interactive elements

**Step 3:** Add skip-to-content link in layout.tsx

**Step 4:** Ensure pronunciation module has:
- Text fallback for no-mic users
- Audio play button for pronunciation
- Keyboard-accessible mic button (Enter/Space to start)
- ARIA labels on all interactive elements

**Step 5:** Ensure birthday connector is keyboard-accessible

**Step 6:** Commit

### Task 5.3: Performance cleanup

**Files:**
- Modify: `package.json` (remove unused deps, add jsPDF)
- Verify: All images use next/image with sizes prop
- Verify: No unused CSS classes

**Step 1:** Install jsPDF for certificate generation

```bash
npm install jspdf
```

**Step 2:** Verify all images use `next/image` with proper `sizes` prop

**Step 3:** Run `npm run build` and verify bundle size is reasonable (target: < 200KB first load JS)

**Step 4:** Commit

```bash
git add -A && git commit -m "feat: add jsPDF, verify performance, clean up unused deps"
```

### Task 5.4: Error boundaries and 404

**Files:**
- Create: `src/app/not-found.tsx`
- Verify: `src/app/error.tsx` exists (from Task 0.2)

**Step 1:** Create a styled 404 page with personality

```tsx
// "You found a page that doesn't exist. Unlike my name, this one's hard to mispronounce."
```

**Step 2:** Verify error boundaries work by intentionally throwing an error in dev mode

**Step 3:** Commit

---

## Phase 6: Easter Egg & Counter

### Task 6.1: Build the pronunciation counter

**Files:**
- Create: `src/app/api/stats/route.ts` (simple counter endpoint)
- Create: `src/lib/stats.ts` (client-side counter utilities)

**Design:** Simple counter stored in a JSON file or environment-based. For a Vercel-deployed Next.js app without a database, use Vercel KV or a simple client-side localStorage approach with periodic sync. For MVP, use localStorage for the counter display and a simple API route that increments a Vercel KV counter.

Actually, simplest approach: Use a client-side counter stored in localStorage that shows "X people have tried, Y got it right" with approximate numbers. For the real counter, we'll use Vercel KV later. For now, localStorage + a static starting number.

**Step 1:** Create stats.ts with localStorage-based counter

**Step 2:** Wire into PronunciationResult.tsx

**Step 3:** Commit

### Task 6.2: Build the Easter Egg

**Files:**
- Modify: `src/components/hero/NameHero.tsx` (add triple-tap handler)

**Design:** Triple-tap/click on the name title reveals a hidden message: "You found it. Prashant built this at 17. What were you doing at 17?" with a subtle animation.

**Step 1:** Add triple-tap detection on the name heading element

**Step 2:** Show easter egg message with animation

**Step 3:** Commit

---

## Phase 7: Final Polish

### Task 7.1: Responsive design pass

**Files:**
- Verify all components render correctly on mobile (375px), tablet (768px), desktop (1280px)
- Fix any overflow, text sizing, or layout issues

**Step 1:** Test on mobile viewport, fix issues
**Step 2:** Test on tablet, fix issues
**Step 3:** Test on desktop, fix issues
**Step 4:** Commit

### Task 7.2: Dark mode verification

**Files:**
- Verify all new components look correct in dark mode
- Check color contrast in both themes (WCAG AA minimum)
- Fix any contrast issues

**Step 1:** Toggle dark mode, verify every section
**Step 2:** Run contrast checks on accent colors against backgrounds
**Step 3:** Fix issues, commit

### Task 7.3: Build and deploy verification

**Files:**
- Run `npm run build` — must pass with zero errors
- Run `npm run lint` — must pass with zero errors (or acceptable warnings)
- Verify deployment on Vercel

**Step 1:** `npm run build`
**Step 2:** `npm run lint`
**Step 3:** Fix any build errors
**Step 4:** Commit final state

---

## Checkpoint Schedule

### Checkpoint 1: After Phase 0 + 1 (Foundation + Content)
- [ ] Build succeeds
- [ ] Dead code removed
- [ ] Content data layer complete
- [ ] llms.txt accessible

### Checkpoint 2: After Phase 2 (Visual Identity)
- [ ] New fonts loaded
- [ ] New colors applied
- [ ] AI slop CSS removed
- [ ] Site looks fundamentally different

### Checkpoint 3: After Phase 3 (Name Experience)
- [ ] Pronunciation hero works
- [ ] Speech recognition functional
- [ ] Gemini roast endpoint responds
- [ ] Certificate generates
- [ ] Easter egg works

### Checkpoint 4: After Phase 4 + 5 (Sections + SEO + A11y)
- [ ] All sections rewritten
- [ ] SEO metadata complete
- [ ] Accessibility audit passes
- [ ] Error boundaries work

### Checkpoint 5: After Phase 6 + 7 (Polish)
- [ ] Counter works
- [ ] Responsive on all viewports
- [ ] Dark mode verified
- [ ] Build passes clean
- [ ] Deploy to Vercel

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Web Speech API not supported in all browsers | Medium | Full text/audio fallback for Safari, Firefox, Edge. Mic button shows "Not available" gracefully. |
| Gemini API rate limits or downtime | Low | Fallback roast messages hardcoded for common mispronunciations. API failure degrades to static roast. |
| Certificate PDF generation performance | Low | Generate on-demand, not pre-rendered. Use jsPDF which is lightweight. Offer image download as alternative. |
| Custom font loading performance | Medium | Use `font-display: swap` (already in Next.js font config). Preload critical fonts. |
| Pronunciation detection accuracy | High | Accept phonetically close attempts. Include multiple acceptable transcriptions. Consider "lenient mode" that accepts anything starting with "Prash" or "Prah". |
| Dark mode color contrast with amber accent | Medium | Test both themes with WCAG contrast checker. Amber on dark passes AA. Amber on cream needs dark text variant. |

## Open Questions (Resolved)

1. ~~Photo~~ — Found at `documents/photoooooooo.jpeg`, will move to `public/images/prashant-photo.jpg`
2. ~~Reward for correct pronunciation~~ — Certificate (PDF + image download) + counter + easter egg. Encourage sending certificate to Prashant for "something special."
3. ~~Birthday section~~ — Always shows "17 years old", celebration mode near May 27 with WhatsApp/IG links.
4. ~~Pronunciation matching~~ — Lenient matching via acceptable attempts list. Wrong attempts get Gemini roast (brutal, no mercy).
5. ~~Pronunciation~~ — It's /pruh-SHAANT/, NOT /pruh-SHUNTH/. "Shaant" like the Hindi word for peaceful.

---

## Task Summary

| Phase | Tasks | Est. Scope |
|-------|-------|-------------|
| Phase 0: Foundation Cleanup | 0.1, 0.2 | Small |
| Phase 1: Content & Data | 1.1, 1.2 | Medium |
| Phase 2: Visual Identity | 2.1, 2.2 | Medium |
| Phase 3: Name Experience | 3.1, 3.2, 3.3 | Large |
| Phase 4: Section Rebuilds | 4.1-4.6 | Large |
| Phase 5: SEO & A11y | 5.1-5.4 | Medium |
| Phase 6: Easter Egg & Counter | 6.1, 6.2 | Small |
| Phase 7: Final Polish | 7.1-7.3 | Small |

**Total: 20 tasks across 7 phases, 5 checkpoints**
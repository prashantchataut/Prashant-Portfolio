'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
    alternatives: Array<{ transcript: string; confidence: number }>;
    isListening: boolean;
    isSupported: boolean;
    startListening: () => void;
    stopListening: () => void;
    error: string | null;
    reset: () => void;
}

interface SpeechRecognitionResultItem {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
    if (typeof window === 'undefined') return null;
    return (window as unknown as Record<string, unknown>).SpeechRecognition as (new () => SpeechRecognitionInstance) | null
        || (window as unknown as Record<string, unknown>).webkitSpeechRecognition as (new () => SpeechRecognitionInstance) | null;
}

export function useSpeechRecognition(): SpeechRecognitionResult {
    const [transcript, setTranscript] = useState('');
    const [confidence, setConfidence] = useState(0);
    const [alternatives, setAlternatives] = useState<Array<{ transcript: string; confidence: number }>>([]);
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

    useEffect(() => {
        setIsSupported(!!getSpeechRecognition());
    }, []);

    const startListening = useCallback(() => {
        const SpeechRecognitionConstructor = getSpeechRecognition();
        if (!SpeechRecognitionConstructor) {
            setError('Speech recognition is not supported in this browser. Try Chrome or Edge, or type your attempt below.');
            return;
        }

        setError(null);
        setTranscript('');
        setConfidence(0);
        setAlternatives([]);

        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 10;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[0];
            const mainTranscript = (result as unknown as { [key: number]: SpeechRecognitionResultItem })[0].transcript.toLowerCase().trim();
            const mainConfidence = (result as unknown as { [key: number]: SpeechRecognitionResultItem })[0].confidence;

            const alts: Array<{ transcript: string; confidence: number }> = [];
            const length = (result as unknown as { length: number }).length ?? 1;
            for (let i = 1; i < length; i++) {
                const alt = (result as unknown as { [key: number]: SpeechRecognitionResultItem })[i];
                if (alt) {
                    alts.push({
                        transcript: alt.transcript.toLowerCase().trim(),
                        confidence: alt.confidence,
                    });
                }
            }

            setTranscript(mainTranscript);
            setConfidence(mainConfidence);
            setAlternatives(alts);
            setIsListening(false);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === 'aborted' || event.error === 'no-speech') {
                setIsListening(false);
                return;
            }

            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone access and try again.');
            } else {
                setError(`Speech recognition error: ${event.error}`);
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    const reset = useCallback(() => {
        setTranscript('');
        setConfidence(0);
        setAlternatives([]);
        setError(null);
    }, []);

    return { transcript, confidence, alternatives, isListening, isSupported, startListening, stopListening, error, reset };
}
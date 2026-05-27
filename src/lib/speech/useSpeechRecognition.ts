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
    reset: () => void;
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
    onstart: () => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
    if (typeof window === 'undefined') return null;
    return (window as unknown as Record<string, unknown>).SpeechRecognition as (new () => SpeechRecognitionInstance) | null
        || (window as unknown as Record<string, unknown>).webkitSpeechRecognition as (new () => SpeechRecognitionInstance) | null;
}

export function useSpeechRecognition(): SpeechRecognitionResult {
    const [transcript, setTranscript] = useState('');
    const [confidence, setConfidence] = useState(0);
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
            setError('Speech recognition is not supported in this browser. Try Chrome or Edge.');
            return;
        }

        setError(null);
        setTranscript('');
        setConfidence(0);

        const recognition = new SpeechRecognitionConstructor();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[0];
            const transcriptText = (result as unknown as { [key: number]: { transcript: string; confidence: number } })[0].transcript.toLowerCase().trim();
            const conf = (result as unknown as { [key: number]: { transcript: string; confidence: number } })[0].confidence;
            setTranscript(transcriptText);
            setConfidence(conf);
            setIsListening(false);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone access and try again.');
            } else if (event.error === 'no-speech') {
                setError('No speech detected. Try again and speak clearly.');
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
        recognitionRef.current?.stop();
        setIsListening(false);
    }, []);

    const reset = useCallback(() => {
        setTranscript('');
        setConfidence(0);
        setError(null);
    }, []);

    return { transcript, confidence, isListening, isSupported, startListening, stopListening, error, reset };
}
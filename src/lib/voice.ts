/**
 * Mobile-safe Vedic Voice & Speech Synthesis Helper
 * Handles iOS Safari and Android Chrome speech synthesis quirks:
 * 1. Asynchronous voice loading
 * 2. iOS Safari cancel-before-speak bug
 * 3. Android Chrome mid-speech garbage collection
 * 4. Paused state resumption
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;
let speechTimeout: NodeJS.Timeout | null = null;

export interface VoiceOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err?: any) => void;
}

export function isVoiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopVedicVoice(): void {
  if (!isVoiceSupported()) return;

  if (speechTimeout) {
    clearTimeout(speechTimeout);
    speechTimeout = null;
  }

  try {
    window.speechSynthesis.cancel();
  } catch {}

  activeUtterance = null;
  if (typeof window !== 'undefined') {
    (window as any).__activeVedicUtterance = null;
  }
}

export function speakVedicVoice(text: string, options: VoiceOptions = {}): boolean {
  if (!isVoiceSupported()) {
    options.onError?.('SpeechSynthesis not supported');
    return false;
  }

  const synth = window.speechSynthesis;

  // Clear previous timers & cancel active speech
  if (speechTimeout) {
    clearTimeout(speechTimeout);
    speechTimeout = null;
  }
  try {
    synth.cancel();
  } catch {}

  // Clean text for natural spiritual pronunciation
  const cleanText = text
    .replace(/[॥।]/g, ', ')
    .replace(/[*_#~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return false;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = options.lang || 'hi-IN';
  utterance.rate = options.rate ?? 0.88;
  utterance.pitch = options.pitch ?? 1.0;

  // Retain global reference to avoid Android garbage collection bug
  activeUtterance = utterance;
  if (typeof window !== 'undefined') {
    (window as any).__activeVedicUtterance = utterance;
  }

  // Find best available Hindi / Indian voice
  const voices = synth.getVoices();
  const hindiVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('hi-in') ||
      v.lang.toLowerCase().startsWith('hi') ||
      v.name.toLowerCase().includes('hindi')
  );
  if (hindiVoice) {
    utterance.voice = hindiVoice;
  }

  utterance.onstart = () => {
    options.onStart?.();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (typeof window !== 'undefined') {
      (window as any).__activeVedicUtterance = null;
    }
    options.onEnd?.();
  };

  utterance.onerror = (err) => {
    activeUtterance = null;
    if (typeof window !== 'undefined') {
      (window as any).__activeVedicUtterance = null;
    }
    options.onError?.(err);
  };

  // Small delay (40ms) allows iOS Safari WebKit to process cancel() before speak()
  speechTimeout = setTimeout(() => {
    try {
      if (synth.paused) {
        synth.resume();
      }
      synth.speak(utterance);
    } catch (err) {
      console.warn('Mobile voice recitation error:', err);
      options.onError?.(err);
    }
  }, 40);

  return true;
}

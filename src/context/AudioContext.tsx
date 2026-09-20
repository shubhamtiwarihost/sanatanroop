'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface AudioTrack {
  id: string;
  title: string;
  audioUrl?: string;
  subtitle?: string;
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  currentTrack: AudioTrack | null;
  toggleAudio: () => void;
  playAudio: (track?: AudioTrack) => Promise<void>;
  pauseAudio: () => void;
}

const MantraAudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Default authentic mantra audio
    const audio = new Audio('/audio/om_namah_shivaya.wav');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const savedMute = localStorage.getItem('sanatan_audio_muted');
    if (savedMute === 'true') {
      setIsMuted(true);
      audio.muted = true;
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const playAudio = async (track?: AudioTrack) => {
    if (!audioRef.current) return;
    try {
      if (track && track.audioUrl) {
        if (currentTrack?.id === track.id && isPlaying) {
          pauseAudio();
          return;
        }
        audioRef.current.src = track.audioUrl;
        setCurrentTrack(track);
      } else if (!currentTrack) {
        setCurrentTrack({
          id: 'default-om',
          title: 'Om Namah Shivaya',
          subtitle: 'Sacred Vedic Chanting',
        });
      }

      setIsMuted(false);
      audioRef.current.muted = false;
      localStorage.setItem('sanatan_audio_muted', 'false');
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Browser prevented direct playback until user gesture:', err);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <MantraAudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        currentTrack,
        toggleAudio,
        playAudio,
        pauseAudio,
      }}
    >
      {children}
    </MantraAudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(MantraAudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

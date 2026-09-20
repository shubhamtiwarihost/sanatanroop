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

  const getAudio = () => {
    if (!audioRef.current && typeof window !== 'undefined') {
      const audio = new Audio('/audio/om_namah_shivaya.wav');
      audio.preload = 'none';
      audio.loop = true;
      audio.volume = 0.45;
      const savedMute = localStorage.getItem('sanatan_audio_muted');
      if (savedMute === 'true') {
        audio.muted = true;
      }
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  useEffect(() => {
    const savedMute = localStorage.getItem('sanatan_audio_muted');
    if (savedMute === 'true') {
      setIsMuted(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = async (track?: AudioTrack) => {
    const audio = getAudio();
    if (!audio) return;
    try {
      if (track && track.audioUrl) {
        if (currentTrack?.id === track.id && isPlaying) {
          pauseAudio();
          return;
        }
        audio.src = track.audioUrl;
        setCurrentTrack(track);
      } else if (!currentTrack) {
        setCurrentTrack({
          id: 'default-om',
          title: 'Om Namah Shivaya',
          subtitle: 'Sacred Vedic Chanting',
        });
      }

      setIsMuted(false);
      audio.muted = false;
      localStorage.setItem('sanatan_audio_muted', 'false');
      await audio.play();
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

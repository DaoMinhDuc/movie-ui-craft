import { useState, useCallback, useRef, useEffect } from 'react';
import { VideoPlayerRef } from '@/types/video';

export interface UseVideoPlayerReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  isLoading: boolean;
  error: string | null;
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleFullscreen: () => Promise<void>;
  clearError: () => void;
}

export const useVideoPlayer = (videoRef: React.RefObject<VideoPlayerRef>): UseVideoPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback(async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setError(null);
      }
    } catch (err) {
      setError('Không thể phát video');
      console.error('Play error:', err);
    }
  }, [videoRef]);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoRef]);

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.setCurrentTime(time);
      setCurrentTime(time);
    }
  }, [videoRef]);

  const setVolume = useCallback((newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.setVolume(newVolume);
      setVolumeState(newVolume);
    }
  }, [videoRef]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (videoRef.current) {
        if (!isFullscreen) {
          await videoRef.current.requestFullscreen();
          setIsFullscreen(true);
        } else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
            setIsFullscreen(false);
          }
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, [videoRef, isFullscreen]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Listen for fullscreen changes
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  // Update current time and duration periodically
  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.getCurrentTime());
      setDuration(videoRef.current.getDuration());
      setVolumeState(videoRef.current.getVolume());
    }
  }, [videoRef]);

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    const interval = setInterval(updateProgress, 1000);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      clearInterval(interval);
    };
  }, [handleFullscreenChange, updateProgress]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isFullscreen,
    isLoading,
    error,
    play,
    pause,
    seek,
    setVolume,
    toggleFullscreen,
    clearError,
  };
};

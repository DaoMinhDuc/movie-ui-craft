import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  className?: string;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleFullscreen: () => void;
  onSkipBackward?: () => void;
  onSkipForward?: () => void;
}

const formatTime = (time: number): string => {
  if (isNaN(time)) return '00:00';
  
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isFullscreen,
  className,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onToggleFullscreen,
  onSkipBackward,
  onSkipForward,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressChange = (value: number[]) => {
    const time = (value[0] / 100) * duration;
    onSeek(time);
  };

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0] / 100);
  };

  return (
    <div className={cn(
      'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4',
      'transform transition-transform duration-200',
      className
    )}>
      {/* Progress bar */}
      <div className="mb-4">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleProgressChange}
          className="w-full"
        />
        <div className="flex justify-between text-white text-xs mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Play/Pause */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              if (isPlaying) {
                onPause();
              } else {
                onPlay();
              }
            }}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>

          {/* Skip backward button - always visible */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              if (onSkipBackward) onSkipBackward();
            }}
            className="text-white hover:bg-white/20"
            title="Lùi 10 giây"
            disabled={!onSkipBackward}
          >
            <Rewind className="h-5 w-5" />
          </Button>

          {/* Skip forward button - always visible */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              if (onSkipForward) onSkipForward();
            }}
            className="text-white hover:bg-white/20"
            title="Tua 10 giây"
            disabled={!onSkipForward}
          >
            <FastForward className="h-5 w-5" />
          </Button>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                onVolumeChange(volume > 0 ? 0 : 1);
              }}
              className="text-white hover:bg-white/20"
            >
              {volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <div className="w-20">
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Fullscreen */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onToggleFullscreen();
          }}
          className="text-white hover:bg-white/20"
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayerControls;

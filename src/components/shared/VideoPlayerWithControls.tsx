import React, { useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPlayerControls from './VideoPlayerControls';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoPlayerProps, VideoPlayerRef } from '@/types/video';
import { cn } from '@/lib/utils';

interface VideoPlayerWithControlsProps extends Omit<VideoPlayerProps, 'controls'> {
  showCustomControls?: boolean;
  onSkipBackward?: () => void;
  onSkipForward?: () => void;
}

const VideoPlayerWithControls: React.FC<VideoPlayerWithControlsProps> = ({
  src,
  poster,
  autoPlay = false,
  width = '100%',
  height = 'auto',
  className,
  showCustomControls = true,
  onError,
  onLoadStart,
  onLoadedData,
  onPlay,
  onPause,
  onEnded,
  onSkipBackward,
  onSkipForward,
}) => {
  const videoRef = useRef<VideoPlayerRef>(null);
  const [showControls, setShowControls] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isFullscreen,
    error,
    play,
    pause,
    seek,
    setVolume,
    toggleFullscreen,
  } = useVideoPlayer(videoRef);

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    setControlsTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handlePlay = async () => {
    await play();
    onPlay?.();
  };

  const handlePause = () => {
    pause();
    onPause?.();
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    seek(newTime);
    onSkipBackward?.();
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    seek(newTime);
    onSkipForward?.();
  };

  React.useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  return (
    <div 
      className={cn('relative group', className)}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayer
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controls={!showCustomControls}
        width="100%"
        height="100%"
        onError={onError}
        onLoadStart={onLoadStart}
        onLoadedData={onLoadedData}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />

      {showCustomControls && (
        <VideoPlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isFullscreen={isFullscreen}
          onPlay={handlePlay}
          onPause={handlePause}
          onSeek={seek}
          onVolumeChange={setVolume}
          onToggleFullscreen={toggleFullscreen}
          onSkipBackward={handleSkipBackward}
          onSkipForward={handleSkipForward}
          className={cn(
            'transition-opacity duration-200',
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="text-center text-white p-4">
            <p className="text-red-400 mb-2">⚠️ Lỗi phát video</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerWithControls;

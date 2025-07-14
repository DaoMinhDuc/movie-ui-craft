import React, { useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoPlayerControls from './VideoPlayerControls';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoPlayerProps, VideoPlayerRef } from '@/types/video';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Rewind, FastForward } from 'lucide-react';

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
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const [showSkipBackwardAnimation, setShowSkipBackwardAnimation] = useState(false);
  const [showSkipForwardAnimation, setShowSkipForwardAnimation] = useState(false);

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
    
    // Hiện hoạt ảnh phản hồi trên di động
    if (isMobile) {
      setShowSkipBackwardAnimation(true);
      setTimeout(() => setShowSkipBackwardAnimation(false), 800);
    }
  };

  const handleSkipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    seek(newTime);
    
    // Hiện hoạt ảnh phản hồi trên di động
    if (isMobile) {
      setShowSkipForwardAnimation(true);
      setTimeout(() => setShowSkipForwardAnimation(false), 800);
    }
  };

  React.useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  // Xử lý nhấp vào màn hình để tua nhanh/lùi trên thiết bị di động
  const handleScreenTap = (event: React.MouseEvent<HTMLDivElement>) => {
    // Ngăn chặn hành vi mặc định của sự kiện click
    event.preventDefault();
    
    if (!isMobile || !playerContainerRef.current) return;
    
    const containerWidth = playerContainerRef.current.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const clickPosition = clickX / containerWidth;
    
    // Nhấp vào 30% bên trái màn hình
    if (clickPosition < 0.3) {
      handleSkipBackward();
    } 
    // Nhấp vào 30% bên phải màn hình
    else if (clickPosition > 0.7) {
      handleSkipForward();
    }
    // Nhấp vào giữa màn hình (40% ở giữa) - chuyển đổi phát/tạm dừng
    else {
      if (isPlaying) {
        handlePause();
      } else {
        handlePlay();
      }
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className={cn('relative group', className)}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleScreenTap}
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

      {isMobile && (
        <>
          <div 
            className={cn(
              'absolute left-10 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-4 transition-opacity duration-300',
              showSkipBackwardAnimation ? 'opacity-70' : 'opacity-0 pointer-events-none'
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <Rewind className="h-8 w-8 text-white" />
              <span className="text-white text-sm font-bold mt-1">-10s</span>
            </div>
          </div>
          
          {/* Skip forward animation */}
          <div 
            className={cn(
              'absolute right-10 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-4 transition-opacity duration-300',
              showSkipForwardAnimation ? 'opacity-70' : 'opacity-0 pointer-events-none'
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <FastForward className="h-8 w-8 text-white" />
              <span className="text-white text-sm font-bold mt-1">+10s</span>
            </div>
          </div>
        </>
      )}

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

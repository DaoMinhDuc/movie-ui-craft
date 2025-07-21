import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { VideoPlayerProps, VideoPlayerRef } from '@/types/video';
import { cn } from '@/lib/utils';

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({ 
  src,
  poster,
  autoPlay = false,
  controls = true,
  width = '100%',
  height = 'auto',
  className,
  onError,
  onLoadStart,
  onLoadedData,
  onPlay,
  onPause,
  onEnded,
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<typeof videojs.players | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Expose video methods through ref
  useImperativeHandle(ref, () => ({
    play: async () => {
      if (playerRef.current) {
        try {
          playerRef.current.play();
        } catch (err) {
          console.error('Error playing video:', err);
          throw err;
        }
      }
    },
    pause: () => {
      playerRef.current?.pause();
    },
    getCurrentTime: () => {
      return playerRef.current?.currentTime() || 0;
    },
    getDuration: () => {
      return playerRef.current?.duration() || 0;
    },
    setCurrentTime: (time: number) => {
      playerRef.current?.currentTime(time);
    },
    getVolume: () => {
      return playerRef.current?.volume() || 0;
    },
    setVolume: (volume: number) => {
      if (playerRef.current) {
        playerRef.current.volume(Math.max(0, Math.min(1, volume)));
      }
    },
    requestFullscreen: async () => {
      if (playerRef.current) {
        try {
          playerRef.current.requestFullscreen();
        } catch (err) {
          console.error('Error entering fullscreen:', err);
          throw err;
        }
      }
    },
  }));

  useEffect(() => {
    if (!src || !videoRef.current) return;

    setIsLoading(true);
    setError(null);

    // Clean up previous player
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Khởi tạo Video.js
    const player = videojs(videoRef.current, {
      sources: [
        {
          src,
          type: 'application/x-mpegURL',
        },
      ],
      poster,
      controls,
      autoplay: autoPlay,
      preload: 'metadata',
      fluid: false,
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
    });
    playerRef.current = player;

    // Sự kiện loading
    player.on('loadstart', () => {
      setIsLoading(true);
      onLoadStart?.();
    });
    player.on('loadeddata', () => {
      setIsLoading(false);
      onLoadedData?.();
    });
    player.on('error', () => {
      const vjsError = player.error();
      const errorMessage = vjsError?.message || 'Không thể phát video. Vui lòng thử lại sau.';
      setError(errorMessage);
      if (onError) {
        onError(new Error(errorMessage));
      }
    });
    player.on('play', () => {
      onPlay?.();
    });
    player.on('pause', () => {
      onPause?.();
    });
    player.on('ended', () => {
      onEnded?.();
    });

    player.ready(() => {
      if (player.readyState() >= 2) {
        setIsLoading(false);
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, autoPlay, controls, poster, width, height, onError, onLoadStart, onLoadedData, onPlay, onPause, onEnded]);

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-sm">Đang tải video...</span>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center text-white p-4">
            <p className="text-red-400 mb-2">⚠️ Lỗi phát video</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Video.js element */}
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
        poster={poster}
        playsInline
        style={{ width, height }}
      >
        Trình duyệt của bạn không hỗ trợ video HTML5.
      </video>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;

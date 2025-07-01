import React, { useRef } from 'react';
import VideoPlayerWithControls from '@/components/shared/VideoPlayerWithControls';
import VideoPlayer from '@/components/shared/VideoPlayer';
import { VideoPlayerRef } from '@/types/video';
import { Button } from '@/components/ui/button';

const VideoDemo = () => {
  const videoRef = useRef<VideoPlayerRef>(null);
  
  // Demo HLS streams
  const demoStreams = [
    {
      name: "Big Buck Bunny (HLS)",
      url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
    },
    {
      name: "Sintel (HLS)", 
      url: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
    }
  ];

  const [currentStream, setCurrentStream] = React.useState(demoStreams[0]);
  const [showCustomControls, setShowCustomControls] = React.useState(true);

  const handlePlay = async () => {
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error('Play error:', error);
    }
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleSeek = (time: number) => {
    videoRef.current?.setCurrentTime(time);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">HLS Video Player Demo</h1>
        
        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={showCustomControls ? "default" : "outline"}
              onClick={() => setShowCustomControls(true)}
            >
              Custom Controls
            </Button>
            <Button
              variant={!showCustomControls ? "default" : "outline"}
              onClick={() => setShowCustomControls(false)}
            >
              Browser Controls
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {demoStreams.map((stream, index) => (
              <Button
                key={index}
                variant={currentStream.url === stream.url ? "default" : "outline"}
                onClick={() => setCurrentStream(stream)}
                className="text-sm"
              >
                {stream.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
            {showCustomControls ? (
              <VideoPlayerWithControls
                src={currentStream.url}
                poster={currentStream.poster}
                autoPlay={false}
                width="100%"
                height="auto"
                className="w-full"
                showCustomControls={true}
                onError={(error) => {
                  console.error('Video error:', error);
                  alert(`Video Error: ${error.message}`);
                }}
                onLoadStart={() => console.log('Load started')}
                onLoadedData={() => console.log('Data loaded')}
                onPlay={() => console.log('Video played')}
                onPause={() => console.log('Video paused')}
                onEnded={() => console.log('Video ended')}
                onSkipBackward={() => console.log('Skip backward')}
                onSkipForward={() => console.log('Skip forward')}
              />
            ) : (
              <VideoPlayer
                ref={videoRef}
                src={currentStream.url}
                poster={currentStream.poster}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
                className="w-full aspect-video"
                onError={(error) => {
                  console.error('Video error:', error);
                  alert(`Video Error: ${error.message}`);
                }}
                onLoadStart={() => console.log('Load started')}
                onLoadedData={() => console.log('Data loaded')}
                onPlay={() => console.log('Video played')}
                onPause={() => console.log('Video paused')}
                onEnded={() => console.log('Video ended')}
              />
            )}
          </div>
          
          {/* Video Info */}
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{currentStream.name}</h3>
            <p className="text-gray-300 text-sm mb-2">URL: {currentStream.url}</p>
            
            {!showCustomControls && (
              <div className="flex gap-2 mt-4">
                <Button onClick={handlePlay} size="sm">Play</Button>
                <Button onClick={handlePause} size="sm" variant="outline">Pause</Button>
                <Button onClick={() => handleSeek(30)} size="sm" variant="outline">Seek to 30s</Button>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-900/50 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Custom Controls:</strong> Sử dụng controls tùy chỉnh với giao diện đẹp</p>
              <p><strong>Browser Controls:</strong> Sử dụng controls mặc định của trình duyệt</p>
              <p><strong>HLS Support:</strong> Tự động detect và sử dụng HLS.js hoặc native HLS</p>
              <p><strong>Features:</strong> Play/Pause, Seek, Volume, Fullscreen, Skip forward/backward</p>
              <p><strong>Error Handling:</strong> Xử lý lỗi và hiển thị thông báo thân thiện</p>
              <p><strong>Responsive:</strong> Tự động thích ứng với kích thước màn hình</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDemo;

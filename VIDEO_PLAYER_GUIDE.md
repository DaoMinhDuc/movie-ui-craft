# HLS Video Player for React + TypeScript

Hướng dẫn chi tiết cách tích hợp và sử dụng HLS Video Player trong dự án React với TypeScript.

## 📋 Tính năng

✅ **Phát video HLS (.m3u8)** - Hỗ trợ đầy đủ HLS streaming  
✅ **TypeScript Support** - Type safety hoàn chỉnh  
✅ **Custom Controls** - Giao diện controls tùy chỉnh đẹp mắt  
✅ **Browser Compatibility** - Tự động fallback cho Safari và Chrome  
✅ **Error Handling** - Xử lý lỗi thông minh và user-friendly  
✅ **Responsive Design** - Tự động thích ứng màn hình  
✅ **Fullscreen Support** - Hỗ trợ toàn màn hình  
✅ **Volume Control** - Điều khiển âm lượng  
✅ **Progress Bar** - Thanh tiến trình với seek  
✅ **Loading States** - Hiển thị trạng thái loading  

## 🚀 Cài đặt

```bash
npm install hls.js
# hoặc
yarn add hls.js
```

## 📁 Cấu trúc files

```
src/
├── components/shared/
│   ├── VideoPlayer.tsx              # Component video player cơ bản
│   ├── VideoPlayerControls.tsx      # Custom controls
│   └── VideoPlayerWithControls.tsx  # Player + Controls kết hợp
├── hooks/
│   └── useVideoPlayer.ts           # Hook quản lý state
└── types/
    └── video.ts                    # TypeScript interfaces
```

## 🔧 Sử dụng cơ bản

### 1. VideoPlayer (Basic)

```tsx
import VideoPlayer from '@/components/shared/VideoPlayer';
import { VideoPlayerRef } from '@/types/video';

const MyComponent = () => {
  const videoRef = useRef<VideoPlayerRef>(null);

  return (
    <VideoPlayer
      ref={videoRef}
      src="https://example.com/video.m3u8"
      poster="https://example.com/poster.jpg"
      autoPlay={false}
      controls={true}
      width="100%"
      height="auto"
      onError={(error) => console.error(error)}
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
    />
  );
};
```

### 2. VideoPlayerWithControls (Advanced)

```tsx
import VideoPlayerWithControls from '@/components/shared/VideoPlayerWithControls';

const MyComponent = () => {
  return (
    <VideoPlayerWithControls
      src="https://example.com/video.m3u8"
      poster="https://example.com/poster.jpg"
      autoPlay={false}
      showCustomControls={true}
      className="aspect-video"
      onError={(error) => console.error(error)}
      onSkipBackward={() => console.log('Skip -10s')}
      onSkipForward={() => console.log('Skip +10s')}
    />
  );
};
```

## 🎮 Sử dụng với useVideoPlayer Hook

```tsx
import { useRef } from 'react';
import VideoPlayer from '@/components/shared/VideoPlayer';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoPlayerRef } from '@/types/video';

const MyComponent = () => {
  const videoRef = useRef<VideoPlayerRef>(null);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    seek,
    setVolume,
  } = useVideoPlayer(videoRef);

  return (
    <div>
      <VideoPlayer ref={videoRef} src="video.m3u8" />
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={() => seek(30)}>Seek to 30s</button>
        <span>{currentTime} / {duration}</span>
      </div>
    </div>
  );
};
```

## 📊 Props Interface

### VideoPlayerProps

```typescript
interface VideoPlayerProps {
  src: string;                    // URL video .m3u8
  poster?: string;               // URL poster image
  autoPlay?: boolean;            // Tự động phát (default: false)
  controls?: boolean;            // Hiển thị controls (default: true)
  width?: string | number;       // Chiều rộng
  height?: string | number;      // Chiều cao
  className?: string;            // CSS class
  onError?: (error: Error) => void;
  onLoadStart?: () => void;
  onLoadedData?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}
```

### VideoPlayerRef Methods

```typescript
interface VideoPlayerRef {
  play: () => Promise<void>;
  pause: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  setCurrentTime: (time: number) => void;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  requestFullscreen: () => Promise<void>;
}
```

## 🔧 Cấu hình HLS.js

VideoPlayer đã được cấu hình tối ưu cho HLS.js:

```typescript
const hlsConfig = {
  enableWorker: true,
  lowLatencyMode: false,
  backBufferLength: 90,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferSize: 60 * 1000 * 1000,
  // ... thêm nhiều options khác
};
```

## 🎨 Tùy chỉnh CSS

```css
/* Custom video player styles */
.video-player-container {
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-player-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 16px;
}
```

## 🐛 Xử lý lỗi phổ biến

### 1. CORS Error
```tsx
onError={(error) => {
  if (error.message.includes('CORS')) {
    console.log('Sử dụng proxy server hoặc link_m3u8 thay vì link_embed');
  }
}}
```

### 2. HLS Not Supported
```tsx
// VideoPlayer tự động fallback và hiển thị thông báo
```

### 3. Network Error
```tsx
// HLS.js tự động retry và recover
```

## 📱 Responsive Design

```tsx
<VideoPlayerWithControls
  src="video.m3u8"
  className="w-full aspect-video max-w-4xl mx-auto"
  width="100%"
  height="auto"
/>
```

## 🎬 Tích hợp với Movie App

### Trong WatchMovie component:

```tsx
const WatchMovie = () => {
  const currentEpisode = getCurrentEpisode();
  
  return (
    <VideoPlayerWithControls
      src={currentEpisode?.link_m3u8}
      poster={movie.poster_url}
      autoPlay={false}
      showCustomControls={true}
      onSkipForward={() => navigateToNextEpisode()}
      onSkipBackward={() => navigateToPrevEpisode()}
    />
  );
};
```

## 🔍 Debug và Testing

1. **Console Logs**: VideoPlayer log chi tiết các events
2. **Network Tab**: Kiểm tra HLS segments loading
3. **Error Overlay**: Hiển thị lỗi trực quan trên video

## ⚡ Performance Tips

1. **Preload**: Sử dụng `preload="metadata"`
2. **Lazy Loading**: Chỉ load video khi cần thiết
3. **Buffer Management**: HLS.js tự động quản lý buffer
4. **Quality Selection**: Tự động chọn quality phù hợp

## 🌍 Browser Support

- ✅ **Chrome/Edge**: HLS.js
- ✅ **Firefox**: HLS.js  
- ✅ **Safari**: Native HLS
- ✅ **Mobile Safari**: Native HLS
- ✅ **Android Chrome**: HLS.js

## 📄 License

MIT License - Sử dụng tự do cho dự án cá nhân và thương mại.

---

**🎉 Chúc bạn build được video player tuyệt vời!**

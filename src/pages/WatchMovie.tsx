
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize, Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import LazyImage from '@/components/shared/LazyImage';
import { useMovieDetail } from '@/hooks/useMovies';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const WatchMovie = () => {
  const { id, episode } = useParams();
  const { data: movieData, loading, error } = useMovieDetail(id || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2700); // 45 minutes in seconds
  const [selectedServer, setSelectedServer] = useState(0);

  // Lấy movie và episodes từ response
  const movie = movieData?.movie;
  const episodes = movieData?.episodes || [];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-movie-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-movie-accent mx-auto mb-4"></div>
              <div className="text-movie-muted">Đang tải thông tin phim...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-movie-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              {error ? 'Lỗi tải thông tin phim' : 'Không tìm thấy thông tin phim'}
            </div>
            {error && <div className="text-movie-muted mb-4">{error.message}</div>}
            <Link to="/" className="inline-block">
              <Button className="bg-movie-accent hover:bg-movie-accent/90">
                Quay lại trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tìm tập hiện tại
  const currentServer = episodes[selectedServer];
  const currentEpisodeData = currentServer?.server_data?.find(ep => ep.slug === episode);
  const currentEpisodeIndex = currentServer?.server_data?.findIndex(ep => ep.slug === episode) ?? 0;
  const totalEpisodes = currentServer?.server_data?.length || 0;

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Back to Movie Detail */}
      <div className="container mx-auto px-4 py-4">
        <Link to={`/movie/${movie.slug}`} className="inline-flex items-center text-movie-muted hover:text-movie-accent transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại thông tin phim
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            {/* Movie Title */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-movie-text mb-1">
                {movie.name} - {currentEpisodeData?.name || `Tập ${currentEpisodeIndex + 1}`}
              </h1>
              <p className="text-movie-muted">{movie.origin_name}</p>
            </div>

            {/* Video Container */}
            <div className="relative bg-black rounded-xl overflow-hidden group">
              {currentEpisodeData?.link_embed ? (
                <iframe
                  src={currentEpisodeData.link_embed}
                  className="w-full aspect-video"
                  allowFullScreen
                  title={`${movie.name} - ${currentEpisodeData.name}`}
                  loading="lazy"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-movie-accent rounded-full flex items-center justify-center mb-4 mx-auto">
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <p className="text-white text-lg">Video Player</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {currentEpisodeData?.name || `Tập ${currentEpisodeIndex + 1}`} - {movie.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Chất lượng: {movie.quality} | {movie.lang}
                    </p>
                  </div>
                </div>
              )}

              {/* Video Controls */}
              {!currentEpisodeData?.link_embed && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-600 rounded-full h-1 mb-4 cursor-pointer">
                    <div 
                      className="bg-movie-accent h-1 rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:text-movie-accent"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                        <Settings className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Episode Navigation */}
            <div className="flex items-center justify-between mt-6">
              {currentEpisodeIndex > 0 && currentServer?.server_data ? (
                <Link to={`/watch/${movie.slug}/${currentServer.server_data[currentEpisodeIndex - 1]?.slug}`}>
                  <Button variant="outline" className="border-movie-accent text-movie-accent hover:bg-movie-accent/10">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Tập trước
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}

              <div className="text-center">
                <p className="text-movie-text font-semibold">
                  Tập {currentEpisodeIndex + 1} / {totalEpisodes}
                </p>
              </div>

              {currentEpisodeIndex < totalEpisodes - 1 && currentServer?.server_data ? (
                <Link to={`/watch/${movie.slug}/${currentServer.server_data[currentEpisodeIndex + 1]?.slug}`}>
                  <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white">
                    Tập tiếp theo
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Selection */}
            {episodes.length > 0 && (
              <div className="bg-movie-card rounded-xl p-4">
                <h3 className="text-movie-text font-semibold mb-3">Chọn server</h3>
                <div className="space-y-2">
                  {episodes.map((server, index) => (
                    <Button
                      key={index}
                      variant={index === selectedServer ? "default" : "outline"}
                      className={`w-full ${
                        index === selectedServer
                          ? "bg-movie-accent hover:bg-movie-accent/90 text-white" 
                          : "border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                      }`}
                      onClick={() => setSelectedServer(index)}
                    >
                      {server.server_name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quality & Language Info */}
            <div className="bg-movie-card rounded-xl p-4">
              <h3 className="text-movie-text font-semibold mb-3">Thông tin</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-movie-muted">Chất lượng:</span>
                  <Badge className="bg-movie-accent text-white">{movie.quality}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-movie-muted">Ngôn ngữ:</span>
                  <Badge className="bg-green-500 text-white">{movie.lang}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-movie-muted">Thời lượng:</span>
                  <span className="text-movie-text">{movie.time}</span>
                </div>
              </div>
            </div>

            {/* Episodes List - Giao diện ô vuông mới */}
            {episodes.length > 0 && episodes[selectedServer]?.server_data && (
              <EpisodesList 
                episodes={episodes[selectedServer].server_data}
                movieSlug={movie.slug}
                currentEpisode={episode}
              />
            )}
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

// Component riêng cho danh sách tập phim với giao diện ô vuông
const EpisodesList: React.FC<{
  episodes: Array<{ name: string; slug: string; }>;
  movieSlug: string;
  currentEpisode?: string;
}> = ({ episodes, movieSlug, currentEpisode }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div ref={ref} className="bg-movie-card rounded-xl p-4">
      <h3 className="text-movie-text font-semibold mb-3">Danh sách tập</h3>
      {hasIntersected ? (
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {episodes.map((ep, index) => (
              <Link
                key={index}
                to={`/watch/${movieSlug}/${ep.slug}`}
                className={`group relative aspect-square rounded-lg transition-all duration-200 ${
                  ep.slug === currentEpisode
                    ? 'bg-movie-accent scale-105 shadow-lg'
                    : 'bg-movie-bg hover:bg-movie-accent/20 hover:scale-105'
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <div className={`text-center ${
                    ep.slug === currentEpisode ? 'text-white' : 'text-blue-400'
                  }`}>
                    <div className="font-bold text-sm mb-1">
                      {index + 1}
                    </div>
                    <div className="text-xs leading-tight">
                      {ep.name.replace(/Tập\s*\d+/i, '').trim() || `Tập ${index + 1}`}
                    </div>
                  </div>
                  {ep.slug === currentEpisode && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchMovie;

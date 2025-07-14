import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize, Minimize, Square, MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import VideoPlayerWithControls from '@/components/shared/VideoPlayerWithControls';
import { useMovieDetailQuery } from '@/hooks/queries/useMovies';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const WatchMovie = () => {
  const { id, episode } = useParams();
  const { data: movieData, isLoading, error } = useMovieDetailQuery(id || '');
  const [selectedServer, setSelectedServer] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);

  // Lấy movie và episodes từ response
  const movie = movieData?.movie;
  const episodes = movieData?.episodes || [];

  if (isLoading) {
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
      <div className={`${theaterMode ? 'max-w-none px-0' : 'container px-4'} mx-auto py-4`}>
        <div className={`${theaterMode ? 'px-4' : ''}`}>
          <Link to={`/movie/${movie.slug}`} className="inline-flex items-center text-movie-muted hover:text-movie-accent transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại thông tin phim
          </Link>
        </div>
      </div>

      {/* Video Player Section - Full Width in Theater Mode */}
      <div className={`${theaterMode ? 'bg-black py-4' : ''}`}>
        <div className={`${theaterMode ? 'max-w-7xl mx-auto px-4' : 'container mx-auto px-4'}`}>
          {/* Movie Title & Theater Mode Controls */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-movie-text mb-1">
                  {movie.name} - {currentEpisodeData?.name || `Tập ${currentEpisodeIndex + 1}`}
                </h1>
                <p className="text-movie-muted">{movie.origin_name}</p>
              </div>
              
              {/* Các nút chuyển tập và theater mode */}
              <div className="flex items-center gap-2">
                {currentEpisodeIndex > 0 && currentServer?.server_data && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                    onClick={() => {
                      window.location.href = `/watch/${movie.slug}/${currentServer.server_data[currentEpisodeIndex - 1]?.slug}`;
                    }}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Tập trước
                  </Button>
                )}
                
                {currentEpisodeIndex < totalEpisodes - 1 && currentServer?.server_data && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                    onClick={() => {
                      window.location.href = `/watch/${movie.slug}/${currentServer.server_data[currentEpisodeIndex + 1]?.slug}`;
                    }}
                  >
                    Tập tiếp <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setTheaterMode(!theaterMode)}
                  className="text-movie-text hover:text-movie-accent"
                  title={theaterMode ? "Chế độ thường" : "Chế độ rạp chiếu phim"}
                >
                  {theaterMode ? <MonitorSmartphone className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative bg-black rounded-xl overflow-hidden">
            {currentEpisodeData?.link_m3u8 ? (
              <VideoPlayerWithControls
                src={currentEpisodeData.link_m3u8}
                poster={movie.thumb_url}
                autoPlay={false}
                width="100%"
                height="auto"
                className="aspect-video"
                showCustomControls={true}
                onError={(error) => {
                  console.error(error);
                }}
                // Bỏ xử lý chuyển tập tại đây để tránh xung đột với chức năng tua nhanh/lùi
              />
            ) : currentEpisodeData?.link_embed ? (
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
                    <span className="text-white text-2xl">📺</span>
                  </div>
                  <p className="text-white text-lg">Không có nguồn video</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {currentEpisodeData?.name || `Tập ${currentEpisodeIndex + 1}`} - {movie.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Chất lượng: {movie.quality} | {movie.lang}
                  </p>
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
      </div>

      {/* Content Below Video */}
      <div className={`${theaterMode ? 'max-w-7xl' : 'container'} mx-auto px-4 mt-8`}>
        {/* Server Selection & Episodes */}
        <div className="grid grid-cols-1 gap-6">
          {/* Server Selection Row */}
          {episodes.length > 0 && (
            <div className="bg-movie-card rounded-xl p-4">
              <h3 className="text-movie-text font-semibold mb-3">Chọn server</h3>
              <div className="flex flex-wrap gap-2">
                {episodes.map((server, index) => (
                  <Button
                    key={index}
                    variant={index === selectedServer ? "default" : "outline"}
                    className={`${
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

          {/* Information Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Movie details */}
            <div className="bg-movie-card rounded-xl p-4 md:col-span-2">
              <h3 className="text-movie-text font-semibold mb-3">Mô tả phim</h3>
              <p className="text-movie-muted text-sm">
                {movie.content ? movie.content.replace(/<[^>]*>?/gm, '') : 'Chưa có mô tả cho bộ phim này.'}
              </p>
            </div>
          </div>

          {/* Episodes List */}
          {episodes.length > 0 && episodes[selectedServer]?.server_data && (
            <EpisodesList 
              episodes={episodes[selectedServer].server_data}
              movieSlug={movie.slug}
              currentEpisode={episode}
            />
          )}
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

// Component riêng cho danh sách tập phim với giao diện ô vuông nhỏ hơn (1x1)
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
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto p-1">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2 auto-rows-[minmax(40px,auto)]">
            {episodes.map((ep, index) => (
              <Link
                key={index}
                to={`/watch/${movieSlug}/${ep.slug}`}
                className={`group relative flex items-center justify-center w-full min-w-[40px] min-h-[40px] aspect-square rounded-lg transition-all duration-200 ${
                  ep.slug === currentEpisode
                    ? 'bg-movie-accent scale-105 shadow-lg'
                    : 'bg-movie-bg hover:bg-movie-accent/20 hover:scale-105'
                }`}
                title={ep.name}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                  <div className={`text-center ${
                    ep.slug === currentEpisode ? 'text-white' : 'text-blue-400'
                  }`}>
                    <div className="font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  {ep.slug === currentEpisode && (
                    <div className="absolute top-0.5 right-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto p-1">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2 auto-rows-[minmax(40px,auto)]">
            {Array.from({ length: 30 }).map((_, index) => (
              <div key={index} className="aspect-square min-w-[40px] min-h-[40px] bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchMovie;
              


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, Maximize, Volume2, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';

const WatchMovie = () => {
  const { id, episode } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2700); // 45 minutes in seconds

  const movie = {
    id: id || '1',
    title: 'Tôi Đã Cướp Mất Đêm Đầu Tiên Của Nam Chính',
    originalTitle: 'The First Night with the Duke',
    currentEpisode: parseInt(episode || '1'),
    totalEpisodes: 16,
    servers: ['Server 1', 'Server 2', 'Server 3'],
    qualities: ['360p', '480p', '720p', '1080p']
  };

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

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Back to Movie Detail */}
      <div className="container mx-auto px-4 py-4">
        <Link to={`/movie/${id}`} className="inline-flex items-center text-movie-muted hover:text-movie-accent transition-colors">
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
                {movie.title} - Tập {movie.currentEpisode}
              </h1>
              <p className="text-movie-muted">{movie.originalTitle}</p>
            </div>

            {/* Video Container */}
            <div className="relative bg-black rounded-xl overflow-hidden group">
              {/* Video Placeholder */}
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
                    Tập {movie.currentEpisode} - {movie.title}
                  </p>
                </div>
              </div>

              {/* Video Controls */}
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
            </div>

            {/* Episode Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Link 
                to={`/watch/${id}/${Math.max(1, movie.currentEpisode - 1)}`}
                className={`flex items-center gap-2 ${movie.currentEpisode === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Button 
                  variant="outline" 
                  className="border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                  disabled={movie.currentEpisode === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Tập trước
                </Button>
              </Link>

              <div className="text-center">
                <p className="text-movie-text font-semibold">
                  Tập {movie.currentEpisode} / {movie.totalEpisodes}
                </p>
              </div>

              <Link 
                to={`/watch/${id}/${Math.min(movie.totalEpisodes, movie.currentEpisode + 1)}`}
                className={`flex items-center gap-2 ${movie.currentEpisode === movie.totalEpisodes ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Button 
                  className="bg-movie-accent hover:bg-movie-accent/90 text-white"
                  disabled={movie.currentEpisode === movie.totalEpisodes}
                >
                  Tập tiếp theo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Selection */}
            <div className="bg-movie-card rounded-xl p-4">
              <h3 className="text-movie-text font-semibold mb-3">Chọn server</h3>
              <div className="space-y-2">
                {movie.servers.map((server, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className={`w-full ${
                      index === 0 
                        ? "bg-movie-accent hover:bg-movie-accent/90 text-white" 
                        : "border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                    }`}
                  >
                    {server}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quality Selection */}
            <div className="bg-movie-card rounded-xl p-4">
              <h3 className="text-movie-text font-semibold mb-3">Chất lượng</h3>
              <div className="grid grid-cols-2 gap-2">
                {movie.qualities.map((quality, index) => (
                  <Button
                    key={index}
                    variant={quality === '1080p' ? "default" : "outline"}
                    size="sm"
                    className={`${
                      quality === '1080p'
                        ? "bg-movie-accent hover:bg-movie-accent/90 text-white" 
                        : "border-movie-accent text-movie-accent hover:bg-movie-accent/10"
                    }`}
                  >
                    {quality}
                  </Button>
                ))}
              </div>
            </div>

            {/* Episodes List */}
            <div className="bg-movie-card rounded-xl p-4">
              <h3 className="text-movie-text font-semibold mb-3">Danh sách tập</h3>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {Array.from({ length: movie.totalEpisodes }, (_, i) => (
                  <Link
                    key={i + 1}
                    to={`/watch/${id}/${i + 1}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      i + 1 === movie.currentEpisode
                        ? 'bg-movie-accent text-white'
                        : 'bg-movie-bg text-movie-text hover:bg-movie-accent/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tập {i + 1}</span>
                      {i + 1 === movie.currentEpisode && (
                        <Badge className="bg-white text-movie-accent">
                          Đang xem
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default WatchMovie;

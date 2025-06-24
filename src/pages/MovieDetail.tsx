
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Star, Calendar, Clock, Users, Globe, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import MovieSection from '@/components/shared/MovieSection';
import { useMovieDetail, useMovieList } from '@/hooks/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';

const MovieDetail = () => {
  const { slug } = useParams();
  const { data: movie, loading } = useMovieDetail(slug || '');
  
  // Lấy phim liên quan (cùng thể loại)
  const { data: relatedMoviesData } = useMovieList({
    type_list: 'phim-bo',
    category: movie?.category?.[0]?.slug || '',
    page: 1,
    limit: 4
  });

  const relatedMovies = relatedMoviesData?.map(transformMovieToCardData) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-movie-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Đang tải thông tin phim...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-movie-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Không tìm thấy thông tin phim</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center text-movie-muted hover:text-movie-accent transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại trang chủ
        </Link>
      </div>

      {/* Movie Hero Section */}
      <section className="relative">
        <div 
          className="h-[50vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie.thumb_url || movie.poster_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-movie-bg via-movie-bg/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <img 
                src={movie.poster_url || movie.thumb_url} 
                alt={movie.name}
                className="w-80 h-auto rounded-xl shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{movie.name}</h1>
                  <p className="text-xl text-movie-muted mb-4">{movie.origin_name}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:text-movie-accent">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Rating & Meta */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-semibold">{movie.view ? (movie.view / 10000).toFixed(1) + 'K' : '8.5'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{movie.time || '120 phút'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{movie.country?.[0]?.name || 'Không xác định'}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {movie.category?.map((cat, index) => (
                  <Badge key={index} className="bg-movie-accent text-white">
                    {cat.name}
                  </Badge>
                ))}
                <Badge className="bg-orange-500 text-white">
                  {movie.status === 'ongoing' ? 'Đang chiếu' : 'Hoàn thành'}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-movie-muted leading-relaxed mb-8">
                {movie.content ? movie.content.replace(/<[^>]*>?/gm, '') : 'Chưa có mô tả'}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link to={`/watch/${movie.slug}/1`}>
                  <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white px-8 py-3">
                    <Play className="h-5 w-5 mr-2" />
                    Xem ngay
                  </Button>
                </Link>
                {movie.trailer_url && (
                  <Button variant="outline" className="border-movie-accent text-movie-accent hover:bg-movie-accent/10">
                    Xem trailer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      {movie.episodes && movie.episodes.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-movie-text mb-6">Danh sách tập phim</h2>
          {movie.episodes.map((server, serverIndex) => (
            <div key={serverIndex} className="mb-8">
              <h3 className="text-lg font-semibold text-movie-text mb-4">{server.server_name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {server.server_data.map((episode, episodeIndex) => (
                  <Link 
                    key={episodeIndex}
                    to={`/watch/${movie.slug}/${episode.slug}`}
                    className="bg-movie-card rounded-lg p-4 text-center hover:bg-movie-accent transition-colors"
                  >
                    <span className="text-white font-medium">{episode.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Cast & Crew */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-movie-text mb-6">Diễn viên & Đạo diễn</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movie.director?.length > 0 && (
            <div className="bg-movie-card rounded-xl p-4">
              <div className="w-16 h-16 bg-movie-accent rounded-full mb-3 mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-movie-text font-semibold text-center mb-1">Đạo diễn</h3>
              <p className="text-movie-muted text-center text-sm">{movie.director.join(', ')}</p>
            </div>
          )}
          {movie.actor?.slice(0, 6).map((actor, index) => (
            <div key={index} className="bg-movie-card rounded-xl p-4">
              <div className="w-16 h-16 bg-movie-accent rounded-full mb-3 mx-auto flex items-center justify-center">
                <span className="text-white font-bold">{actor.charAt(0)}</span>
              </div>
              <h3 className="text-movie-text font-semibold text-center mb-1">Diễn viên</h3>
              <p className="text-movie-muted text-center text-sm">{actor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <MovieSection 
          title="Phim liên quan"
          subtitle="Những bộ phim tương tự bạn có thể thích"
          movies={relatedMovies}
        />
      )}
    </div>
  );
};

export default MovieDetail;

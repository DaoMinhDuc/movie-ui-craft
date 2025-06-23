
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Star, Calendar, Clock, Users, Globe, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import MovieSection from '@/components/shared/MovieSection';

const MovieDetail = () => {
  const { id } = useParams();

  // Sample movie data - trong thực tế sẽ fetch từ API
  const movie = {
    id: id || '1',
    title: 'Tôi Đã Cướp Mất Đêm Đầu Tiên Của Nam Chính',
    originalTitle: 'The First Night with the Duke',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=1200&h=600&fit=crop',
    rating: 8.5,
    year: '2024',
    duration: '45 phút/tập',
    episodes: 16,
    currentEpisode: 1,
    status: 'Đang chiếu',
    country: 'Hàn Quốc',
    genre: ['Romance', 'Drama', 'Comedy'],
    director: 'Kim So-hyun',
    cast: ['Park Bo-young', 'Park Hyung-sik', 'Jisoo', 'Ahn Hyo-seop'],
    description: 'Một câu chuyện tình yêu lãng mạn giữa một nữ biên kịch trẻ và một công tước quyền lực. Khi cô ấy vô tình xuyên không vào thế giới tiểu thuyết của chính mình, mọi thứ bắt đầu thay đổi theo những cách không thể ngờ tới.',
    trailer: 'https://www.youtube.com/watch?v=example'
  };

  const relatedMovies = [
    {
      id: '2',
      title: 'Mùa Xuân Tuổi Trẻ',
      subtitle: 'Spring of Youth',
      image: 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=400&h=225&fit=crop',
      episode: 'PĐ. 7',
      rating: 9.2,
      year: '2024',
      duration: '60 phút',
      genre: ['Youth', 'Romance']
    },
    {
      id: '3',
      title: 'Ngôi Nhà của Nữ Hoàng',
      subtitle: "Queen's House",
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop',
      episode: 'PĐ. 31',
      rating: 8.8,
      year: '2024',
      duration: '50 phút',
      genre: ['Mystery', 'Thriller']
    },
    {
      id: '4',
      title: 'Họ Đã Kết Hôn',
      subtitle: 'They Got Married',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop',
      episode: 'Full',
      rating: 7.9,
      year: '2023',
      duration: '120 phút',
      genre: ['Romance', 'Comedy']
    }
  ];

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
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-movie-bg via-movie-bg/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-80 h-auto rounded-xl shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                  <p className="text-xl text-movie-muted mb-4">{movie.originalTitle}</p>
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
                  <span className="text-lg font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{movie.country}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex gap-2 mb-6">
                {movie.genre.map((g, index) => (
                  <Badge key={index} className="bg-movie-accent text-white">
                    {g}
                  </Badge>
                ))}
                <Badge className="bg-orange-500 text-white">
                  {movie.status}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-movie-muted leading-relaxed mb-8">
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link to={`/watch/${movie.id}/1`}>
                  <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white px-8 py-3">
                    <Play className="h-5 w-5 mr-2" />
                    Xem ngay
                  </Button>
                </Link>
                <Button variant="outline" className="border-movie-accent text-movie-accent hover:bg-movie-accent/10">
                  Xem trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-movie-text mb-6">Danh sách tập phim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {Array.from({ length: movie.episodes }, (_, i) => (
            <Link 
              key={i + 1}
              to={`/watch/${movie.id}/${i + 1}`}
              className={`bg-movie-card rounded-lg p-4 text-center hover:bg-movie-accent transition-colors ${
                i + 1 === movie.currentEpisode ? 'bg-movie-accent' : ''
              }`}
            >
              <span className="text-white font-medium">Tập {i + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cast & Crew */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-movie-text mb-6">Diễn viên & Đạo diễn</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-movie-card rounded-xl p-4">
            <div className="w-16 h-16 bg-movie-accent rounded-full mb-3 mx-auto flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-movie-text font-semibold text-center mb-1">Đạo diễn</h3>
            <p className="text-movie-muted text-center text-sm">{movie.director}</p>
          </div>
          {movie.cast.map((actor, index) => (
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
      <MovieSection 
        title="Phim liên quan"
        subtitle="Những bộ phim tương tự bạn có thể thích"
        movies={relatedMovies}
      />
    </div>
  );
};

export default MovieDetail;

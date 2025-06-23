
import React from 'react';
import Header from '@/components/shared/Header';
import CategoryGrid from '@/components/shared/CategoryGrid';
import MovieSection from '@/components/shared/MovieSection';
import { useNewMovies, useMovieList } from '@/hooks/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';

const Index = () => {
  // Lấy phim mới cập nhật
  const { data: newMoviesData, isLoading: isLoadingNew } = useNewMovies(1, 'v2');
  
  // Lấy phim bộ Hàn Quốc
  const { data: koreanSeriesData, isLoading: isLoadingKorean } = useMovieList({
    type_list: 'phim-bo',
    country: 'han-quoc',
    page: 1,
    limit: 8,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Transform dữ liệu cho UI
  const newMovies = newMoviesData?.data?.items?.slice(0, 8)?.map(transformMovieToCardData) || [];
  const koreanMovies = koreanSeriesData?.data?.items?.map(transformMovieToCardData) || [];

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-movie-bg via-movie-bg/80 to-transparent">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=1200&h=600&fit=crop)'
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-movie-text mb-4">
              Khám phá thế giới
              <span className="text-movie-accent"> điện ảnh</span>
            </h1>
            <p className="text-lg text-movie-muted mb-8 leading-relaxed">
              Hàng ngàn bộ phim chất lượng cao, từ Hollywood đến châu Á. 
              Trải nghiệm xem phim tuyệt vời với chất lượng 4K và âm thanh sống động.
            </p>
            <div className="flex space-x-4">
              <button className="bg-movie-accent hover:bg-movie-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Xem ngay
              </button>
              <button className="border border-movie-accent text-movie-accent hover:bg-movie-accent/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Movie Sections */}
      {isLoadingNew ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Đang tải phim mới...</div>
        </div>
      ) : (
        <MovieSection 
          title="Phim mới cập nhật"
          subtitle="Những bộ phim được cập nhật gần đây nhất"
          movies={newMovies}
        />
      )}

      {isLoadingKorean ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Đang tải phim Hàn Quốc...</div>
        </div>
      ) : (
        <MovieSection 
          title="Phim Hàn Quốc mới"
          subtitle="Những bộ phim Hàn Quốc hot nhất hiện tại"
          movies={koreanMovies}
        />
      )}

      <div className="h-20" />
    </div>
  );
};

export default Index;

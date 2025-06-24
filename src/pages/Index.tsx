
import React from 'react';
import Header from '@/components/shared/Header';
import CategoryGrid from '@/components/shared/CategoryGrid';
import MovieSection from '@/components/shared/MovieSection';
import { useNewMovies, useMovieList } from '@/hooks/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';

const Index = () => {
  // Lấy phim mới cập nhật
  const { data: newMoviesData, loading: isLoadingNew, error: errorNew } = useNewMovies(1, 'v2');
  
  // Lấy phim bộ mới nhất
  const { data: seriesData, loading: isLoadingSeries, error: errorSeries } = useMovieList({
    type_list: 'phim-bo',
    page: 1,
    limit: 8,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Lấy phim lẻ mới nhất
  const { data: moviesData, loading: isLoadingMovies, error: errorMovies } = useMovieList({
    type_list: 'phim-le',
    page: 1,
    limit: 8,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Transform dữ liệu cho UI
  const newMovies = newMoviesData?.slice(0, 8)?.map(transformMovieToCardData) || [];
  const series = seriesData?.map(transformMovieToCardData) || [];
  const movies = moviesData?.map(transformMovieToCardData) || [];

  console.log('API Data:', { newMoviesData, seriesData, moviesData });

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
      ) : errorNew ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Lỗi tải phim mới: {errorNew.message}</div>
        </div>
      ) : newMovies.length > 0 ? (
        <MovieSection 
          title="Phim mới cập nhật"
          subtitle="Những bộ phim được cập nhật gần đây nhất"
          movies={newMovies}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Không có phim mới nào</div>
        </div>
      )}

      {isLoadingSeries ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Đang tải phim bộ...</div>
        </div>
      ) : errorSeries ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Lỗi tải phim bộ: {errorSeries.message}</div>
        </div>
      ) : series.length > 0 ? (
        <MovieSection 
          title="Phim bộ mới nhất"
          subtitle="Những bộ phim bộ hot nhất hiện tại"
          movies={series}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Không có phim bộ nào</div>
        </div>
      )}

      {isLoadingMovies ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Đang tải phim lẻ...</div>
        </div>
      ) : errorMovies ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">Lỗi tải phim lẻ: {errorMovies.message}</div>
        </div>
      ) : movies.length > 0 ? (
        <MovieSection 
          title="Phim lẻ mới nhất"
          subtitle="Những bộ phim lẻ được yêu thích nhất"
          movies={movies}
        />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-movie-muted">Không có phim lẻ nào</div>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
};

export default Index;

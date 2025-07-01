
import React from 'react';
import Header from '@/components/shared/Header';
import CategoryGrid from '@/components/shared/CategoryGrid';
import MovieSection from '@/components/shared/MovieSection';
import HeroCarousel from '@/components/shared/HeroCarousel';
import { useNewMovies, useMovieList } from '@/hooks/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Index = () => {
  // Lấy phim mới cập nhật
  const { data: newMoviesData, loading: isLoadingNew, error: errorNew } = useNewMovies(1, 'v2');
  
  // Lấy phím bộ mới nhất
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

  // Tạo dữ liệu featured movies cho carousel
  const featuredMovies = newMoviesData?.slice(0, 5)?.map(movie => ({
    id: movie.slug || movie._id || '1',
    title: movie.name || 'Phim hay',
    subtitle: movie.origin_name,
    description: movie.content || `${movie.name} - Một bộ phim hấp dẫn với cfabout đặc sắc và nội dung thú vị. Đây là một trong những bộ phim được yêu thích và theo dõi nhiều nhất hiện nại.`,
    image: movie.poster_url || movie.thumb_url || 'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=1200&h=600&fit=crop',
    rating: 8.5,
    year: movie.year?.toString() || '2024',
    duration: '120 phút',
    genre: movie.category?.map(cat => cat.name) || ['Hành động'],
    isNew: true
  })) || [];

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Hero Carousel */}
      {featuredMovies.length > 0 && <HeroCarousel movies={featuredMovies} />}

      {/* Category Grid với lazy loading */}
      <LazySection>
        <CategoryGrid />
      </LazySection>

      {/* Movie Sections với lazy loading */}
      {isLoadingNew ? (
        <LoadingSection title="Đang tải phim mới..." />
      ) : errorNew ? (
        <ErrorSection error={errorNew.message} />
      ) : newMovies.length > 0 ? (
        <MovieSection 
          title="Phim mới cập nhật"
          subtitle="Những bộ phim được cập nhật gần đây nhất"
          movies={newMovies}
        />
      ) : (
        <EmptySection message="Không có phim mới nào" />
      )}

      {isLoadingSeries ? (
        <LoadingSection title="Đang tải phim bộ..." />
      ) : errorSeries ? (
        <ErrorSection error={errorSeries.message} />
      ) : series.length > 0 ? (
        <MovieSection 
          title="Phim bộ mới nhất"
          subtitle="Những bộ phim bộ hot nhất hiện tại"
          movies={series}
        />
      ) : (
        <EmptySection message="Không có phim bộ nào" />
      )}

      {isLoadingMovies ? (
        <LoadingSection title="Đang tải phim lẻ..." />
      ) : errorMovies ? (
        <ErrorSection error={errorMovies.message} />
      ) : movies.length > 0 ? (
        <MovieSection 
          title="Phim lẻ mới nhất"
          subtitle="Những bộ phim lẻ được yêu thích nhất"
          movies={movies}
        />
      ) : (
        <EmptySection message="Không có phim lẻ nào" />
      )}

      <div className="h-20" />
    </div>
  );
};

// Component LazySection cho lazy loading
const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  return (
    <div ref={ref}>
      {hasIntersected ? children : (
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Components trạng thái
const LoadingSection: React.FC<{ title: string }> = ({ title }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center text-movie-muted">{title}</div>
  </div>
);

const ErrorSection: React.FC<{ error: string }> = ({ error }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center text-red-500">Lỗi: {error}</div>
  </div>
);

const EmptySection: React.FC<{ message: string }> = ({ message }) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center text-movie-muted">{message}</div>
  </div>
);

export default Index;


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

  // Tạo dữ liệu featured movies cho carousel từ tất cả các loại phim
  const createFeaturedMovies = () => {
    const featuredList = [];
    
    // Danh sách ảnh nền đa dạng
    const backgroundImages = [
      'https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop'
    ];
    
    let imageIndex = 0;
    
    // Lấy 2 phim từ phim mới cập nhật
    if (newMoviesData && newMoviesData.length > 0) {
      const newMoviesFeatured = newMoviesData.slice(0, 2).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim hay',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim hấp dẫn với nội dung đặc sắc và câu chuyện thú vị. Đây là một trong những bộ phim được yêu thích và theo dõi nhiều nhất hiện nay.`,
        image: movie.poster_url || movie.thumb_url || backgroundImages[imageIndex++ % backgroundImages.length],
        rating: 8.5,
        year: movie.year?.toString() || '2024',
        duration: '120 phút',
        genre: movie.category?.map(cat => cat.name) || ['Hành động'],
        isNew: true
      }));
      featuredList.push(...newMoviesFeatured);
    }

    // Lấy 2 phim từ phim bộ mới nhất
    if (seriesData && seriesData.length > 0) {
      const seriesFeatured = seriesData.slice(0, 2).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim bộ',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim bộ hấp dẫn với nhiều tập phim thú vị. Theo dõi hành trình của các nhân vật qua từng tập phim đầy kịch tính.`,
        image: movie.poster_url || movie.thumb_url || backgroundImages[imageIndex++ % backgroundImages.length],
        rating: 8.7,
        year: movie.year?.toString() || '2024',
        duration: 'Nhiều tập',
        genre: movie.category?.map(cat => cat.name) || ['Phim bộ'],
        isNew: false
      }));
      featuredList.push(...seriesFeatured);
    }

    // Lấy 1 phim từ phim lẻ mới nhất
    if (moviesData && moviesData.length > 0) {
      const moviesFeatured = moviesData.slice(0, 1).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim lẻ',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim lẻ với câu chuyện hoàn chỉnh và hấp dẫn. Thưởng thức trọn vẹn câu chuyện trong một bộ phim duy nhất.`,
        image: movie.poster_url || movie.thumb_url || backgroundImages[imageIndex++ % backgroundImages.length],
        rating: 8.3,
        year: movie.year?.toString() || '2024',
        duration: '120 phút',
        genre: movie.category?.map(cat => cat.name) || ['Phim lẻ'],
        isNew: false
      }));
      featuredList.push(...moviesFeatured);
    }

    return featuredList;
  };

  const featuredMovies = createFeaturedMovies();

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Hero Carousel - Hiển thị khi có ít nhất 1 phim featured */}
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

import React from 'react';
import Header from '@/components/shared/Header';
import CategoryGrid from '@/components/shared/CategoryGrid';
import MovieSection from '@/components/shared/MovieSection';
import HeroCarousel from '@/components/shared/HeroCarousel';
import { useNewMoviesQuery, useMovieListQuery } from '@/hooks';
import { transformMovieToCardData, getMovieImageUrl } from '@/utils/movieUtils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Loader2 } from 'lucide-react';
import { FeaturedMovie, CarouselItem } from '@/types/carousel';
import { Movie } from '@/types/movie';

const Index = () => {
  // Lấy phim mới cập nhật
  const { 
    data: newMoviesResponse, 
    isLoading: isLoadingNew, 
    error: errorNew,
    isError: isErrorNew,
    refetch: refetchNewMovies
  } = useNewMoviesQuery(1, 'v2');
  
  // Try different API versions based on fallbacks
  const [apiVersion, setApiVersion] = React.useState<'v1' | 'v2' | 'v3'>('v2');
  
  // If current version fails, try a different version
  React.useEffect(() => {
    if (isErrorNew || (newMoviesResponse && (!newMoviesResponse.data || !newMoviesResponse.data.items || newMoviesResponse.data.items.length === 0))) {
      // Switch from v2 to v1, or v1 to v3
      setApiVersion(apiVersion === 'v2' ? 'v1' : apiVersion === 'v1' ? 'v3' : 'v2');
    }
  }, [isErrorNew, newMoviesResponse, apiVersion]);
  
  // Use the current API version for the query
  const { 
    data: fallbackNewMovies, 
    isLoading: isLoadingFallback 
  } = useNewMoviesQuery(1, apiVersion);
  
  // Use fallback mechanism to handle different API versions
  
  // Lấy phím bộ mới nhất
  const { 
    data: seriesResponse, 
    isLoading: isLoadingSeries, 
    error: errorSeries 
  } = useMovieListQuery({
    type_list: 'phim-bo',
    page: 1,
    limit: 8,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Lấy phim lẻ mới nhất
  const { 
    data: moviesResponse, 
    isLoading: isLoadingMovies, 
    error: errorMovies 
  } = useMovieListQuery({
    type_list: 'phim-le',
    page: 1,
    limit: 8,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Extract movie data from responses with fallbacks for different API structures
  let newMoviesData: Movie[] = [];
  
  // First try with the primary data source
  if (newMoviesResponse) {
    if (newMoviesResponse.data?.items) {
      // Standard structure
      newMoviesData = newMoviesResponse.data.items;
    } else if (Array.isArray(newMoviesResponse.data)) {
      // Alternative structure: data is an array directly
      newMoviesData = newMoviesResponse.data;
    } else if (typeof newMoviesResponse === 'object' && 'items' in newMoviesResponse) {
      // Another alternative: items at the top level
      newMoviesData = (newMoviesResponse as unknown as { items: Movie[] }).items;
    } else if (Array.isArray(newMoviesResponse)) {
      // Direct array response
      newMoviesData = newMoviesResponse as unknown as Movie[];
    }
  }
  
  // If primary data is empty or has error, try with fallback data
  if ((isErrorNew || newMoviesData.length === 0) && fallbackNewMovies) {
    if (fallbackNewMovies.data?.items) {
      newMoviesData = fallbackNewMovies.data.items;
    } else if (Array.isArray(fallbackNewMovies.data)) {
      newMoviesData = fallbackNewMovies.data;
    } else if (typeof fallbackNewMovies === 'object' && 'items' in fallbackNewMovies) {
      newMoviesData = (fallbackNewMovies as unknown as { items: Movie[] }).items;
    } else if (Array.isArray(fallbackNewMovies)) {
      newMoviesData = fallbackNewMovies as unknown as Movie[];
    }
  }
  
  const seriesData = seriesResponse?.data?.items || [];
  const moviesData = moviesResponse?.data?.items || [];

  // Transform dữ liệu cho UI
  const newMovies = newMoviesData?.slice(0, 8)?.map(movie => {
    try {
      return transformMovieToCardData(movie);
    } catch (error) {
      return null;
    }
  }).filter(Boolean) || [];
  const series = seriesData?.map(movie => transformMovieToCardData(movie)).filter(Boolean) || [];
  const movies = moviesData?.map(movie => transformMovieToCardData(movie)).filter(Boolean) || [];

  // Tạo dữ liệu featured movies cho carousel từ tất cả các loại phim
  const createFeaturedMovies = (): FeaturedMovie[] => {
    const featuredList: FeaturedMovie[] = [];
    
    // Convert CarouselItem to FeaturedMovie
    const convertToFeaturedMovie = (item: CarouselItem): FeaturedMovie => {
      return {
        _id: item.id,
        name: item.title,
        origin_name: item.subtitle,
        content: item.description,
        thumb_url: item.backgroundImage,
        poster_url: item.image,
        rating: item.rating,
        year: parseInt(item.year) || new Date().getFullYear(),
        time: item.duration,
        category: item.genre.map(name => ({ id: name, name, slug: name.toLowerCase() })),
      };
    };
    
    // Lấy 2 phim từ phim mới cập nhật
    if (newMoviesData && newMoviesData.length > 0) {
      const newMoviesFeatured = newMoviesData.slice(0, 2).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim hay',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim hấp dẫn với nội dung đặc sắc và câu chuyện thú vị. Đây là một trong những bộ phim được yêu thích và theo dõi nhiều nhất hiện nay.`,
        image: getMovieImageUrl(movie, false), // Use poster_url for main image
        backgroundImage: getMovieImageUrl(movie, true), // Use thumb_url for background
        rating: 8.5,
        year: movie.year?.toString() || '2024',
        duration: '120 phút',
        genre: movie.category?.map(cat => cat.name) || ['Hành động'],
        isNew: true
      }));
      
      // Convert to FeaturedMovie type before adding to the list
      newMoviesFeatured.forEach(item => {
        featuredList.push(convertToFeaturedMovie(item));
      });
    }

    // Lấy 2 phim từ phim bộ mới nhất
    if (seriesData && seriesData.length > 0) {
      const seriesFeatured = seriesData.slice(0, 2).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim bộ',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim bộ hấp dẫn với nhiều tập phim thú vị. Theo dõi hành trình của các nhân vật qua từng tập phim đầy kịch tính.`,
        image: getMovieImageUrl(movie, false), // Use poster_url for main image
        backgroundImage: getMovieImageUrl(movie, true), // Use thumb_url for background
        rating: 8.7,
        year: movie.year?.toString() || '2024',
        duration: 'Nhiều tập',
        genre: movie.category?.map(cat => cat.name) || ['Phim bộ'],
        isNew: false
      }));
      
      // Convert to FeaturedMovie type before adding to the list
      seriesFeatured.forEach(item => {
        featuredList.push(convertToFeaturedMovie(item));
      });
    }

    // Lấy 1 phim từ phim lẻ mới nhất
    if (moviesData && moviesData.length > 0) {
      const moviesFeatured = moviesData.slice(0, 1).map(movie => ({
        id: movie.slug || movie._id || '1',
        title: movie.name || 'Phim lẻ',
        subtitle: movie.origin_name,
        description: movie.content || `${movie.name} - Một bộ phim lẻ với câu chuyện hoàn chỉnh và hấp dẫn. Thưởng thức trọn vẹn câu chuyện trong một bộ phim duy nhất.`,
        image: getMovieImageUrl(movie, false), // Use poster_url for main image
        backgroundImage: getMovieImageUrl(movie, true), // Use thumb_url for background
        rating: 8.3,
        year: movie.year?.toString() || '2024',
        duration: '120 phút',
        genre: movie.category?.map(cat => cat.name) || ['Phim lẻ'],
        isNew: false
      }));
      
      // Convert to FeaturedMovie type before adding to the list
      moviesFeatured.forEach(item => {
        featuredList.push(convertToFeaturedMovie(item));
      });
    }

    return featuredList;
  };

  const featuredMovies = createFeaturedMovies();

  // Loading state
  const isLoading = (isLoadingNew && isLoadingFallback) || isLoadingSeries || isLoadingMovies;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-movie-bg flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
      {isLoadingNew && isLoadingFallback ? (
        <LoadingSection title="Đang tải phim mới..." />
      ) : (isErrorNew && newMovies.length === 0) ? (
        <ErrorSection error={`Lỗi khi tải phim mới: ${errorNew?.message || 'Không thể tải dữ liệu'}`} />
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

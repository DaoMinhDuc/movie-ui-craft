
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/shared/Header';
import MovieCard from '@/components/shared/MovieCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchMoviesQuery } from '@/hooks/queries/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const { data: searchResults, isLoading } = useSearchMoviesQuery({
    keyword: searchQuery,
    page: 1,
    limit: 20
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const onSearch = () => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const transformedResults = searchResults?.data?.items?.map(transformMovieToCardData) || [];

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-movie-text mb-4">Tìm kiếm phim</h1>
          
          <div className="flex space-x-4 max-w-2xl">
            <div className="flex-1 relative">
              <Input
                placeholder="Nhập tên phim, thể loại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-movie-card border-movie-card text-movie-text placeholder:text-movie-muted pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
            </div>
            <Button 
              onClick={onSearch}
              className="bg-movie-accent hover:bg-movie-accent/90 text-white"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-movie-text">
                {isLoading ? (
                  'Đang tìm kiếm...'
                ) : (
                  `Kết quả cho "${searchQuery}" (${transformedResults.length} phim)`
                )}
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-movie-card animate-pulse rounded-lg h-80"></div>
                ))}
              </div>
            ) : (
              <>
                {transformedResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {transformedResults.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        subtitle={movie.subtitle}
                        image={movie.image}
                        episode={movie.episode}
                        rating={movie.rating}
                        year={movie.year}
                        duration={movie.duration}
                        genre={movie.genre}
                        isNew={movie.isNew}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-movie-muted text-lg mb-4">
                      Không tìm thấy phim nào với từ khóa "{searchQuery}"
                    </div>
                    <p className="text-movie-muted">
                      Hãy thử tìm kiếm với từ khóa khác
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Default state when no search */}
        {!searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-movie-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-movie-text mb-2">
              Tìm kiếm phim yêu thích
            </h2>
            <p className="text-movie-muted">
              Nhập tên phim hoặc thể loại để bắt đầu tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

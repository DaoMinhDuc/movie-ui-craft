
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/shared/Header';
import MovieCard from '@/components/shared/MovieCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample movie data for search results
  const allMovies = [
    {
      id: '1',
      title: 'Tôi Đã Cướp Mất Đêm Đầu Tiên Của Nam Chính',
      subtitle: 'The First Night with the Duke',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop',
      episode: 'PĐ. 1',
      rating: 8.5,
      year: '2024',
      duration: '45 phút',
      genre: ['Romance', 'Drama'],
      isNew: true
    },
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
    },
    {
      id: '5',
      title: 'Avengers: Endgame',
      subtitle: 'Marvel Studios',
      image: 'https://images.unsplash.com/photo-1478720568477-b0a8b0df2bdb?w=400&h=225&fit=crop',
      episode: 'Full',
      rating: 9.0,
      year: '2019',
      duration: '181 phút',
      genre: ['Action', 'Adventure', 'Drama']
    }
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

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
                  `Kết quả cho "${searchQuery}" (${searchResults.length} phim)`
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
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((movie) => (
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


import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import MovieCard from '@/components/shared/MovieCard';
import { useMovieList, useCategories } from '@/hooks/useMovies';
import { transformMovieToCardData } from '@/utils/movieUtils';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Get movies for this category
  const { data: moviesData, loading } = useMovieList({
    type_list: category as any || 'phim-bo',
    page: currentPage,
    limit: 20,
    sort_field: 'modified.time',
    sort_type: 'desc'
  });

  // Get categories for filter
  const { data: categories } = useCategories();

  const categoryTitles: { [key: string]: string } = {
    'phim-bo': 'Phim Bộ',
    'phim-le': 'Phim Lẻ',
    'tv-shows': 'TV Shows',
    'hoat-hinh': 'Hoạt Hình',
    'phim-vietsub': 'Phim Vietsub',
    'phim-thuyet-minh': 'Phim Thuyết Minh',
    'phim-long-tieng': 'Phim Lồng Tiếng'
  };

  const currentCategory = {
    title: categoryTitles[category || ''] || 'Danh mục phim',
    description: `Tổng hợp ${categoryTitles[category || '']?.toLowerCase() || 'phim'} hay nhất`
  };

  const transformedMovies = moviesData?.map(transformMovieToCardData) || [];

  return (
    <div className="min-h-screen bg-movie-bg">
      <Header />
      
      {/* Category Header */}
      <section className="bg-gradient-to-r from-movie-accent/20 to-transparent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-movie-text mb-2">
            {currentCategory.title}
          </h1>
          <p className="text-movie-muted text-lg">
            {currentCategory.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-movie-accent text-movie-accent hover:bg-movie-accent/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>

          {/* View Mode & Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-movie-accent text-white' : 'text-movie-text'}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-movie-accent text-white' : 'text-movie-text'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <select className="bg-movie-card border border-movie-card text-movie-text rounded-lg px-3 py-2">
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Xem nhiều nhất</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-movie-card animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }`}>
            {transformedMovies.map((movie) => (
              viewMode === 'grid' ? (
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
              ) : (
                <div key={movie.id} className="bg-movie-card rounded-xl p-4 flex gap-4">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-movie-text font-semibold text-lg mb-1">{movie.title}</h3>
                    <p className="text-movie-muted text-sm mb-2">{movie.subtitle}</p>
                    <div className="flex items-center gap-4 text-xs text-movie-muted">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                      <div className="flex gap-1">
                        {movie.genre?.slice(0, 2).map((g, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-movie-accent text-white">
                      {movie.episode}
                    </Badge>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button 
            variant="outline" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="border-movie-accent text-movie-accent"
          >
            Trước
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "bg-movie-accent text-white" : "border-movie-accent text-movie-accent hover:bg-movie-accent/10"}
            >
              {page}
            </Button>
          ))}
          <Button 
            className="bg-movie-accent hover:bg-movie-accent/90 text-white"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

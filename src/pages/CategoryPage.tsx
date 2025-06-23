
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/shared/Header';
import MovieCard from '@/components/shared/MovieCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data based on category
  const categoryData = {
    'phim-bo': {
      title: 'Phim Bộ',
      description: 'Tổng hợp các bộ phim truyền hình hay nhất'
    },
    'phim-le': {
      title: 'Phim Lẻ',
      description: 'Những bộ phim điện ảnh chất lượng cao'
    },
    'phim-han': {
      title: 'Phim Hàn Quốc',
      description: 'Phim Hàn Quốc hot nhất hiện tại'
    },
    'phim-trung': {
      title: 'Phim Trung Quốc',
      description: 'Phim Trung Quốc đặc sắc và hấp dẫn'
    },
    'phim-my': {
      title: 'Phim Mỹ',
      description: 'Phim Hollywood và truyền hình Mỹ'
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData] || {
    title: 'Danh mục phim',
    description: 'Khám phá bộ sưu tập phim đa dạng'
  };

  const filters = {
    countries: ['Tất cả', 'Hàn Quốc', 'Trung Quốc', 'Mỹ', 'Nhật Bản', 'Thái Lan'],
    genres: ['Tất cả', 'Romance', 'Drama', 'Comedy', 'Action', 'Thriller', 'Horror', 'Fantasy'],
    years: ['Tất cả', '2024', '2023', '2022', '2021', '2020'],
    status: ['Tất cả', 'Hoàn thành', 'Đang chiếu', 'Sắp chiếu']
  };

  const movies = [
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
      title: 'Cuộc Chiến Hoàng Gia',
      subtitle: 'Royal War',
      image: 'https://images.unsplash.com/photo-1478720568477-b56703757ac2?w=400&h=225&fit=crop',
      episode: 'PĐ. 12',
      rating: 8.3,
      year: '2024',
      duration: '55 phút',
      genre: ['Action', 'Drama']
    },
    {
      id: '6',
      title: 'Tình Yêu Sau Cơn Mưa',
      subtitle: 'Love After Rain',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      episode: 'Full',
      rating: 7.8,
      year: '2023',
      duration: '105 phút',
      genre: ['Romance', 'Drama']
    }
  ];

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
              <option>Điểm cao nhất</option>
              <option>Xem nhiều nhất</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-movie-card rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-movie-text font-semibold mb-3">Quốc gia</h3>
                <div className="space-y-2">
                  {filters.countries.map((country, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="country" 
                        className="text-movie-accent" 
                        defaultChecked={index === 0}
                      />
                      <span className="text-movie-muted text-sm">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-movie-text font-semibold mb-3">Thể loại</h3>
                <div className="space-y-2">
                  {filters.genres.map((genre, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="text-movie-accent" 
                        defaultChecked={index === 0}
                      />
                      <span className="text-movie-muted text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-movie-text font-semibold mb-3">Năm</h3>
                <div className="space-y-2">
                  {filters.years.map((year, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="year" 
                        className="text-movie-accent" 
                        defaultChecked={index === 0}
                      />
                      <span className="text-movie-muted text-sm">{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-movie-text font-semibold mb-3">Trạng thái</h3>
                <div className="space-y-2">
                  {filters.status.map((status, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        className="text-movie-accent" 
                        defaultChecked={index === 0}
                      />
                      <span className="text-movie-muted text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
            : 'space-y-4'
        }`}>
          {movies.map((movie) => (
            viewMode === 'grid' ? (
              <MovieCard
                key={movie.id}
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button variant="outline" disabled className="border-movie-accent text-movie-accent">
            Trước
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className={page === 1 ? "bg-movie-accent text-white" : "border-movie-accent text-movie-accent hover:bg-movie-accent/10"}
            >
              {page}
            </Button>
          ))}
          <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white">
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

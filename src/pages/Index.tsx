
import React from 'react';
import Header from '@/components/shared/Header';
import CategoryGrid from '@/components/shared/CategoryGrid';
import MovieSection from '@/components/shared/MovieSection';

const Index = () => {
  // Sample movie data
  const koreanMovies = [
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
    }
  ];

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
      <MovieSection 
        title="Phim Hàn Quốc mới"
        subtitle="Những bộ phim Hàn Quốc hot nhất hiện tại"
        movies={koreanMovies}
      />

      {/* Additional sections can be added here */}
      <div className="h-20" /> {/* Spacer */}
    </div>
  );
};

export default Index;

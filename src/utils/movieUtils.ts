
import type { Movie, MovieDetail } from '@/types/api';

export const transformMovieToCardData = (movie: Movie) => {
  return {
    id: movie.slug,
    title: movie.name,
    subtitle: movie.origin_name,
    image: movie.poster_url || movie.thumb_url,
    episode: movie.episode_current,
    rating: movie.view ? parseFloat((movie.view / 1000).toFixed(1)) : undefined,
    year: movie.year?.toString(),
    duration: movie.time,
    genre: movie.category?.map(cat => cat.name) || [],
    isNew: isNewMovie(movie.created.time),
  };
};

export const isNewMovie = (createdTime: string): boolean => {
  const createdDate = new Date(createdTime);
  const now = new Date();
  const diffInDays = (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
  return diffInDays <= 30; // Phim mới trong 30 ngày
};

export const getMovieQuality = (movie: Movie): string => {
  return movie.quality || 'HD';
};

export const getMovieStatus = (movie: Movie): string => {
  if (movie.status === 'completed') return 'Hoàn thành';
  if (movie.status === 'ongoing') return 'Đang chiếu';
  return movie.status || 'Chưa rõ';
};

export const formatMovieRating = (view: number): number => {
  // Tạo rating giả dựa trên lượt xem
  if (view > 1000000) return 9.0 + Math.random() * 0.5;
  if (view > 500000) return 8.0 + Math.random() * 1.0;
  if (view > 100000) return 7.0 + Math.random() * 1.0;
  return 6.0 + Math.random() * 1.0;
};

export const getMovieTypeInVietnamese = (type: string): string => {
  const typeMap: Record<string, string> = {
    'series': 'Phim Bộ',
    'single': 'Phim Lẻ',
    'tvshows': 'TV Shows',
    'hoathinh': 'Hoạt Hình',
  };
  return typeMap[type] || type;
};

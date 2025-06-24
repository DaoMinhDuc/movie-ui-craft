
import type { Movie } from '@/types/movie';

export const transformMovieToCardData = (movie: Movie) => {
  return {
    id: movie._id,
    title: movie.name,
    subtitle: movie.origin_name,
    image: movie.poster_url || movie.thumb_url,
    episode: movie.episode_current || 'Full',
    rating: 8.5, // API không có rating, dùng mặc định
    year: movie.year?.toString() || '2024',
    duration: movie.time || '120 phút',
    genre: movie.category?.map(cat => cat.name) || [],
    isNew: movie.status === 'ongoing',
    slug: movie.slug
  };
};

export const getMovieImageUrl = (movie: Movie) => {
  return movie.poster_url || movie.thumb_url || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop';
};

export const formatEpisodeInfo = (movie: Movie) => {
  if (movie.episode_current && movie.episode_total) {
    return `Tập ${movie.episode_current}/${movie.episode_total}`;
  }
  return movie.episode_current || 'Full';
};

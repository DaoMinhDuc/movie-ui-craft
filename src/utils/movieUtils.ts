
import type { Movie } from '@/types/movie';

export const transformMovieToCardData = (movie: Movie) => {
  // Tạo URL hình ảnh đầy đủ từ API response
  const baseImageUrl = 'https://phimimg.com/';
  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseImageUrl}${imagePath}`;
  };

  return {
    id: movie._id,
    title: movie.name,
    subtitle: movie.origin_name,
    image: getFullImageUrl(movie.poster_url || movie.thumb_url),
    episode: formatEpisodeInfo(movie),
    rating: 8.5, // API không có rating, dùng mặc định
    year: movie.year?.toString() || '2024',
    duration: movie.time || '120 phút',
    genre: movie.category?.map(cat => cat.name) || [],
    isNew: movie.status === 'ongoing',
    slug: movie.slug, // Sử dụng slug thay vì _id
    _id: movie._id // Giữ lại _id để tham chiếu
  };
};

export const getMovieImageUrl = (movie: Movie) => {
  const baseImageUrl = 'https://phimimg.com/';
  const imagePath = movie.poster_url || movie.thumb_url;
  
  if (!imagePath) return 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop';
  if (imagePath.startsWith('http')) return imagePath;
  return `${baseImageUrl}${imagePath}`;
};

export const formatEpisodeInfo = (movie: Movie) => {
  if (movie.episode_current && movie.episode_total) {
    return `${movie.episode_current}/${movie.episode_total}`;
  }
  return movie.episode_current || 'Full';
};

// Hàm để xác định slug từ ID hoặc slug
export const getMovieSlugFromParam = (param: string): string => {
  // Nếu param dài hơn 20 ký tự, có thể là ID, cần chuyển thành slug
  // Ngược lại, coi như đã là slug
  return param;
};


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
    id: movie.slug, // Sử dụng slug làm ID chính
    title: movie.name,
    subtitle: movie.origin_name,
    image: getFullImageUrl(movie.poster_url || movie.thumb_url),
    episode: formatEpisodeInfo(movie),
    rating: 8.5, // API không có rating, dùng mặc định
    year: movie.year?.toString() || '2024',
    duration: movie.time || '120 phút',
    genre: movie.category?.map(cat => cat.name) || [],
    isNew: movie.status === 'ongoing',
    slug: movie.slug,
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

// Hàm để lấy slug từ URL parameter (có thể là slug hoặc ID)
export const getMovieSlugFromParam = (param: string): string => {
  // Nếu param có dạng ID dài (>20 ký tự), cần convert thành slug
  // Ngược lại, coi như đã là slug
  if (param.length > 20 && !param.includes('-')) {
    // Đây có thể là ID, cần tìm cách convert hoặc redirect
    console.warn('URL parameter appears to be an ID, should use slug instead:', param);
  }
  return param;
};

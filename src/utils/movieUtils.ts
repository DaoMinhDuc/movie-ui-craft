
import type { Movie } from '@/types/movie';

export const transformMovieToCardData = (movie: Movie) => {
  // Defensive check to ensure movie is an object
  if (!movie || typeof movie !== 'object') {
    console.error('Invalid movie object:', movie);
    return null;
  }

  // Tạo URL hình ảnh đầy đủ từ API response
  const baseImageUrl = 'https://phimimg.com/';
  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseImageUrl}${imagePath}`;
  };

  return {
    id: movie.slug || movie._id || `movie-${Math.random().toString(36).substring(2, 9)}`,
    title: movie.name || 'Untitled Movie',
    subtitle: movie.origin_name || '',
    image: getFullImageUrl(movie.poster_url), // Use poster_url for movie cards
    backgroundImage: getFullImageUrl(movie.thumb_url), // Use thumb_url for background/thumbnails
    episode: formatEpisodeInfo(movie),
    rating: 8.5, // API không có rating, dùng mặc định
    year: movie.year?.toString() || '2024',
    duration: movie.time || '120 phút',
    genre: Array.isArray(movie.category) ? movie.category.map(cat => cat.name) : [],
    isNew: movie.status === 'ongoing',
    slug: movie.slug || '',
    _id: movie._id || '' // Giữ lại _id để tham chiếu
  };
};

export const getMovieImageUrl = (movie: Movie, isBackground = false) => {
  const baseImageUrl = 'https://phimimg.com/';
  // Use thumb_url for backgrounds, poster_url for posters
  const imagePath = isBackground ? movie.thumb_url : movie.poster_url;
  
  if (!imagePath) {
    // If requested image is not available, try the other one before using placeholder
    const fallbackPath = isBackground ? movie.poster_url : movie.thumb_url;
    if (fallbackPath) {
      if (fallbackPath.startsWith('http')) return fallbackPath;
      return `${baseImageUrl}${fallbackPath}`;
    }
    return 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop';
  }
  
  if (imagePath.startsWith('http')) return imagePath;
  return `${baseImageUrl}${imagePath}`;
};

export const formatEpisodeInfo = (movie: Movie) => {
  if (!movie) return 'Full';
  
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

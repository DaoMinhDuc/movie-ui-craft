
export const API_CONFIG = {
  BASE_URL: 'https://phimapi.com',
  ENDPOINTS: {
    NEW_MOVIES: '/danh-sach/phim-moi-cap-nhat',
    NEW_MOVIES_V2: '/danh-sach/phim-moi-cap-nhat-v2',
    NEW_MOVIES_V3: '/danh-sach/phim-moi-cap-nhat-v3',
    MOVIE_DETAIL: '/phim',
    MOVIE_LIST: '/v1/api/danh-sach',
    SEARCH: '/v1/api/tim-kiem',
    CATEGORIES: '/the-loai',
    CATEGORY_DETAIL: '/v1/api/the-loai',
    COUNTRIES: '/quoc-gia',
    COUNTRY_DETAIL: '/v1/api/quoc-gia',
    YEAR: '/v1/api/nam'
  }
} as const;

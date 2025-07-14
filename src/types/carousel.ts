import { Category, Country } from './movie';

export interface MovieCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MovieCountry {
  id: string;
  name: string;
  slug: string;
}

export interface FeaturedMovie {
  _id: string;
  name: string;
  origin_name: string;
  content: string;
  thumb_url: string;
  poster_url: string;
  rating?: number;
  year?: number;
  time?: string;
  quality?: string;
  lang?: string;
  category?: Category[];
  country?: Country[];
  episode_current?: string;
  episode_total?: string;
  is_copyright?: boolean;
}

// For the Index page carousel
export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage: string;
  rating: number;
  year: string;
  duration: string;
  genre: string[];
  isNew: boolean;
}

export interface HeroCarouselProps {
  movies: FeaturedMovie[];
}

export interface MovieCardProps {
  title: string;
  subtitle?: string;
  image: string;
  backgroundImage?: string; // Added backgroundImage for thumb_url
  episode?: string;
  rating?: number;
  year?: string;
  duration?: string;
  genre?: string[];
  isNew?: boolean;
  id?: string;
}

export interface MovieSectionProps {
  title: string;
  subtitle?: string;
  movies: Array<{
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    backgroundImage?: string; // Added backgroundImage for thumb_url
    episode?: string;
    rating?: number;
    year?: string;
    duration?: string;
    genre?: string[];
    isNew?: boolean;
  }>;
}

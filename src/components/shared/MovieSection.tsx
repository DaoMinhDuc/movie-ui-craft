
import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface MovieSectionProps {
  title: string;
  subtitle?: string;
  movies: Array<{
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    episode?: string;
    rating?: number;
    year?: string;
    duration?: string;
    genre?: string[];
    isNew?: boolean;
  }>;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, subtitle, movies }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  return (
    <section ref={ref} className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-movie-text mb-1">{title}</h2>
          {subtitle && (
            <p className="text-movie-muted">{subtitle}</p>
          )}
        </div>
        
        <Button variant="ghost" className="text-movie-accent hover:text-movie-accent/80">
          Xem toàn bộ
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {hasIntersected ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
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
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[3/4] bg-gray-800 rounded-xl animate-pulse">
              <div className="w-full h-3/4 bg-gray-700 rounded-t-xl"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieSection;

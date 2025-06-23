
import React from 'react';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Button } from '@/components/ui/button';

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
  return (
    <section className="container mx-auto px-4 py-8">
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
    </section>
  );
};

export default MovieSection;

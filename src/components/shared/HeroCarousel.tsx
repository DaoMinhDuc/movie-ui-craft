import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LazyImage from './LazyImage';
import { HeroCarouselProps } from '@/types/carousel';

const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies }) => {
  return (
    <section className="relative w-full h-screen">
      <Carousel className="h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {movies.map((movie) => (
            <CarouselItem key={movie._id} className="h-full p-0">
              {/* Background Layer */}
              <div className="absolute inset-0 w-full h-full z-0">
                <LazyImage
                  src={movie.thumb_url}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              </div>

              {/* Content Layer */}
              <div className="relative z-10 h-full flex items-center justify-start px-4 md:px-8 lg:px-16">
                <div className="max-w-2xl lg:max-w-3xl space-y-4 md:space-y-6">
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {movie.episode_current && (
                      <Badge className="bg-movie-accent text-white font-semibold px-3 py-1">
                        {movie.episode_current}
                      </Badge>
                    )}
                    {movie.quality && (
                      <Badge variant="outline" className="border-white/30 text-white">
                        {movie.quality}
                      </Badge>
                    )}
                    {movie.lang && (
                      <Badge variant="outline" className="border-white/30 text-white">
                        {movie.lang}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {movie.name}
                    </h1>
                    {movie.origin_name && movie.origin_name !== movie.name && (
                      <p className="text-lg md:text-xl text-gray-300 font-medium">
                        {movie.origin_name}
                      </p>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 md:gap-6 text-white/80">
                    {movie.rating && (
                      <div className="flex items-center gap-1.5">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{movie.rating}</span>
                      </div>
                    )}
                    {movie.year && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-5 w-5" />
                        <span>{movie.year}</span>
                      </div>
                    )}
                    {movie.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-5 w-5" />
                        <span>{movie.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  {movie.category?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.category.map((cat) => (
                        <Badge 
                          key={cat.id} 
                          variant="outline" 
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed line-clamp-3">
                    {movie.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Link to={`/movie/${movie._id}`}>
                      <Button 
                        size="lg" 
                        className="bg-movie-accent hover:bg-movie-accent/90 text-white px-8 py-6 text-lg font-semibold"
                      >
                        <Play className="mr-2 h-5 w-5 fill-white" />
                        Xem ngay
                      </Button>
                    </Link>
                    <Link to={`/movie/${movie._id}`}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                      >
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {movies.map((_, index) => (
            <div 
              key={`indicator-${index}`}
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/80 cursor-pointer transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
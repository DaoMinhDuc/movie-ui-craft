
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
import { Card, CardContent } from "@/components/ui/card";
import LazyImage from './LazyImage';

interface FeaturedMovie {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  rating?: number;
  year?: string;
  duration?: string;
  genre?: string[];
  isNew?: boolean;
}

interface HeroCarouselProps {
  movies: FeaturedMovie[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies }) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="h-full">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="h-full">
              <Card className="h-full border-0 rounded-none bg-transparent">
                <CardContent className="relative h-full p-0">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <LazyImage
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl space-y-6">
                        {/* Badges */}
                        <div className="flex items-center space-x-3">
                          {movie.isNew && (
                            <Badge className="bg-movie-accent text-white font-semibold px-3 py-1">
                              MỚI CẬP NHẬT
                            </Badge>
                          )}
                          {movie.genre && movie.genre.length > 0 && (
                            <Badge variant="outline" className="border-white/30 text-white">
                              {movie.genre[0]}
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            {movie.title}
                          </h1>
                          {movie.subtitle && (
                            <p className="text-xl text-gray-300 font-medium">
                              {movie.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center space-x-6 text-white/80">
                          {movie.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold">{movie.rating}</span>
                            </div>
                          )}
                          {movie.year && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-5 w-5" />
                              <span>{movie.year}</span>
                            </div>
                          )}
                          {movie.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-5 w-5" />
                              <span>{movie.duration}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-200 text-lg leading-relaxed line-clamp-3">
                          {movie.description}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 pt-4">
                          <Link to={`/movie/${movie.id}`}>
                            <Button size="lg" className="bg-movie-accent hover:bg-movie-accent/90 text-white px-8 py-3 text-lg font-semibold">
                              <Play className="mr-2 h-5 w-5 fill-white" />
                              Xem ngay
                            </Button>
                          </Link>
                          <Link to={`/movie/${movie.id}`}>
                            <Button 
                              variant="outline" 
                              size="lg" 
                              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
                            >
                              Chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation */}
        <CarouselPrevious className="left-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
        <CarouselNext className="right-4 bg-black/50 border-white/20 text-white hover:bg-black/70" />
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {movies.map((_, index) => (
            <div key={index} className="w-2 h-2 bg-white/50 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;


import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MovieCardProps } from '@/types/carousel';

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  subtitle,
  image,
  backgroundImage,
  episode,
  rating,
  year,
  duration,
  genre,
  isNew = false,
  id = '1'
}) => {
  // Use backgroundImage (thumb_url) if available, otherwise fallback to image (poster_url)
  const displayImage = backgroundImage || image;
  return (
    <Link to={`/movie/${id}`}>
      <div className="group relative bg-movie-card rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={displayImage} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-movie-accent/90 rounded-full p-3">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>

          {/* Episode Badge */}
          {episode && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-movie-accent text-white font-medium">
                {episode}
              </Badge>
            </div>
          )}

          {/* New Badge */}
          {isNew && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-orange-500 text-white font-medium">
                NEW
              </Badge>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/60 px-2 py-1 rounded">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-medium">{rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-movie-text font-semibold text-lg mb-1 line-clamp-1 group-hover:text-movie-accent transition-colors">
            {title}
          </h3>
          
          {subtitle && (
            <p className="text-movie-muted text-sm mb-2 line-clamp-1">
              {subtitle}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-movie-muted">
            <div className="flex items-center space-x-2">
              {year && <span>{year}</span>}
              {duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
            
            {genre && genre.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {genre.slice(0, 2).map((g, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-movie-accent/30 text-movie-muted">
                    {g}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

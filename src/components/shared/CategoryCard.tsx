
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  color: string;
  textColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  color, 
  textColor = "text-white" 
}) => {
  return (
    <div 
      className={`${color} rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-semibold ${textColor} mb-2`}>
            {title}
          </h3>
          <p className={`text-sm ${textColor} opacity-90 flex items-center`}>
            {description}
            <ChevronRight className="ml-2 h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

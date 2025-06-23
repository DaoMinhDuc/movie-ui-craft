
import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryGrid = () => {
  const categories = [
    {
      title: "Marvel",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      title: "4K",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      title: "Sitcom",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      title: "Lồng Tiếng Cực Mạnh",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      title: "Xuyên Không",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-orange-500 to-orange-700"
    },
    {
      title: "Cổ Trang",
      description: "Xem chủ đề",
      color: "bg-gradient-to-br from-red-500 to-red-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-movie-text mb-2">Chủ đề phim</h2>
        <p className="text-movie-muted">Khám phá các thể loại phim hot nhất</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            color={category.color}
          />
        ))}
        
        {/* More Categories Button */}
        <div className="bg-movie-card border-2 border-dashed border-movie-accent/30 rounded-xl p-6 cursor-pointer hover:border-movie-accent/60 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-movie-accent mb-2">+4</div>
            <p className="text-sm text-movie-muted">chủ đề</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;

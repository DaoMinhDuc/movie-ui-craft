
import React from 'react';
import { Search, User, Menu, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-movie-bg border-b border-movie-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-movie-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-movie-text">RoPhim</h1>
              <p className="text-xs text-movie-muted">Phim hay có đó</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/category/phim-bo" className="text-movie-text hover:text-movie-accent transition-colors">
              Phim Bộ
            </Link>
            <Link to="/category/phim-le" className="text-movie-text hover:text-movie-accent transition-colors">
              Phim Lẻ
            </Link>
            <a href="#xem-chung" className="text-movie-text hover:text-movie-accent transition-colors bg-orange-500 px-2 py-1 rounded text-xs font-medium">
              NEW
            </a>
            <Link to="/category/phim-han" className="text-movie-text hover:text-movie-accent transition-colors">
              Phim Hàn
            </Link>
            <Link to="/category/phim-trung" className="text-movie-text hover:text-movie-accent transition-colors">
              Phim Trung
            </Link>
            <Link to="/category/phim-my" className="text-movie-text hover:text-movie-accent transition-colors">
              Phim Mỹ
            </Link>
          </nav>

          {/* Search & User */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <Input 
                placeholder="Tìm kiếm phim..." 
                className="bg-movie-card border-movie-card text-movie-text placeholder:text-movie-muted w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
            </div>
            
            <Button size="icon" variant="ghost" className="text-movie-text hover:text-movie-accent">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Thành viên</span>
            </Button>
            
            <Button size="icon" variant="ghost" className="md:hidden text-movie-text">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

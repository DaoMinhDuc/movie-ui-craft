
import React, { useState, useEffect } from 'react';
import { Search, User, Menu, Bell, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`border-b border-movie-card sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-movie-bg/95 backdrop-blur-md' 
        : 'bg-transparent'
    }`}>
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
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex relative">
              <Input 
                placeholder="Tìm kiếm phim..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-movie-card border-movie-card text-movie-text placeholder:text-movie-muted w-64 pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3 text-movie-muted hover:text-movie-accent"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            {/* Mobile Search */}
            <Link to="/search" className="sm:hidden">
              <Button size="icon" variant="ghost" className="text-movie-text hover:text-movie-accent">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Notifications */}
            {user && (
              <Button size="icon" variant="ghost" className="text-movie-text hover:text-movie-accent">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-movie-accent text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-movie-card border-movie-card" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium text-movie-text">{user.name}</p>
                    <p className="text-xs text-movie-muted">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-movie-card" />
                  <DropdownMenuItem className="text-movie-text hover:bg-movie-bg">
                    <User className="mr-2 h-4 w-4" />
                    <span>Hồ sơ</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-movie-text hover:bg-movie-bg">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Thông báo</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-movie-card" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-movie-bg hover:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-movie-accent hover:bg-movie-accent/90 text-white">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Thành viên</span>
                </Button>
              </Link>
            )}
            
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

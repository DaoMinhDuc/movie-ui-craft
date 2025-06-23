
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng bạn quay trở lại"
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Lỗi",
            description: "Mật khẩu xác nhận không khớp",
            variant: "destructive"
          });
          return;
        }
        await register(formData.name, formData.email, formData.password);
        toast({
          title: "Đăng ký thành công!",
          description: "Tài khoản của bạn đã được tạo"
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-movie-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-movie-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-movie-text">RoPhim</h1>
              <p className="text-sm text-movie-muted">Phim hay có đó</p>
            </div>
          </Link>
        </div>

        <Card className="bg-movie-card border-movie-card">
          <CardHeader className="text-center">
            <CardTitle className="text-movie-text">
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </CardTitle>
            <CardDescription className="text-movie-muted">
              {isLogin 
                ? 'Đăng nhập để trải nghiệm đầy đủ tính năng' 
                : 'Tạo tài khoản mới để bắt đầu'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-movie-text">Họ tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-movie-bg border-movie-card text-movie-text pl-10"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-movie-text">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-movie-bg border-movie-card text-movie-text pl-10"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-movie-text">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-movie-bg border-movie-card text-movie-text pl-10 pr-10"
                    placeholder="Nhập mật khẩu"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-movie-muted hover:text-movie-text"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-movie-text">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-movie-muted" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="bg-movie-bg border-movie-card text-movie-text pl-10"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-movie-accent hover:bg-movie-accent/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-movie-muted">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <Button
                  variant="link"
                  className="text-movie-accent hover:text-movie-accent/80 p-0 ml-1"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

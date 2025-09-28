import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Zap, Globe, BookOpen, Telescope } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Telescope },
    { path: '/simulator', label: 'Asteroid Simulator', icon: Zap },
    { path: '/solar-system', label: 'Solar System 3D', icon: Globe },
    { path: '/education', label: 'Educational Hub', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Telescope className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Asteroid Explorer
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "cosmic" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={path} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
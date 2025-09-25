import { useState } from 'react';
import { Home, Users, Quote, Info, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'philosophers', label: 'Philosophers', icon: Users },
    { id: 'quotes', label: 'Quotes', icon: Quote },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="bg-amber-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange('home')}>
              <span className="text-2xl font-bold text-amber-100 flex items-center gap-2">
                <Home className="w-6 h-6" />
                Philosophia
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 transition-colors duration-200",
                    currentPage === item.id
                      ? 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                      : 'text-amber-200 hover:bg-amber-800 hover:text-amber-100'
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-amber-200 hover:text-amber-100 hover:bg-amber-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start flex items-center space-x-2 transition-colors duration-200",
                      currentPage === item.id
                        ? 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                        : 'text-amber-200 hover:bg-amber-800 hover:text-amber-100'
                    )}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
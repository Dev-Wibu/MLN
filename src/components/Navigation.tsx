import { Button } from "@/components/ui/button";
import { BookOpen, Home, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "theory", label: "Lý thuyết", icon: BookOpen },
  ];

  return (
    <nav className="bg-red-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer">
              <span className="text-2xl font-bold text-red-100 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                CNXHKH
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={item.id === "home" ? "default" : "ghost"}
                  className="flex items-center space-x-2 transition-colors duration-200 text-red-100 hover:bg-red-800"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-red-200 hover:text-red-100 hover:bg-red-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={item.id === "home" ? "default" : "ghost"}
                    className="w-full justify-start flex items-center space-x-2 transition-colors duration-200 text-red-100 hover:bg-red-800"
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

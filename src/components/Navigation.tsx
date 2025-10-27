import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, Brain, Gamepad, HelpCircle, Home, Menu, Users, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "theory", label: "Lý thuyết Lenin", icon: BookOpen },
    { id: "exploitation", label: "Phân tích Big Tech", icon: Users },
    { id: "example", label: "Tác động", icon: Menu },
    { id: "scrollytelling", label: "GAME", icon: Gamepad },
    { id: "about", label: "Định hướng", icon: HelpCircle },
  ];

  return (
    <nav className="bg-blue-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onPageChange("home")}>
              <span className="text-2xl font-bold text-blue-100 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Độc quyền AI
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
                  onClick={() => onPageChange(item.id)}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 transition-colors duration-200",
                    currentPage === item.id ? "bg-blue-700 text-blue-100 hover:bg-blue-600" : "text-blue-200 hover:bg-blue-800 hover:text-blue-100"
                  )}
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
              className="text-blue-200 hover:text-blue-100 hover:bg-blue-800"
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
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start flex items-center space-x-2 transition-colors duration-200",
                      currentPage === item.id ? "bg-blue-700 text-blue-100 hover:bg-blue-600" : "text-blue-200 hover:bg-blue-800 hover:text-blue-100"
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

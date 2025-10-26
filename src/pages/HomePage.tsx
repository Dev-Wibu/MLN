import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Brain, Play, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage = ({ onPageChange }: HomePageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white">
      {/* Hero Section - Intro */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl md:text-7xl font-bold text-blue-900 mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Độc quyền AI <br />
            <span className="text-blue-600">Chủ nghĩa tư bản công nghệ mới</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-blue-700 mb-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Khám phá sự thật về "độc quyền công nghệ" trong kỷ nguyên AI. OpenAI, Google, Nvidia... đang tạo ra một hình thức độc quyền mới theo đúng lý thuyết của V.I. Lenin?
          </p>

          {/* Animated Visual */}
          <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="relative max-w-2xl mx-auto h-64 flex items-center justify-center">
              {/* Freelancer icon in center */}
              <div className="absolute z-10 bg-blue-200 rounded-full p-6 shadow-lg">
                <Brain className="w-12 h-12 text-blue-800" />
              </div>

              {/* Surrounding elements that appear progressively */}
              <div className={`absolute transition-all duration-1000 ${animationStep >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                <div className="absolute -top-20 -left-20 bg-red-200 rounded-full p-4 shadow-md">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <div className="absolute -top-20 -right-20 bg-blue-200 rounded-full p-4 shadow-md">
                  <AlertTriangle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="absolute -bottom-20 -left-20 bg-purple-200 rounded-full p-4 shadow-md">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute -bottom-20 -right-20 bg-green-200 rounded-full p-4 shadow-md">
                  <Play className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Connecting lines */}
              <div className={`absolute inset-0 transition-all duration-1000 delay-500 ${animationStep >= 2 ? "opacity-60" : "opacity-0"}`}>
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  <line x1="150" y1="100" x2="100" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="150" y1="100" x2="200" y2="50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="150" y1="100" x2="100" y2="150" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="150" y1="100" x2="200" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              {/* Text labels */}
              <div
                className={`absolute -top-32 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
                  animationStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">AI Chips • Cloud Computing • Big Data</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button
              onClick={() => onPageChange("theory")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Khám phá sự thật
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            {
              title: "Lý thuyết Lenin",
              description: "Đặc điểm kinh tế của độc quyền và chủ nghĩa đế quốc",
              icon: Brain,
              page: "theory",
              color: "bg-blue-100 text-blue-800",
            },
            {
              title: "Phân tích Big Tech",
              description: "OpenAI, Google, Nvidia và biểu hiện độc quyền AI",
              icon: AlertTriangle,
              page: "exploitation",
              color: "bg-red-100 text-red-800",
            },
            {
              title: "Tác động toàn diện",
              description: "Ảnh hưởng đến lao động, startup, dữ liệu cá nhân",
              icon: TrendingUp,
              page: "example",
              color: "bg-green-100 text-green-800",
            },
            {
              title: "Trò chuyện AI",
              description: "Thảo luận với AI về triết học và xã hội",
              icon: Play,
              page: "chat",
              color: "bg-purple-100 text-purple-800",
            },
          ].map((item, index) => (
            <Card
              key={`home-card-${item.title}`}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-blue-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              onClick={() => onPageChange(item.page)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg text-blue-900 mb-2">{item.title}</CardTitle>
                <p className="text-sm text-blue-700">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-blue-700 mb-6 text-lg">"Độc quyền là giai đoạn cao nhất của chủ nghĩa tư bản." - V.I. Lenin</p>
          <p className="text-blue-600 text-sm max-w-2xl mx-auto">
            Hiểu để không ảo tưởng về "tự do công nghệ". Khám phá cách thức các tập đoàn công nghệ lớn đang tạo ra một hình thức độc quyền mới và vai trò của bạn trong đó.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

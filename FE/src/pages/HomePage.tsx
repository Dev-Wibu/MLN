import { useState, useEffect } from 'react';
import { AlertTriangle, Loader2, Zap, Brain, User, MapPin, Lightbulb, BookOpen, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Quote, Philosopher } from '../types';
import { philosophyApi } from '../services/api';

const HomePage = () => {
  const [featuredQuotes, setFeaturedQuotes] = useState<Quote[]>([]);
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quotesData, philosophersData] = await Promise.all([
          philosophyApi.getFeaturedQuotes(),
          philosophyApi.getPhilosophers(),
        ]);
        setFeaturedQuotes(quotesData);
        setPhilosophers(philosophersData);
      } catch (err) {
        setError('Failed to load content. Please ensure the backend server is running.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100">
        <div className="text-center">
          <Loader2 className="animate-spin h-32 w-32 text-amber-600 mx-auto" />
          <p className="text-amber-800 mt-4 text-xl">Loading philosophical wisdom...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100">
        <div className="text-center text-amber-800">
          <AlertTriangle className="w-16 h-16 mb-4 mx-auto text-red-600" />
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-amber-100 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-600">
              Philosophia
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore the profound wisdom of history's greatest thinkers. Dive into the minds that shaped our understanding 
            of existence, society, and human nature.
          </p>
          <div className="flex justify-center items-center space-x-4 text-amber-700">
            <div className="h-1 w-16 bg-amber-700"></div>
            <Zap className="w-6 h-6" />
            <div className="h-1 w-16 bg-amber-700"></div>
          </div>
        </div>
      </section>

      {/* Featured Quotes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-16">
            Words That Changed the World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredQuotes.map((quote, index) => {
              const philosopher = philosophers.find(p => p.name === quote.author);
              const colors = [
                'from-red-700 to-red-900',
                'from-blue-700 to-blue-900', 
                'from-green-700 to-green-900'
              ];
              
              return (
                <Card
                  key={quote.id}
                  className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-300 border-0 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
                  <CardContent className="relative p-8 h-full min-h-[400px] flex flex-col justify-between text-white">
                    <div>
                      <div className="text-6xl mb-4 opacity-60 text-amber-100">"</div>
                      <blockquote className="text-lg font-medium leading-relaxed mb-6">
                        {quote.text}
                      </blockquote>
                    </div>
                    <div className="border-t border-amber-100/20 pt-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-amber-100/20 text-amber-100">
                            <Brain className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-amber-100">{quote.author}</p>
                          <p className="text-sm text-amber-200">
                            {philosopher?.birthYear} - {philosopher?.deathYear}
                          </p>
                          <Badge variant="secondary" className="text-xs mt-1 bg-amber-100/20 text-amber-300 border-0">
                            {quote.context}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophers Preview Section */}
      <section className="py-20 bg-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-16">
            Meet the Great Minds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophers.map((philosopher) => (
              <Card
                key={philosopher.id}
                className="group cursor-pointer border border-amber-800/30 bg-amber-800/20 backdrop-blur-sm hover:bg-amber-700/30 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-gradient-to-br from-amber-600 to-yellow-600 text-amber-100">
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-bold text-amber-900 mb-2">{philosopher.name}</CardTitle>
                  <p className="text-amber-700 mb-4">
                    {philosopher.birthYear} - {philosopher.deathYear}
                  </p>
                  <p className="text-amber-800 leading-relaxed group-hover:text-amber-900 transition-colors mb-4">
                    {philosopher.description}
                  </p>
                  <Badge variant="outline" className="text-amber-700 group-hover:text-amber-800 transition-colors border-amber-700">
                    <MapPin className="w-4 h-4 mr-1" />
                    {philosopher.nationality}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">
            Begin Your Philosophical Journey
          </h2>
          <p className="text-xl text-amber-800 mb-8">
            Explore the depths of human thought and discover timeless wisdom that continues to shape our world today.
          </p>
          <div className="space-y-4 text-amber-800">
            <p className="flex items-center justify-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Discover profound insights from history's greatest thinkers</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Explore comprehensive collections of philosophical quotes</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Understand how philosophy continues to influence our modern world</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import { useState, useEffect } from 'react';
import { AlertTriangle, Loader2, Search, Users as UsersIcon, Flag, Building, Brain } from 'lucide-react';
import type { Quote } from '../types';
import { philosophyApi } from '../services/api';

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const data = await philosophyApi.getQuotes();
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (err) {
        setError('Failed to load quotes');
        console.error('Error fetching quotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    let filtered = quotes;

    // Filter by author
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(quote => quote.author === selectedAuthor);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.context.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuotes(filtered);
  }, [quotes, selectedAuthor, searchTerm]);

  const authors = ['all', ...Array.from(new Set(quotes.map(quote => quote.author)))];

  const getAuthorIcon = (author: string) => {
    switch (author) {
      case 'Karl Marx': return UsersIcon;
      case 'Vladimir Lenin': return Flag;
      case 'Socrates': return Building;
      default: return Brain;
    }
  };

  const getQuoteBackground = (author: string) => {
    switch (author) {
      case 'Karl Marx': return 'from-red-800/30 to-red-900/30 border-red-700/50';
      case 'Vladimir Lenin': return 'from-blue-800/30 to-blue-900/30 border-blue-700/50';
      case 'Socrates': return 'from-green-800/30 to-green-900/30 border-green-700/50';
      default: return 'from-purple-800/30 to-purple-900/30 border-purple-700/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-32 w-32 text-amber-600 mx-auto" />
          <p className="text-amber-800 mt-4 text-xl">Loading wisdom...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-amber-800">
          <AlertTriangle className="w-16 h-16 mb-4 mx-auto text-red-600" />
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">Philosophical Quotes</h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto mb-8">
            Discover profound insights and timeless wisdom from history's greatest philosophical minds.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-amber-900 text-sm font-medium mb-2">Search Quotes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-700" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by text, author, or context..."
                  className="w-full pl-10 pr-4 py-2 bg-amber-100/50 border border-amber-300 rounded-lg text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Author Filter */}
            <div className="md:w-64">
              <label className="block text-amber-900 text-sm font-medium mb-2">Filter by Author</label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-amber-100/50 border border-amber-300 rounded-lg text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              >
                {authors.map((author) => (
                  <option key={author} value={author} className="bg-amber-100">
                    {author === 'all' ? 'All Authors' : author}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-amber-800">
            <p>
              Showing {filteredQuotes.length} of {quotes.length} quotes
            </p>
            {(searchTerm || selectedAuthor !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAuthor('all');
                }}
                className="text-amber-700 hover:text-amber-800 text-sm underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredQuotes.map((quote) => {
            const IconComponent = getAuthorIcon(quote.author);
            return (
              <div
                key={quote.id}
                className={`bg-gradient-to-br ${getQuoteBackground(quote.author)} backdrop-blur-sm border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div className="flex flex-col h-full">
                  {/* Quote Text */}
                  <div className="flex-1 mb-6">
                    <div className="text-4xl text-amber-700 mb-4 opacity-60">"</div>
                    <blockquote className="text-lg text-amber-100 leading-relaxed font-medium">
                      {quote.text}
                    </blockquote>
                    <div className="text-4xl text-amber-700 text-right opacity-60 -mt-2">"</div>
                  </div>

                  {/* Quote Attribution */}
                  <div className="border-t border-amber-100/20 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-100/20 rounded-full flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-amber-100" />
                        </div>
                        <div>
                          <p className="font-bold text-amber-100">{quote.author}</p>
                          <p className="text-sm text-amber-200">{quote.context}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-amber-100/10 rounded-full text-xs text-amber-200">
                          {quote.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredQuotes.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto mb-4 text-amber-700" />
            <h3 className="text-2xl font-bold text-amber-900 mb-4">No quotes found</h3>
            <p className="text-amber-800 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedAuthor('all');
              }}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-amber-100 rounded-lg transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
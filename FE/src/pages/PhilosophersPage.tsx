import { useState, useEffect } from 'react';
import { AlertTriangle, Loader2, X, Globe, BarChart3, DollarSign, Users as UsersIcon, Flag, BookOpen, Zap, HelpCircle, Target, Building } from 'lucide-react';
import type { Philosopher } from '../types';
import { philosophyApi } from '../services/api';

const PhilosophersPage = () => {
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([]);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhilosophers = async () => {
      try {
        setLoading(true);
        const data = await philosophyApi.getPhilosophers();
        setPhilosophers(data);
      } catch (err) {
        setError('Failed to load philosophers');
        console.error('Error fetching philosophers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhilosophers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-32 w-32 text-amber-600 mx-auto" />
          <p className="text-amber-800 mt-4 text-xl">Loading great minds...</p>
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">Great Philosophers</h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Meet the brilliant minds who shaped human thought and continue to influence our understanding 
            of existence, morality, and society.
          </p>
        </div>

        {/* Philosophers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {philosophers.map((philosopher) => (
            <div
              key={philosopher.id}
              onClick={() => setSelectedPhilosopher(philosopher)}
              className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-6 hover:bg-amber-700/30 transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {philosopher.name === 'Karl Marx' ? (
                    <UsersIcon className="w-12 h-12 text-amber-100" />
                  ) : philosopher.name === 'Vladimir Lenin' ? (
                    <Flag className="w-12 h-12 text-amber-100" />
                  ) : (
                    <Building className="w-12 h-12 text-amber-100" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{philosopher.name}</h3>
                <p className="text-amber-700 mb-4 font-semibold">
                  {philosopher.birthYear} - {philosopher.deathYear}
                </p>
                <p className="text-amber-800 leading-relaxed mb-4">
                  {philosopher.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{philosopher.nationality}</span>
                </div>
                <div className="mt-4 text-amber-700 group-hover:text-amber-800 transition-colors">
                  <span className="text-sm">Click to learn more →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Philosopher Detail Modal */}
        {selectedPhilosopher && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-300">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center">
                      {selectedPhilosopher.name === 'Karl Marx' ? (
                        <UsersIcon className="w-6 h-6 text-amber-100" />
                      ) : selectedPhilosopher.name === 'Vladimir Lenin' ? (
                        <Flag className="w-6 h-6 text-amber-100" />
                      ) : (
                        <Building className="w-6 h-6 text-amber-100" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-amber-900">{selectedPhilosopher.name}</h2>
                      <p className="text-amber-700 text-lg">
                        {selectedPhilosopher.birthYear} - {selectedPhilosopher.deathYear}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPhilosopher(null)}
                    className="text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">Biography</h3>
                    <p className="text-amber-900 leading-relaxed">
                      {selectedPhilosopher.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">Background</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-amber-200/50 rounded-lg p-4">
                        <p className="text-amber-700 text-sm">Nationality</p>
                        <p className="text-amber-900 font-semibold">{selectedPhilosopher.nationality}</p>
                      </div>
                      <div className="bg-amber-200/50 rounded-lg p-4">
                        <p className="text-amber-700 text-sm">Period</p>
                        <p className="text-amber-900 font-semibold">
                          {selectedPhilosopher.birthYear} - {selectedPhilosopher.deathYear}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">Key Contributions</h3>
                    <div className="space-y-3">
                      {selectedPhilosopher.name === 'Karl Marx' && (
                        <>
                          <div className="flex items-start space-x-3">
                            <BarChart3 className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Developed the theory of historical materialism and class struggle</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <DollarSign className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Critiqued capitalist economic systems in "Das Kapital"</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <UsersIcon className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Co-authored "The Communist Manifesto" with Friedrich Engels</p>
                          </div>
                        </>
                      )}
                      {selectedPhilosopher.name === 'Vladimir Lenin' && (
                        <>
                          <div className="flex items-start space-x-3">
                            <Flag className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Led the Russian Revolution and established the Soviet state</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <BookOpen className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Developed Marxist-Leninist political theory</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Advocated for revolutionary praxis and vanguard party theory</p>
                          </div>
                        </>
                      )}
                      {selectedPhilosopher.name === 'Socrates' && (
                        <>
                          <div className="flex items-start space-x-3">
                            <HelpCircle className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Developed the Socratic method of questioning</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Target className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Emphasized the importance of self-knowledge and ethical living</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Building className="w-5 h-5 text-amber-700 mt-1" />
                            <p className="text-amber-900">Founded Western philosophy and influenced Plato and Aristotle</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhilosophersPage;
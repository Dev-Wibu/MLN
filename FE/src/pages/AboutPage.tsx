import { Target, Users as UsersIcon, Flag, Building, Zap, Atom, Palette, Coffee, RefreshCw, Database, BookOpen, Search, Smartphone, Star, Book, Brain, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">About Philosophia</h1>
          <p className="text-xl text-amber-800">
            Exploring the wisdom of ages through modern technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Mission</h2>
              <p className="text-amber-800 leading-relaxed text-lg">
                Philosophia aims to make the profound wisdom of history's greatest thinkers accessible to everyone. 
                We believe that philosophical insights can guide us through life's complexities and help us understand 
                our place in the world. Through our carefully curated collection of quotes and biographical information, 
                we hope to inspire critical thinking and meaningful reflection.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Philosophers Section */}
        <div className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Featured Thinkers</h2>
          
          <div className="space-y-8">
            {/* Karl Marx */}
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-red-800/30 rounded-xl border border-red-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center flex-shrink-0">
                <UsersIcon className="w-8 h-8 text-red-100" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Karl Marx (1818-1883)</h3>
                <p className="text-amber-800 leading-relaxed">
                  A revolutionary thinker who fundamentally changed how we understand economics, society, and history. 
                  His analysis of capitalism and advocacy for workers' rights continues to influence political and 
                  economic thought worldwide. Marx's concept of historical materialism provides a framework for 
                  understanding social change and class struggle.
                </p>
              </div>
            </div>

            {/* Vladimir Lenin */}
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-blue-800/30 rounded-xl border border-blue-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Flag className="w-8 h-8 text-blue-100" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Vladimir Lenin (1870-1924)</h3>
                <p className="text-amber-800 leading-relaxed">
                  A revolutionary leader and political theorist who transformed Marxist ideas into practical action. 
                  Lenin's contributions to political theory, particularly his ideas about the vanguard party and 
                  revolutionary strategy, shaped the course of 20th-century history. His emphasis on the connection 
                  between theory and practice remains influential in political movements today.
                </p>
              </div>
            </div>

            {/* Socrates */}
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-green-800/30 rounded-xl border border-green-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Building className="w-8 h-8 text-green-100" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Socrates (470-399 BC)</h3>
                <p className="text-amber-800 leading-relaxed">
                  Often considered the father of Western philosophy, Socrates revolutionized thinking through his 
                  method of questioning everything. His emphasis on self-knowledge, ethical living, and the pursuit 
                  of wisdom laid the foundation for all subsequent philosophical inquiry. Though he wrote nothing 
                  himself, his ideas live on through the works of his student Plato.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-purple-100" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Modern Technology Meets Ancient Wisdom</h2>
              <p className="text-amber-800 leading-relaxed text-lg mb-6">
                Philosophia is built using cutting-edge web technologies to deliver timeless philosophical content. 
                Our platform combines a modern React frontend with a robust Spring Boot backend, creating a seamless 
                and responsive user experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-amber-700">Frontend Technologies</h3>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-center space-x-2">
                      <Atom className="w-4 h-4 text-blue-600" />
                      <span>React with TypeScript for type safety</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Palette className="w-4 h-4 text-cyan-600" />
                      <span>Tailwind CSS for beautiful, responsive design</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span>Vite for fast development and building</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-amber-700">Backend Technologies</h3>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-center space-x-2">
                      <Coffee className="w-4 h-4 text-green-600" />
                      <span>Spring Boot with Java 17</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                      <span>RESTful API architecture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-purple-600" />
                      <span>In-memory data storage for quick access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-amber-800/20 backdrop-blur-sm border border-amber-800/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-100" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Curated Content</h3>
              <p className="text-amber-800">
                Carefully selected quotes and biographical information from verified historical sources.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-green-100" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Smart Search</h3>
              <p className="text-amber-800">
                Advanced filtering and search capabilities to find exactly what you're looking for.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-purple-100" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">Responsive Design</h3>
              <p className="text-amber-800">
                Beautiful, intuitive interface that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">Begin Your Philosophical Journey</h2>
          <p className="text-xl text-amber-800 mb-8">
            Explore the wisdom of ages and discover insights that can transform your understanding of the world.
          </p>
          <div className="flex justify-center space-x-4">
            <Star className="w-10 h-10 text-amber-700" />
            <Book className="w-10 h-10 text-amber-700" />
            <Brain className="w-10 h-10 text-amber-700" />
            <Lightbulb className="w-10 h-10 text-amber-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PhilosophersPage from './pages/PhilosophersPage';
import QuotesPage from './pages/QuotesPage';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import philosophersImage from './assets/philosophers.jpg';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'philosophers':
        return <PhilosophersPage />;
      case 'quotes':
        return <QuotesPage />;
      case 'chat':
        return <ChatPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 248, 220, 0.85), rgba(245, 222, 179, 0.85)), url(${philosophersImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;

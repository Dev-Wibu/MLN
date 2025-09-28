import { useState } from "react";
import philosophersImage from "./assets/philosophers.jpg";
import Navigation from "./components/Navigation";
import AboutPage from "./pages/AboutPage";
import ChatPage from "./pages/ChatPage";
import ExamplePage from "./pages/ExamplePage";
import ExploitationPage from "./pages/ExploitationPage";
import HomePage from "./pages/HomePage";
import TheoryPage from "./pages/TheoryPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />;
      case "theory":
        return <TheoryPage />;
      case "exploitation":
        return <ExploitationPage />;
      case "chat":
        return <ChatPage />;
      case "example":
        return <ExamplePage />;
      case "about":
        return <AboutPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-100 relative"
      style={{
        backgroundImage: ` url(${philosophersImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;

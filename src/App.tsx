import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import HomePage from "./pages/HomePage";
// @ts-ignore
import GamesPage from "./pages/GamesPage";
import FloatingAIChat from "./components/FloatingAIChat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
      <FloatingAIChat />
    </Router>
  );
};

export default App;

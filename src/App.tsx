import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import HomePage from "./pages/HomePage";
// @ts-ignore
import GamesPage from "./pages/GamesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
    </Router>
  );
};

export default App;

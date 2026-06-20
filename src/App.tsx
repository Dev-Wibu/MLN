import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <Navigation />
      <HomePage />
    </div>
  );
};

export default App;

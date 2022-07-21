import "./App.css";
import "./fonts.css";
import Navigation from "./components/Navigation";
import Results from "./Pages/Results";
import MovieInfo from "./Pages/MovieInfo";
import Discover from "./Pages/Discover";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/discover" element={<Discover />} />

          <Route path="/movie/:id" element={<MovieInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";

function App() {
  return (
    <Router basename="/apple_music">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<Podcast />} />
        <Route path="/podcast/:id/episode/:id" element={<Episode />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

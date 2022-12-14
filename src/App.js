import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Podcasts from "./pages/Podcasts";
import Episode from "./pages/Episode";
import { ContextProvider } from "./context/PodcastContext";

function App() {
  return (
    <ContextProvider>
      <Router basename="/apple_music">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:id" element={<Podcasts />} />
          <Route path="/podcast/:id/episode/:id" element={<Episode />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;

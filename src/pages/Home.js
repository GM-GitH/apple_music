import { useState, useEffect } from "react";
import HomeCards from "../components/HomeCards";
import HomeFilter from "../components/HomeFilter";
import Navbar from "../components/Navbar";

function Home() {
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const now = new Date().getTime();
    const stored = localStorage.getItem("StoredPodcasts");
    if (!stored || now > JSON.parse(stored).expiry) {
      fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
        .then((res) => res.json())
        .then(
          (result) => {
            setLoaded(true);
            const topPodcasts = {
              value: result.feed.entry,
              expiry: now + 1000 * 60 * 60 * 24,
            };
            localStorage.setItem("StoredPodcasts", JSON.stringify(topPodcasts));
            setItems(result.feed.entry);
          },
          (error) => {
            setLoaded(true);
            setError(error);
          }
        );
    } else {
      setLoaded(true);
      setItems(JSON.parse(stored).value);
    }
  }, []);

  if (error) {
    return console.log(error.message);
  } else {
    return (
      <>
        <Navbar loaded={loaded} />
        <div className="home">
          <HomeFilter query={query} setQuery={setQuery} podcastsLenght={items.length} />
          <HomeCards items={items} query={query} />
        </div>
      </>
    );
  }
}

export default Home;

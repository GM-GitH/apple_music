import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PodcastCounter from "../components/PodcastCounter";
import PodcastLeftCard from "../components/PodcastLeftCard";
import PodcastTable from "../components/PodcastTable";
import { PodcastContext } from "../context/PodcastContext";

function Podcast() {
  const { podcast } = useContext(PodcastContext);
  const { id } = useParams();
  const stored = localStorage.getItem("StoredPodcasts");
  const getStoredPodcast = JSON.parse(stored).value.filter((item) => item.id.attributes["im:id"] === id);
  const [episodes, setEpisodes] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const now = new Date().getTime();
    const storedID = localStorage.getItem(id);
    const storedPodcaster = JSON.parse(localStorage.getItem("PodcastData")).id;
    const lookup = `https://itunes.apple.com/lookup?id=${id}`;

    if (!storedID || now > JSON.parse(storedID).expiry) {
      fetch(lookup)
        .then((res) => res.json())
        .then((result) => {
          const api = `https://api.rss2json.com/v1/api.json?rss_url=${result.results[0].feedUrl}`;
          fetch(api)
            .then((res) => res.json())
            .then((result) => {
              const episodes = {
                value: result.items,
                expiry: now + 1000 * 60 * 60 * 24,
              };
              localStorage.setItem(id, JSON.stringify(episodes));
              setEpisodes(result.items);
              localStorage.setItem("PodcastData", JSON.stringify(podcast));
              setLoaded(true);
            });
        });
    } else if (storedPodcaster !== id) {
      localStorage.setItem("PodcastData", JSON.stringify(podcast));
      setEpisodes(JSON.parse(storedID).value);
      setLoaded(true);
    } else {
      setEpisodes(JSON.parse(storedID).value);
      setLoaded(true);
    }
  }, [id, podcast]);

  try {
    return (
      <>
        <Navbar loaded={loaded} />
        <div className="podcast">
          <PodcastLeftCard />
          <div className="podcast__container">
            <PodcastCounter episodesLenght={episodes.length} />
            <PodcastTable episodes={episodes} id={getStoredPodcast[0].id.attributes["im:id"]} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error.message);
    return (
      <>
        <Navbar loaded={loaded} />
        <div className="podcast">
          <PodcastLeftCard />
          <div className="podcast__container">
            <PodcastCounter episodesLenght={0} />
            <p style={{ textAlign: "center" }}>Feed could not be converted, probably not a valid RSS feed.</p>
          </div>
        </div>
      </>
    );
  }
}

export default Podcast;

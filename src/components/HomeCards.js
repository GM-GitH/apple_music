import { useContext, useEffect } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { Link } from "react-router-dom";

function HomeCards({ items, query }) {
  const { podcast, setPodcast, setFilteredTitles } = useContext(PodcastContext);
  const search = (items) => {
    return items.filter((item) =>
      items.some(() => item["im:name"].label.toString().toLowerCase().includes(query) || item["im:artist"].label.toString().toLowerCase().includes(query))
    );
  };
  const titles = search(items).map((item) => {
    const podcastId = item.id.attributes["im:id"];
    const handleClick = () => {
      setPodcast(podcastId, item["im:image"][2].label, item["im:name"].label, item["im:artist"].label, item["summary"].label);
      localStorage.setItem("PodcastData", JSON.stringify(podcast));
    };
    return (
      <div className="home__card" key={item.id.attributes["im:id"]} tabIndex={podcastId}>
        <Link to={`/podcast/${podcastId}`} onClick={handleClick}>
          <img className="home__card__image" src={item["im:image"][2].label} alt="Podcast rounded banner" />
          <h2 className="home__card__title">{item["im:name"].label.toUpperCase()}</h2>
          <h3 className="home__card__author">Author: {item["im:artist"].label}</h3>
        </Link>
      </div>
    );
  });

  useEffect(() => {
    setFilteredTitles(titles.length);
  }, [titles.length]);

  if (titles.length === 0) {
    return <h2 className="home__card__title">No results found</h2>;
  } else {
    return <div className="home">{titles}</div>;
  }
}

export default HomeCards;

import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";

const HomeFilter = ({ query, setQuery }) => {
  const { podcast } = useContext(PodcastContext);
  const titlesQty = podcast.filteredTitles;

  return (
    <div className="home__filter">
      <div className="home__filter__counter">{titlesQty}</div>
      <input className="home__filter__input" type="text" placeholder="Filter podcasts..." defaultValue={query || ""} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
};

export default HomeFilter;

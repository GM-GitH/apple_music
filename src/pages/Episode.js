import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PodcastLeftCard from "../components/PodcastLeftCard";
import { PodcastContext } from "../context/PodcastContext";

function Episode() {
  const [loaded, setLoaded] = useState(false);
  const { podcast } = useContext(PodcastContext);
  const params = useParams();
  const podcaster = podcast.id ?? JSON.parse(localStorage.getItem("PodcastData")).id;
  const episodesList = JSON.parse(localStorage.getItem(podcaster));
  const result = episodesList.value.filter((item) => item.guid.replace(/[:/]/gi, "") === params.id);

  if (!loaded) {
    setLoaded(true);
  } else {
    return (
      <>
        <Navbar loaded={loaded} />
        <PodcastLeftCard />
        <div className="episode__container">
          <h2>{result[0].title}</h2>
          <div dangerouslySetInnerHTML={{ __html: result[0].description }}></div>
          <br />
          <br />
          <audio controls>
            <source src={result[0].enclosure.link} type="audio/mpeg" />
          </audio>
        </div>
      </>
    );
  }
}
export default Episode;

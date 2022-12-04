import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";

function PodcastLeftCard() {
  const { podcast } = useContext(PodcastContext);
  const stored = JSON.parse(localStorage.getItem("PodcastData"));

  return (
    <>
      <div className="podcast__leftcard">
        <img className="podcast__leftcard__image" src={podcast.image ?? stored.image} alt="podcast banner" />
        <div className="podcast__leftcard__text">
          <hr />
          <h4 className="podcast__leftcard__text__name">{podcast.title ?? stored.title}</h4>
          <h5 className="podcast__leftcard__text__artist">by {podcast.artist ?? stored.artist} </h5>
          <hr />
          <h5 className="podcast__leftcard__text__description__title">Description</h5>
          <h5 className="podcast__leftcard__text__description__text">{podcast.description ?? stored.description}</h5>
        </div>
      </div>
    </>
  );
}

export default PodcastLeftCard;

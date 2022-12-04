import { createContext } from "react";
import { useReducer } from "react";
import { PodcastReducer } from "./PodcastReducer";

const initialState = {
  podcast: {
    id: null,
    image: null,
    title: null,
    artist: null,
    description: null,
    filteredTitles: 100,
    loaded: false,
  },
};
export const PodcastContext = createContext(initialState.podcast);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PodcastReducer, initialState);

  function setPodcast(Id, Image, Title, Artist, Description) {
    dispatch({
      type: "SET_PODCAST",
      payload: {
        id: Id,
        image: Image,
        title: Title,
        artist: Artist,
        description: Description,
      },
    });
  }
  function setLoaded(Boolean) {
    dispatch({
      type: "SET_LOADED",
      payload: Boolean,
    });
  }
  function setFilteredTitles(Number) {
    dispatch({
      type: "SET_FILTERED_TITLES",
      payload: Number,
    });
  }

  return (
    <PodcastContext.Provider
      value={{
        podcast: {
          id: state.podcast.id,
          image: state.podcast.image,
          title: state.podcast.title,
          artist: state.podcast.artist,
          description: state.podcast.description,
          filteredTitles: state.podcast.filteredTitles,
          loaded: state.podcast.loaded,
        },
        setPodcast,
        setLoaded,
        setFilteredTitles,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

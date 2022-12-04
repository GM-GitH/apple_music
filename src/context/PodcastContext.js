import { createContext } from "react";
import { useReducer } from "react";
import { PodcastReducer } from "./PodcastReducer";

const initialState = {
  podcast: {
    filteredTitles: 100,
  },
};
export const PodcastContext = createContext(initialState.podcast);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PodcastReducer, initialState);

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
          filteredTitles: state.podcast.filteredTitles,
        },
        setFilteredTitles,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

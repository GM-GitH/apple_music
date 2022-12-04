export function PodcastReducer(state, action) {
  switch (action.type) {
    case "SET_PODCAST":
      return {
        ...state,
        podcast: {
          ...state.podcast,
          id: action.payload.id,
          image: action.payload.image,
          title: action.payload.title,
          artist: action.payload.artist,
          description: action.payload.description,
        },
      };
    case "SET_LOADED":
      return {
        ...state,
        podcast: {
          ...state.podcast,
          loaded: action.payload,
        },
      };
    case "SET_FILTERED_TITLES":
      return {
        ...state,
        podcast: {
          ...state.podcast,
          filteredTitles: action.payload,
        },
      };

    default:
      return state;
  }
}

export function PodcastReducer(state, action) {
  switch (action.type) {
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

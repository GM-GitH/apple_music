import { useNavigate } from "react-router-dom";

function PodcastTable({ episodes, id }) {
  const navigate = useNavigate();
  function toTime(seconds) {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().slice(11, 19);
  }
  const handleEpisodeClick = (e, episodeId) => {
    e.preventDefault();
    navigate(`/podcast/${id}/episode/${episodeId.replace(/[:/]/gi, "")}`);
  };
  const episodesArray = Array.from(episodes);
  const episodesTable = episodesArray.map((item) => {
    const episodeId = item.guid;
    return (
      <tr key={item.guid} onClick={(e) => handleEpisodeClick(e, episodeId)}>
        <td>{item.title}</td>
        <td>{new Date(item.pubDate).toISOString().slice(0, 10)}</td>
        <td>{toTime(item.enclosure.duration)}</td>
      </tr>
    );
  });

  return (
    <div className="podcast__table__container">
      <table className="podcast__table__table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>{episodesTable}</tbody>
      </table>
    </div>
  );
}

export default PodcastTable;

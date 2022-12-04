import { Link } from "react-router-dom";

function Navbar({ loaded }) {
  const loader = () => {
    if (!loaded) {
      return <div className="navbar__loader"></div>;
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link">
        <h2 className="navbar__link__title">Podcaster</h2>
      </Link>
      {loader()}
      <hr />
    </nav>
  );
}

export default Navbar;

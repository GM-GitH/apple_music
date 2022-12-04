import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link">
        <h2 className="navbar__link__title">Podcaster</h2>
      </Link>
      <hr />
    </nav>
  );
}

export default Navbar;

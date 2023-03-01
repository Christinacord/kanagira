import { NavLink } from "react-router-dom";
import { logout } from "./auth";
import { useNavigate } from "react-router-dom";
import { useToken } from "./auth.js";

function Nav() {
  const { token, logout } = useToken();
  const handleClick = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Kanagira
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item list">
              <NavLink
                className="nav-link list-toggle"
                to="/login"
                role="button"
                data-bs-toggle="list"
                aria-expanded="false"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item list">
              <NavLink
                className="nav-link list-toggle"
                to="/signup"
                role="button"
                data-bs-toggle="list"
                aria-expanded="false"
              >
                Sign up
              </NavLink>
            </li>
            <li className="nav-item list">
              <a
                className="nav-link list-toggle"
                data-bs-toggle="list"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Boards
              </a>
              <ul
                className="list-menu list-menu-dark"
                aria-labelledby="navbarDarklistMenuLink"
              >
                <li>
                  <NavLink aria-current="page" to="/boards">
                    My Boards
                  </NavLink>
                </li>
              </ul>
              <ul
                className="list-menu list-menu-dark"
                aria-labelledby="navbarDarklistMenuLink"
              >
                <li>
                  <NavLink aria-current="page" to="/boards/create">
                    Create Board
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item list">
              <a
                className="nav-link list-toggle"
                href="#"
                role="button"
                data-bs-toggle="list"
                aria-expanded="false"
              >
                Issues
              </a>
              <ul
                className="list-menu list-menu-dark"
                aria-labelledby="navbarDarklistMenuLink"
              >
                <li>
                  <NavLink aria-current="page" to="#">
                    Create Issue
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item list">
              <NavLink
                className="nav-link list-toggle"
                href="#"
                role="button"
                data-bs-toggle="list"
                aria-expanded="false"
              >
                Contact US
              </NavLink>
            </li>
            <li className="nav-item list">
              <NavLink
                className="nav-link list-toggle"
                href="#"
                role="button"
                data-bs-toggle="list"
                aria-expanded="false"
              >
                FAQ
              </NavLink>
            </li>
            <li className="nav-item list">
              <button onClick={handleClick}>
                <a
                  className="nav-link list-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="list"
                  aria-expanded="false"
                >
                  Log Out
                </a>
              </button>
              <ul
                className="list-menu list-menu-dark"
                aria-labelledby="navbarDarklistMenuLink"
              >
                <li>
                  <NavLink aria-current="page" to="#">
                    PLACEHOLD
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated, logout } from "../services/authService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to={authenticated ? "/dashboard" : "/login"} className="brand">
          To-Do MERN
        </Link>
        <nav className="nav-links">
          {authenticated ? (
            <>
              <span className="user-pill">{user?.name || "User"}</span>
              {location.pathname !== "/dashboard" && (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

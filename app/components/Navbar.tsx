import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to={auth.isAuthenticated ? "/dashboard" : "/"}>
        <p className="text-2xl font-bold text-gradient">OptiHire</p>
      </Link>

      <div className="flex items-center gap-4">
        {auth.isAuthenticated ? (
          <>
            <span className="text-sm text-dark-200 max-sm:hidden">
              {auth.user?.username ? `Hi, ${auth.user.username}` : ""}
            </span>
            <Link to="/upload" className="primary-button w-fit">
              Upload Resume
            </Link>
            <button
              onClick={auth.signOut}
              className="text-dark-200 font-medium hover:text-[#606beb] transition-colors duration-300 cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-dark-200 font-medium hover:text-[#606beb] transition-colors duration-300"
            >
              Log In
            </Link>
            <Link to="/signup" className="primary-button w-fit">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
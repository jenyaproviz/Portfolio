import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import ToggleTheme from "./ToggleTheme";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isAdmin = Boolean(user?.isAdmin);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeStyles = {
    color: "#fff",
    fontWeight: "bold",
    borderBottom: "2px solid #3b82f6",
    background: "rgba(59,130,246,0.08)",
    borderRadius: "8px",
    padding: "0.25rem 0.75rem",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out of the system");
  };

  // Avatar logic: fallback to initials if no avatar image
  const avatar =
    user && user.avatarUrl ? (
      <img
        src={user.avatarUrl}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shadow"
      />
    ) : (
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold shadow">
        {user && user.username ? user.username[0].toUpperCase() : "J"}
      </span>
    );

  const navLinks = [
    { to: "/", label: "Main", show: true },
    { to: "/about", label: "About Me", show: !isAuth || isAdmin },
    { to: "/projects", label: "Projects", show: !isAuth || isAdmin },
    { to: "/contact", label: "Contact Me", show: !isAuth || isAdmin },
    { to: "/mainPosts", label: "All Posts", show: true },
    { to: "/posts", label: "My Posts", show: isAuth },
    { to: "/new", label: "Add Post", show: isAuth },
  ].filter((link) => link.show);

  const renderLink = (link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        className="text-base lg:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150 whitespace-nowrap"
        style={({ isActive }) => (isActive ? activeStyles : undefined)}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </NavLink>
    </li>
  );

  const authButton = isAuth ? (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 hover:bg-red-500 text-white font-semibold rounded-lg px-5 py-2 shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Exit
    </button>
  ) : (
    <Link
      to={"/login"}
      onClick={() => setMenuOpen(false)}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Enter
    </Link>
  );

  return (
    <nav className="relative w-full px-2 sm:px-6 py-3 border-b border-gray-800 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {avatar}
          <span className="ml-2 text-blue-400 text-lg font-semibold tracking-wide">
            {isAuth ? (user && user.username ? user.username : "Guest") : "Jenya"}
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-2 lg:gap-6 items-center">
          {navLinks.map(renderLink)}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {authButton}
          <ToggleTheme />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ToggleTheme />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
          <ul className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map(renderLink)}
            <li className="pt-2 border-t border-gray-800">{authButton}</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

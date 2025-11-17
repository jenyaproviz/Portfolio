import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import ToggleTheme from "./ToggleTheme";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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

  return (
    <nav className="w-full px-2 sm:px-6 py-3 flex justify-between items-center border-b border-gray-800 shadow-md">
      <div className="flex items-center gap-3">
        {avatar}
        <span className="ml-2 text-blue-400 text-lg font-semibold tracking-wide">
          {isAuth ? (user && user.username ? user.username : "Guest") : "Jenya"}
        </span>
      </div>

      <ul className="flex gap-4 sm:gap-8 items-center">
        <li>
          <NavLink
            to={"/"}
            className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/mainPosts"}
            className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            All Posts
          </NavLink>
        </li>
        {isAuth ? (
          <>
            <li>
              <NavLink
                to={"/posts"}
                className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                My Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/new"}
                className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add Post
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to={"/about"}
                className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                About Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/projects"}
                className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className="text-base sm:text-lg text-gray-300 hover:text-blue-400 px-2 py-1 rounded transition duration-150"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Contact Me
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="flex items-center gap-4">
        {isAuth ? (
          <button
            onClick={logoutHandler}
            className="bg-gray-700 hover:bg-red-500 text-white font-semibold rounded-lg px-5 py-2 shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Exit
          </button>
        ) : (
          <Link
            to={"/login"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Enter
          </Link>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
};

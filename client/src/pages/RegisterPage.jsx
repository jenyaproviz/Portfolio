import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password, adminCode }));
      setPassword("");
      setUsername("");
      setAdminCode("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md mx-auto mt-10 px-2 sm:px-4 py-8 bg-gray-900 rounded-xl shadow-xl border border-gray-700 flex flex-col gap-6"
      >
        <h1 className="text-lg text-white text-center">Registration</h1>

        <label className="text-xs text-gray-400">
          Username:
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1 text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-base outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="text-xs text-gray-400">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1 text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-base outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <button
          type="button"
          className="text-xs text-blue-300 underline mb-2 self-start"
          onClick={() => setShowAdmin((prev) => !prev)}
        >
          {showAdmin ? "Hide Admin Registration" : "Register as Admin?"}
        </button>

        {showAdmin && (
          <label className="text-xs text-gray-400">
            Admin Code:
            <input
              type="text"
              id="adminCode"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter Admin Code (leave blank for regular user)"
              className="mt-1 text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-base outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-xs text-gray-500 block mt-1">
              Only fill this if you want to register as an admin.
            </span>
          </label>
        )}

        <div className="flex gap-8 justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition-all text-base text-white rounded-lg py-2 px-6 shadow-md"
          >
            Register
          </button>

          <Link
            to="/login"
            className="flex justify-center items-center bg-gray-600 hover:bg-gray-700 transition-all text-base text-white rounded-lg py-2 px-6 shadow-md"
          >
            Sign In
          </Link>
        </div>
      </form>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { status, loading, error } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }
    dispatch(loginUser({ username, password }));
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-md mx-auto mt-20 px-4 py-8 bg-gray-800 rounded-xl shadow-lg flex flex-col gap-6 border border-gray-700"
    >
      <h1 className="text-2xl font-bold text-white text-center mb-2">
        Sign In
      </h1>
      {error && (
        <div className="text-red-400 text-xs text-center mb-2 animate-pulse">
          {error}
        </div>
      )}
      <label className="text-sm text-gray-300 font-medium flex flex-col gap-1">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 transition"
        />
      </label>
      <label className="text-sm text-gray-300 font-medium flex flex-col gap-1">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 transition"
        />
      </label>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`flex justify-center items-center text-sm font-semibold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg py-2 px-6 shadow transition-all duration-150 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : null}
          Login
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-sm font-semibold text-blue-400 hover:text-blue-500 active:text-blue-600 transition underline"
        >
          Create new account
        </Link>
      </div>
    </form>
  );
};

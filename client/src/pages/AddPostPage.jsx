import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/post/postSlice";

export const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.post);
  const [wasLoading, setWasLoading] = useState(false);

  const submitHandler = () => {
    if (!title || !text) {
      toast.error("Please fill in all fields.");
      return;
    }
    const data = new FormData();
    data.append("title", title);
    data.append("text", text);
    data.append("image", image);
    dispatch(createPost(data));
    setWasLoading(true);
  };

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setImage("");
  };

  // Reset form when post is added successfully
  React.useEffect(() => {
    if (wasLoading && !loading && !error) {
      clearFormHandler();
      setWasLoading(false);
    }
  }, [loading, error, wasLoading]);

  return (
    <form
      className="w-full max-w-lg mx-auto py-6 px-2 sm:py-10 sm:px-4 flex flex-col gap-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 mt-12"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Add New Post
      </h2>
      {error && (
        <div className="text-red-400 text-xs text-center mb-2 animate-pulse">
          {error}
        </div>
      )}
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        <span className="mr-2">📷</span> Attach Image
        <input
          type="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover py-2">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={image.name}
            className="rounded-lg shadow-md max-h-40 mx-auto transition-transform duration-300 scale-100 hover:scale-105"
          />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Post Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mt-1 text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-base outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Post Text:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Post text"
          className="mt-1 text-black w-full rounded-lg bg-gray-200 border border-gray-400 py-2 px-3 text-base outline-none resize-none h-40 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4 flex-wrap">
        <button
          onClick={submitHandler}
          disabled={loading}
          className={`flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition-all text-base text-white rounded-lg py-2 px-6 shadow-md font-semibold ${
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
          Add Post
        </button>

        <button
          onClick={clearFormHandler}
          disabled={loading}
          className={`flex justify-center items-center bg-red-500 hover:bg-red-600 transition-all text-base text-white rounded-lg py-2 px-6 shadow-md font-semibold ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

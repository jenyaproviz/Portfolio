import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { PostItem } from "../components/PostItem";
import axios from "../utils/axios";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      setError("Failed to load posts. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4 flex flex-col gap-10 rounded-lg">
      {loading ? (
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-700 rounded-lg h-40 w-full flex flex-col p-6"
            >
              <div className="bg-gray-600 h-6 w-1/2 rounded mb-4"></div>
              <div className="bg-gray-600 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-600 h-4 w-2/3 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-xl text-center text-red-400 py-10 transition-all duration-300">
          {error}
        </div>
      ) : posts?.length > 0 ? (
        posts.map((post, idx) => <PostItem post={post} key={idx} />)
      ) : (
        <div className="text-xl text-center text-white py-10">
          No posts found.
        </div>
      )}
    </div>
  );
};

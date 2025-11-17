import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopularPosts } from "../components/PopularPosts";
import { PostItem } from "../components/PostItem";
import { getAllPosts } from "../redux/features/post/postSlice";

export const MainPostsPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Check if posts is undefined or has a length of 0
  if (!posts || !posts.length === 0) {
    return (
      <div className="text-xl text-center text-white py-10">
        There are no posts.
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-10 w-full md:basis-4/5">
          {posts.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
        <div className="w-full md:basis-1/5 mt-8 md:mt-0">
          <div className="text-xs uppercase text-white">Popular:</div>
          {popularPosts?.map((post, idx) => (
            <PopularPosts key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

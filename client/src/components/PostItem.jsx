import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiLikePost, apiUnlikePost } from "../redux/api/posts";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const PostItem = ({ post }) => {
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let timeoutId;
    if (!post) {
      setShowDeletedMessage(true);
      timeoutId = setTimeout(() => {
        setShowDeletedMessage(false);
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [post]);

  return (
    <Link to={post ? `/${post._id}` : "#"}>
      <div className="flex flex-col basis-1/4 flex-grow transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        {showDeletedMessage && (
          <div className="text-xl text-center text-white py-10">
            This post was deleted...
          </div>
        )}
        {post && (
          <React.Fragment>
            <div
              className={
                post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post.imgUrl && (
                <img
                  src={`http://localhost:8080/uploads/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full rounded-2xl transition-all duration-300 hover:brightness-90"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
              {post.text}
            </p>

            <div className="flex gap-3 items-center mt-2">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50 transition-all duration-300 hover:bg-gray-700 hover:opacity-100 rounded-md px-2 py-1">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50 transition-all duration-300 hover:bg-gray-700 hover:opacity-100 rounded-md px-2 py-1">
                <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
              </button>
              <button
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all duration-300 ${
                  likes.length ? "text-pink-400" : "text-white opacity-50"
                } hover:bg-gray-700`}
                onClick={async (e) => {
                  e.preventDefault();
                  if (!user) {
                    toast.error("You must be logged in to like posts.");
                    return;
                  }
                  try {
                    if (likes.includes(user._id)) {
                      const res = await apiUnlikePost(post._id);
                      if (res && res.likes !== undefined) {
                        setLikes(likes.filter((id) => id !== user._id));
                      } else {
                        toast.error(res?.message || "Failed to unlike post.");
                      }
                    } else {
                      const res = await apiLikePost(post._id);
                      if (res && res.likes !== undefined) {
                        setLikes([...likes, user._id]);
                      } else {
                        toast.error(res?.message || "Failed to like post.");
                      }
                    }
                  } catch (err) {
                    toast.error("Error communicating with server.");
                  }
                }}
                aria-label={likes.includes(user?._id) ? "Unlike" : "Like"}
              >
                <FaHeart /> <span>{likes.length}</span>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </Link>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    imgUrl: PropTypes.string,
    views: PropTypes.number,
    comments: PropTypes.array,
    createdAt: PropTypes.string,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiLikePost, apiUnlikePost } from "../redux/api/posts";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import { removePost } from "../redux/features/post/postSlice";

export const PostItem = ({ post, onPostRemoved }) => {
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const canManagePost = user?.isAdmin || String(post?.author) === user?._id;

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

  const removePostHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const action = await dispatch(removePost(post._id));

      if (action?.payload?._id) {
        onPostRemoved?.(action.payload._id);
        toast.success("The post has been deleted.");
        return;
      }

      toast.error(action?.payload?.message || "Failed to delete post.");
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

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
            <div className="px-3 pt-4">
              <div className="flex justify-between items-center">
                <div className="text-xs text-white opacity-50">
                  {post.username}
                </div>
                <div className="text-xs text-white opacity-50">
                  {formatDate(post.createdAt)}
                </div>
              </div>
              <div className="text-white text-xl mt-2">{post.title}</div>
              <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
                {post.text}
              </p>

              <div className="flex gap-3 items-center mt-4">
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
                {canManagePost && (
                  <div className="ml-auto flex items-center gap-2">
                    <Link
                      to={`/${post._id}/edit`}
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs text-white opacity-70 transition-all duration-300 hover:bg-gray-700 hover:opacity-100"
                    >
                      <AiTwotoneEdit />
                      <span>Edit</span>
                    </Link>
                    <button
                      type="button"
                      onClick={removePostHandler}
                      className="flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs text-red-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-200"
                    >
                      <AiFillDelete />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
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
  onPostRemoved: PropTypes.func,
};

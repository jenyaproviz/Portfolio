import React from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { apiLikeComment, apiUnlikeComment } from "../redux/api/comment";
import { toast } from "react-toastify";

export const CommentItem = ({ cmt }) => {
  const avatar = cmt.author?.username
    ? cmt.author.username.charAt(0).toUpperCase()
    : "U";
  const [likes, setLikes] = React.useState(cmt.likes || []);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[10px]">{cmt.comment}</div>
      <button
        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all duration-300 ${
          likes.length ? "text-pink-400" : "text-white opacity-50"
        } hover:bg-gray-700`}
        onClick={async (e) => {
          e.preventDefault();
          if (!user) {
            toast.error("You must be logged in to like comments.");
            return;
          }
          try {
            if (likes.includes(user._id)) {
              const res = await apiUnlikeComment(cmt._id);
              if (res && res.likes !== undefined) {
                setLikes(likes.filter((id) => id !== user._id));
              } else {
                toast.error(res?.message || "Failed to unlike comment.");
              }
            } else {
              const res = await apiLikeComment(cmt._id);
              if (res && res.likes !== undefined) {
                setLikes([...likes, user._id]);
              } else {
                toast.error(res?.message || "Failed to like comment.");
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
  );
};

CommentItem.propTypes = {
  cmt: PropTypes.shape({
    _id: PropTypes.string,
    comment: PropTypes.string,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    createdAt: PropTypes.string,
    likes: PropTypes.array,
  }),
};

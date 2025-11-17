import axios from "../../utils/axios";

export const apiCreateComment = async ({ postId, comment }) => {
  const { data } = await axios.post(`/comments/${postId}`, { comment });
  return data;
};

export const apiGetPostComments = async (postId) => {
  const { data } = await axios.get(`/posts/comments/${postId}`);
  return data;
};

export const apiLikeComment = async (commentId) => {
  const { data } = await axios.post(`/comments/${commentId}/like`);
  return data;
};

export const apiUnlikeComment = async (commentId) => {
  const { data } = await axios.post(`/comments/${commentId}/unlike`);
  return data;
};

import axios from "../../utils/axios";

export const apiCreatePost = async (params) => {
  const { data } = await axios.post("/posts", params);
  return data;
};

export const apiGetAllPosts = async () => {
  const { data } = await axios.get("/posts");
  return data;
};

export const apiRemovePost = async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
};

export const apiUpdatePost = async (updatedPost) => {
  const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
  return data;
};

export const apiLikePost = async (postId) => {
  const { data } = await axios.post(`/posts/${postId}/like`);
  return data;
};

export const apiUnlikePost = async (postId) => {
  const { data } = await axios.post(`/posts/${postId}/unlike`);
  return data;
};

import axios from "../../utils/axios";

export const apiRegisterUser = async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
};

export const apiLoginUser = async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
};

export const apiGetMe = async () => {
  const { data } = await axios.get("/auth/me");
  return data;
};

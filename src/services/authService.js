import api from "../api";

// `api` already unwraps to the success envelope ({ success, message, data }),
// so we return the inner `.data` payload to callers.

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data; // { ...user, accessToken, refreshToken }
};

export const fetchUserProfile = async () => {
  const res = await api.get("/user/me");
  return res.data; // user object
};

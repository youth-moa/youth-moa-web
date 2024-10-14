import axios from "axios";
import { getTokenByRefreshToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken && window.location.href.includes("/my")) {
    window.location.href = "/login";
    return config;
  }

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && error.response?.data.status === 403) {
      const response = await getTokenByRefreshToken(refreshToken);

      if (!response.success) {
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        alert("로그인이 필요합니다.");
        return;
      }

      const accessToken = response.accessToken;

      localStorage.setItem("accessToken", accessToken);

      error.config.headers.Authorization = `Bearer ${accessToken}`;
      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      return api(error.config);
    }

    if (!refreshToken && error.response?.data.status === 403) {
      window.location.href = "/login";
      alert("로그인이 필요한 서비스입니다.");
      return api(error.config);
    }

    return error.response;
  }
);

export { api };

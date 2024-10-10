import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// TODO: request, response 수정
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  // config.headers["refreshToken"] = localStorage.getItem("refreshToken");

  return config;
});

api.interceptors.response.use((response) => {
  // if (response.headers["Authorization"]) {
  //   localStorage.removeItem("accessToken");
  //   localStorage.setItem("accessToken", response.headers["Authrization"]);
  // } else if (response.data.error === "INVALID_TOKEN") {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   // 토근 재발급
  // }

  if (response.data.status === 403) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    location.href = "/login";
  }

  return response.data;
});

export { api };

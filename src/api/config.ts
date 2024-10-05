import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// TODO: request, response 수정
api.interceptors.response.use(({ headers, data }) => {
  // const { accountReducer } = store.getState();
  // const userInfo = accountReducer.userInfo;
  // const token = headers.authorization;
  // if (headers.authorization && userInfo) {
  //   store.dispatch(signIn({ token, userInfo }));
  // }
  // if (data instanceof Blob) {
  //   return data;
  // }
  return data;
});

export { api };

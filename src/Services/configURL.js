import axios from "axios";
import { localServ } from "./localService";

export const BASE_URL = "http://128.199.94.237:8080";

export let https = axios.create({
  baseURL: BASE_URL,
});

https.interceptors.request.use(
  (config) => {
    const userData = localServ.user.get();
    if (userData && userData.access_token) {
      config.headers["Authorization"] = `Bearer ${userData.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export let https = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     token: localServ.user.get()?.access_token,
//   },
// });
// export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
// export const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwNTAiLCJIZXRIYW5UaW1lIjoiMjU1NTQyNDAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoyNjAyMDY1NjAwfQ.XYmCVZrAooVegRt_5KgPoXK3zRHpW8ATw5DnO6oMqfI";

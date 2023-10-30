import axios from "axios";
import { baseURL } from "./config";
import jwt from "./jwt";
import authService from "../services/authService";

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${jwt.getToken()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url === "/auth/refresh-token" &&
      error.response.data.statusCode === 500
    ) {
      jwt.deleteToken();
      return axios(originalRequest);
    }

    if (
      (error.response.data.statusCode === 401 ||
        error.response.data.statusCode === 403) &&
      jwt.getToken()
    ) {
      const token = jwt.getToken();

      if (token) {
        try {
          const { data } = await authService.refreshToken(token.refreshToken);
          jwt.setToken(data);

          axiosClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.accessToken;
          originalRequest.headers["Authorization"] =
            "Bearer " + data.accessToken;
          return axios(originalRequest);
        } catch (error) {
          jwt.deleteToken();
        }
      }
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosClient;

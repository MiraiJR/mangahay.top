import axios from "axios";
import { baseURL, originalURL } from "./config";
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

const removeTokenInErrorCodes = ["AUTH_ERROR_0004", "AUTH_ERROR_0007"];

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (removeTokenInErrorCodes.includes(error.response.data.errorCode)) {
      jwt.deleteToken();
      window.location.href = originalURL as string;
    }

    if (error.response.data.errorCode === "AUTH_ERROR_0005" && jwt.getToken()) {
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
        } catch (error: any) {
          jwt.deleteToken();
          console.log(error);
          if (error.message === "Token không hợp lệ") {
            window.location.reload();
          }
        }
      }
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosClient;

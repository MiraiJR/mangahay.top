import axios from "axios";
import { baseURL } from "./config";
import jwt from "./jwt";
import i18next from "i18next";
import { toast } from "react-toastify";
import AuthService from "../services/authService";

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
    if (error?.code === "ERR_NETWORK") {
      toast.error(i18next.t("network", { ns: "error" }));
      return Promise.reject({
        message: i18next.t("network", { ns: "error" }),
      });
    }

    const originalRequest = error.config;
    if (removeTokenInErrorCodes.includes(error.response.data.errorCode)) {
      jwt.deleteToken();
      return Promise.reject(error.response.data);
    }

    if (error.response.data.errorCode === "AUTH_ERROR_0005" && jwt.getToken()) {
      const token = jwt.getToken();

      if (token) {
        try {
          const { data } = await AuthService.refreshToken(token.refreshToken);
          jwt.setToken(data);

          axiosClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.accessToken;
          originalRequest.headers["Authorization"] =
            "Bearer " + data.accessToken;
          return axios(originalRequest);
        } catch (error: any) {
          jwt.deleteToken();
          if (error.errorCode === "AUTH_ERROR_0004") {
            window.location.reload();
          }
        }
      }
    }

    return Promise.reject(error.response.data);
  }
);

export default axiosClient;

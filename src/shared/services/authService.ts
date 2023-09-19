import axiosClient from "../libs/axiosClient";

export default {
  login: (data: AccountLogin) => axiosClient.post<Token>(`/auth/login`, data),
  logout: () => axiosClient.put<string>("/auth/logout"),
  refreshToken: (refreshToken: string) =>
    axiosClient.post<Token>(`/auth/refresh-token`, {
      refreshToken,
    }),
  register: (data: AccountRegister) =>
    axiosClient.post<string>(`/auth/register`, data),
};

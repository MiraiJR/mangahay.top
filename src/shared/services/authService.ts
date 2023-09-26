import axiosClient from "../libs/axiosClient";

const AuthService = {
  login: (data: AccountLogin) => axiosClient.post<Token>(`/auth/login`, data),
  logout: () => axiosClient.put<string>("/auth/logout"),
  refreshToken: (refreshToken: string) =>
    axiosClient.post<Token>(`/auth/refresh-token`, {
      refreshToken,
    }),
  register: (data: AccountRegister) =>
    axiosClient.post<string>(`/auth/register`, data),
  forgetPassword: (email: string) =>
    axiosClient.post<string>(`/auth/forget-password`, {
      email,
    }),
};

export default AuthService;

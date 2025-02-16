import axiosClient from "../libs/axiosClient";

const PREFIX_API = "notifies";

const NotifyService = {
  changeState: (notifyId: number) =>
    axiosClient.patch<Notify>(`/${PREFIX_API}/${notifyId}/change-state`),
  markAllRead: () => axiosClient.put<string>(`/${PREFIX_API}/mark-all-read`),
  removeAll: () => axiosClient.delete<string>(`/${PREFIX_API}`),
};

export default NotifyService;

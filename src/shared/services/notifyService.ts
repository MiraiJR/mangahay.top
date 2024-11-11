import axiosClient from "../libs/axiosClient";

const PREFIX_API = "notifies";

const NotifyService = {
  changeState: (notifyId: number) =>
    axiosClient.patch<Notify>(`/${PREFIX_API}/${notifyId}/change-state`),
  markAllRead: () => axiosClient.put<string>(`/${PREFIX_API}/mark-all-read`),
  removeAll: () => axiosClient.delete<string>(`/${PREFIX_API}`),
  getMyNotification: (paging: Paging | null, type: string = "2") =>
    axiosClient.get<Notify[]>(`/${PREFIX_API}/me`, {
      params: {
        paging,
        type,
      },
    }),
};

export default NotifyService;

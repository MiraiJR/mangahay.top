import axiosClient from "../libs/axiosClient";

const NotifyService = {
  changeState: (notifyId: number) =>
    axiosClient.patch<Notify>(`/notifies/${notifyId}/change-state`),
};

export default NotifyService;
